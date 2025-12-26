import express from 'express'

const app=express()
const usercredentials=[]
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("register",{message:null})
})
app.post("/register",(req,res)=>{
  const {email,password,username}=req.body
  if (usercredentials.email !== email ) {
    if(emailRegex.test(email)){

 if(password.length < 6){
     const message="password must be 6 characters long"
   return  res.render("register",{message:message})
  }
    usercredentials.push({username,email,password})
    const successmessage="registration successfull login to continue"
    return  res.render("loginform",{message:null,successmessage:successmessage})
    }else{
        const message='invalid email format'
       return res.render("register",{message:message})
    } 
  } else{
    const message = 'email already exists'
   res.render("register",{message:message})
  } 
 
})

app.get("/loginpage",(req,res)=>{
    res.render('loginform',{message:null})
})
app.post('/login',(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    if(!email|| !password){
      const message=`please fill all fields`
     return res.render('loginform',{message:message,successmessage:null})
    }else if(email == usercredentials.email || password == usercredentials.password){
        const message= 'login successful'
       return res.render('loginform',{message:message,successmessage:null})
     }else if (!emailRegex.test(email)) {
   const message="invalid email "
   return res.render("loginform",{message:message,successmessage:null})
  }
  if(password !== usercredentials.password ){
    const message="invalid password"
  return  res.render("loginform",{message:message,successmessage:null})
  }else{
    const successmessage="login sucessfull"
  return  res.render("loginform",{message:null,successmessage:successmessage})
  }
})
app.listen(4000,()=>{
    console.log("successfuly running on port 4000")
})