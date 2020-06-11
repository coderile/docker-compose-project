const exprees=require('express');
const mongoose=require('mongoose');

const app=exprees();

mongoose.connect('mongodb://mongo:27117/mytestdb',{ useUnifiedTopology: true,useNewUrlParser: true  },()=>{
    console.log("DB is connected ");
})

const UserSchema=new mongoose.Schema({
    userName:String,
    email:String
});
const User=mongoose.model('user',UserSchema);

app.use(exprees.json());
app.post('/new',async(req,res,next)=>{
    try{
        const user= await new  User(req.body).save();
        res.status(200).json(user)
    }
    catch(e){
        new Error("Something went wrong");
    }
})
app.get('/users',async(req,res,next)=>{
    try{
        const data=await User.find();
        res.status(200).json(data)
    }
    catch(e){
        new Error("Something went wrong");
    }
})

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})