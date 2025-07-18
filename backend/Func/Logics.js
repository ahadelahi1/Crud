const User = require("../Connection/User");
let bb = require("bcrypt")
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
   }

  }
    
}
module.exports = all;