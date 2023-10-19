const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const murl="mongodb://127.0.0.1:27017/globetotter";
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
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
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hello from root");
});
//Index Route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})
//New Route
app.get("/listings/new",async(req,res)=>{
    res.render("listings/new.ejs");
})
// Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})
// create route
app.post("/listings",async(req,res)=>{
    // let {title,description,image,price,country,location}=req.body;
    const newlisting=new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
});
// Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

    // res.render("listings/edit.ejs");
})
//update Route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
    res.redirect("/listings");
})
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let dele=await Listing.findByIdAndDelete(id);
    console.log(dele);
    res.redirect("/listings");
})