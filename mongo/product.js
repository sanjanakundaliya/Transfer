const mongoose = require("mongoose");

main()
    .then(()=>{
        console.log("connection established Successfully");
    })
    .catch((err)=>{
        console.log(err)
    })
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/mamaearth");
}

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    producers:{
        type:String,
    },
    expdate:{
        type:Date,
    }
})
const Product=mongoose.model("Product",userSchema);
const pro=new Product({name:"faceWASH", producers:"mamaearth",expdate:9/1/24});
pro.save().then((res)=>{
    console.log(res);
}).catch((error)=>{
    console.log(error);
})
