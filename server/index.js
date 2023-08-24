const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');



const URL = "mongodb+srv://medicine:medicine@cluster0.hnyngga.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(URL)
    console.log("connect with mongo");
    
   
    const MedicineItem = mongoose.model('MedicineItem', new mongoose.Schema({
      
    }));
    const MedicneCategory = mongoose.model('MedicneCategory', new mongoose.Schema({
      
    }));

    const DoctorList = mongoose.model('DoctorList', new mongoose.Schema({
      
    }));

    const fetchData = await MedicineItem.find({});
    const fetchCat = await MedicneCategory.find({});
    const fetchDoctor = await DoctorList.find({});
    
    if(!fetchDoctor) 
    console.log("Data are not found"); 
    else {
      global.doctor_list = fetchDoctor;
    }
  
   
    if(!fetchData) console.log("Data are not found")
    else{
        global.medicine_item = fetchData;
        global.medicine_category = fetchCat;
          
    }

    } catch (error) {
     console.log(`Error->${error}`)
  }
};

connect();


app.use(cors());

app.use(express.json());

const userRouter = require('./rotues/Users')
app.use('/auth',userRouter);

const loginRouter = require('./rotues/Logins')
app.use('/login',loginRouter);

const displayRouter = require('./rotues/DisplayData')
app.use('/displayItem',displayRouter);

const myOrderRouter = require('./rotues/MyOrders')
app.use('/myOrder',myOrderRouter);

const displayDoctor = require('./rotues/DisplayDoctors')
app.use('/doctors',displayDoctor);

const MyDoctor =require('./rotues/MyDoctors')
app.use('/myDoctor',MyDoctor);



app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
}); 
