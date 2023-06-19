const express = require('express');
var cors = require('cors');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const UserModel = require('./models/User.js');

const cookieParser = require('cookie-parser');

//Image downloader
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();

const bcryptSalt =  bcrypt.genSaltSync(10);
const jwtTokenSecret = 'zvcxzasdwescxwwerwedsASDswefsdxqwd23sdwxy'

const Place = require('./models/Place');
const Booking = require('./models/Booking');

//middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(cors(
    {
        credentials: true,
        origin:'https://sojourn-booking.nayanbastola.com',
    }
));




app.get('/test', (req,res)=>{
    res.json("I will asdfsdaf be shown on the Browser");
 
});



mongoose.connect(process.env.MONGOOSE_URL);

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtTokenSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }

app.post('/register', async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userDoc = await UserModel.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    }catch(error){
        res.status(422).json(error);
    }
});

app .post('/login', async (req,res)=>{
    const {email,password} =  req.body;
    const userDoc = await UserModel.findOne({email});
    if (userDoc){
        const passwordOK = bcrypt.compareSync(password, userDoc.password);
        if (passwordOK){
            jwt.sign(
                {email:userDoc.email, id:userDoc._id}, 
                jwtTokenSecret,
                {},
                (err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(userDoc);
                }
            );

        }else{
            res.status(422).json('Failed Password')
        }
    }else{
        res.json('not found');
    }
    
});
app.get('/profile', (req,res)=>{
    //grabbing cookies
    
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtTokenSecret,{},async (err,cookieData)=>{
            if(err) throw err;
            //fething user data from ID
            const {name,email,_id} = await UserModel.findById(cookieData.id);
            res.json({name,email,_id});

        });
    }else{
        res.json(null);
    }
});

// logout request

app.post('/logout', (req,res)=>{
    res.cookie('token','').json(true);


});

// PHOTO UPLOAD REQUEST


app.post('/upload-by-link', async (req,res)=>{
    const {link} = req.body;
    const newName = 'photo_'+ Date.now() + '.jpg';
    await imageDownloader.image({

        url: link,
        dest: __dirname+'/uploads/'+newName,
    });

    res.json(newName);


});

//Upload PHOT from button

//multer middelware
const photosMiddleware = multer({dest:'uploads/'});

app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+"." + ext;

        fs.renameSync(path,newPath);
        const uploadFiles = uploadedFiles.push(newPath.replace('uploads',''));
        
    }
    res.json(uploadedFiles);
});





//adding places

app.post('/places', (req, res)=> {
    const {token} = req.cookies;
    const {
        title,
        address,
        addedPhotos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
     } = req.body;


    jwt.verify(token,jwtTokenSecret,{}, async (err,cookieData)=>{
        if(err) throw err;
        //fething user data from ID
        placeDoc = await Place.create({
        owner: cookieData.id,
        title,
        address,
        photos:addedPhotos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
        })
        res.json(placeDoc);

    });
});
//add place data
app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtTokenSecret,{}, async (err,cookieData)=>{
     const {id} = cookieData;
     res.json(await Place.find({owner:id}));

    });
})
//get place data
app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;

    res.json(await Place.findById(id));


});

//update place data
app.put('/places',async (req,res)=>{
    const {token} = req.cookies;
    const {
        id,
        title,
        address,
        addedPhotos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
     } = req.body;

     
     jwt.verify(token,jwtTokenSecret,{}, async (err,userData)=>{
        if(err) throw err;
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
        placeDoc.set({
            title,
            address,
            photos:addedPhotos,
            description,
            features,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        await placeDoc.save();
        res.json('ok');
        }
   
       });


})
//Index page  place data
app.get('/places',async (req,res)=>{
    res.json(await Place.find());
});



//Getting Booking Date and Details

app.post('/bookings', async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    const {
        place, 
        checkIn, 
        checkOut, 
        numberOfGuests, 
        name, 
        email, 
        phone,
        price,
    } = req.body;
    Booking.create({
        place, 
        checkIn, 
        checkOut, 
        numberOfGuests, 
        name, 
        email, 
        phone,
        price,
        user:userData.id,
    }).then((bookingDoc)=>{
        res.json(bookingDoc);
    }).catch((err)=>{
        throw err;
    });
});


//Getting Private Bookings

app.get('/bookings', async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'));

});

app.listen(4000);
