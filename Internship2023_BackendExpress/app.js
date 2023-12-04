require('dotenv').config();
require('express-async-errors');
const cors = require("cors");
const multer=require('multer')
const path=require('path')
const connectDB =require('./db/connect')
const express = require('express');
var bodyParser = require('body-parser')

//const redisUrl = process.env.REDIS_URI
const app = express();
const port = process.env.PORT | 3200;

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const offerRouter=require('./routes/offerRoute')
const userRouter=require('./routes/userRoute')
const applicationRouter=require('./routes/applicationRoute')
const claimRouter=require('./routes/claimsRoute')
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

   const storage= multer.diskStorage(
     {
       destination:'./assets/images',
       filename:(req, file, cb)=>{
         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
       }
     }
   )
    const upload =multer({
      storage:storage
  })
  
 
 
 
  app.use(bodyParser.json());

app.use('/', offerRouter)
app.use('/', userRouter)
app.use('/', applicationRouter)
app.use('/', claimRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


app.use('/test', upload.single('pdf'), (req,res)=>{
   console.log(req.file)
  console.log(req.body)
  
   res.status(200).json( req.body);

 })









const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000
  })
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports=app
