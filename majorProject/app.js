const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const murl="mongodb://127.0.0.1:27017/globetotter";
const path=require("path");

main()
    .then(()=>{
        console.log("connected to the db");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect(murl);
}
app.listen(8080,()=>{
    console.log("Server is listening to the port 8080");
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("Hello from root");
});
//Index Route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})
// Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})
app.get("/listings/new",async(res,req)=>{
    res.render("listings/new.ejs");
})


