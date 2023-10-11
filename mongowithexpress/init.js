const mongoose = require("mongoose");
const Chat=require("./models/chat.js");

main()
.then(()=>{
    console.log("connection is sucessful");
})
.catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chitchat');
  }

  let allChats=
    [
{
    from:"Sanjana",
    to:"Abhishek",
    created_at:new Date(),
    msg:"Hello Abhishek",
},
{
    from:"Abhishek",
    to:"Sanjana",
    created_at:new Date(),
    msg:"Hello Sanjana",
},
{
    from:"Riya",
    to:"Priya",
    created_at:new Date(),
    msg:"How's your Studies Going",
},
{
    from:"Amit",
    to:"Sumit",
    created_at:new Date(),
    msg:"Hello Sanjana",
},
{
    from:"Vishal",
    to:"Rishal",
    created_at:new Date(),
    msg:"Can You teach me some Node.js",
},
]
Chat.insertMany(allChats);
