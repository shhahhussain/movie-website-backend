const { urlencoded } = require("body-parser")
const exp = require("constants")
const express=require("express")
const app=express()
const port=3000
const users=["shah","israr"]
app.use(express.urlencoded())
app.use(express.json())


app.get("/",(req,res,next)=>{
console.log("go to the next middleware");
next()
})

app.get("/",(req,res)=>{
res.send("<h1>home</h1>")
})

app.get("/user",(req,res)=>{
res.send({users})
})

app.post("/user",(req,res)=>{
    const {name}=req.body
    users.push(name)
    res.send({users})
    })

app.get("/user/:userid",(req,res)=>{
    const {userid}=req.params;
    const user=users[userid];
    res.send("s")
})

app.listen(port,()=>{
    console.log(`server is running on${port}`);
})