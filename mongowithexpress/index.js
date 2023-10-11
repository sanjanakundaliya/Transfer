const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodoverride=require("method-override");


main().then(()=>{
    console.log("connection is sucessful");
}).catch(err => console.log(err));

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chitchat');
}
app.listen(8080,()=>{
    console.log("Hello Server is Listening");
})


app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})
app.get("/chats/new",async(req,res)=>{
    res.render("newChats.ejs");
})
app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>");
})

//creating new chat
app.post("/chats",(req,res)=>{
    let { from,msg,to }=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat
    .save()
    .then((res)=>{
        console.log("new chat is saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
})
//Edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    // res.render("edit.ejs",{chat});
res.send(chat);
})
//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    console.log(updatedchat);
    res.redirect("/chats")
})
//DELETE 
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})
