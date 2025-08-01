const User = require("../Connection/User");
let bb = require("bcrypt")
let jwt = require("jsonwebtoken")

let mail = require("nodemailer");

require("dotenv").config()

let datas = mail.createTransport({
  service : "gmail",
  auth : {
    user : process.env.EMAIL,
    pass : process.env.PASsKEY
  }
})



let all =  {
  Register : async function(req, res){
   let {a,b,c,d} = req.body;

   let mailcheck = await User.findOne({ email : b
   })

   if (mailcheck){
   res.status(409).json({msg : "Email Alredy Exist"})
   }
   else {
    let hash = bb.hashSync(c,10)
    let u = new User({
      name : a ,
      email : b,
      password : hash,
      age : d
     })
     u.save()
     res.status(200).json({msg : "Saved Data"})

     let EmailBodyInfo = {
      to : b,
      from : process.env.EMAIL,
      subject : "Account Been Registerd!!",
      html : `<h3>Hello ${a}</h3> <br/> Your Account Login Sucss!!`
     }

     datas.sendMail(EmailBodyInfo, function(e,i){
      if (e) {
        console.log(e)
      } else {
        console.log("email sent")
      }
     })




   }

  },

  Read :async function(req, res){
    try {
      let user_data = await User.find().sort({Record_time : -1})
      res.status(201).json(user_data)
    } catch (error) {
      console.log(error.msg)
      res.status(504).json({msg : error.msg})
    }
  },

  DeleteRe : async function(req , res){
    try { 
      let { a } = req.params
      let srch = await User.findById(a)
      if (!srch){
        res.status(404).json({msg : "Record Not Found"})
      }
      else {
        await User.findByIdAndDelete(srch)
        res.status(201).json({msg: "Record Delete"})
      }
      
    } catch (error) {
      res.status(504).json({msg:error.message})
      
    }
  },

  EditRe : async function(req , res){
    try { 
      
      let { a } = req.params
      let {b,c,d,e,f} = req.body
      let srch = await User.findById(a)
      if (!srch){
        res.status(404).json({msg : "Record Not Found"})
      }
      else {
      let nepas = bb.hashSync(d,15)
        await User.findByIdAndUpdate(a,{
          name : b,
          email : c,
          password : nepas,
          age : e,
          city : f
        })
        res.status(201).json({msg: "Record Update"})
      }
      
    } catch (error) {
      res.status(504).json({msg:error.message})
      
    }
  },

  Login : async function (req ,res ){
    try {

      let {email , pswd } = req.body;
      let email_check = await User.findOne({email : email})
      console.log(email_check)
      if (!email_check) {
      res.status(404).json({msg : "Email Not Found"})
    }

    let pswd_check = bb.compareSync(pswd, email_check.password)
    if(!pswd_check){
      res.status(404).json({msg : "Password Invalid"})
    }

    let  mera_token = jwt.sign({id: email_check._id},"bhai", {expiresIn : "2h"})
    res.status(200).json({mera_token, "user" : {id : email_check._id, name : email_check.name}})
      
    } catch (error) {
      res.status(504).json({msg : error.message})
      console.log(error.message)
    }
  }
  

}
module.exports = all;