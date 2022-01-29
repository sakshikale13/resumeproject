var express=require("express");
const mongoose=require("mongoose");
var app=express();
mongoose.connect("mongodb://localhost:27017/resumebuilding");
const db=mongoose.connection;
db.on("error",error=> console.log(error));
db.on("open",()=> console.log("connection established"));

app.use(express.json());

app.use((res, req, next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","*");
  if(req.method=="OPTIONS")
  {
      res.header("Access-control-allow-methods","POST,GET,PUT,PATCH,DELETE");
      return res.status(200).json({});
  }
  next();
});
app.get("/",function(req,res){
    res.send("hello welcome to resume building");
    res.end();
    app.use("/admin",require("./routes/admin"));
});
app.get("/hello",function(req,res){
    res.send("this is hello page.we are happy to build your resume.we will try to design your best resume");
    res.end();
});
app.use("/admin", require("./routes/admin"));
app.listen(8081,function(){
    console.log("Node server started");
});
                 