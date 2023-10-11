const mongoose=require("mongoose");

main()
    .then(()=>{
        console.log("connection established Successfully");
    })
    .catch((err)=>{
        console.log(err)
    })
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
})
const User=mongoose.model("User",userSchema);
// User.updateOne({name:"Vandana"},{age:25}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })
// User.deleteOne({name:"Vandana"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })
// User.findOne({name:"Vandana"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })
// User.findByIdAndUpdate("651515d46ab3ac84eb9c9087",{age:44}).then((res)=>{
//     console.log(res);
// }).catch((error)=>{
//     console.log(error);
// })
User.findOneAndDelete({ name:"Vandana"}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})
// user will be acting as a class here
//this user 3 is object of that class
// const user3=new User({
//     name:"Vandana",
//     email:"vandana@yahoo.in",
//     age:22
// })
// user3.save();
// User.insertMany([{ name:"Sanjana",email:"sanjana@yahoo.in", age:23},
// {name:"Vandana",email:"vandana@yahoo.in", age:23},{name:"Amit",email:"amit@yahoo.in", age:23}]).
// then((res)=>{
//     console.log(res);
// })