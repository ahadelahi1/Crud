const User = require("../Connection/User");
let bb = require("bcrypt")

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
  }
  

}
module.exports = all;