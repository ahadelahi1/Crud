import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from 'react-toastify';


export default function Register() {

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pswd, setPswd] = useState("");
  let [age, setAge] = useState(1);

  const navigate = useNavigate();

  async function SubmitFun(){
    try {
      let u_r = /^(?!_)[a-zA-Z]{3,20}(?<!_)$/
      let p_r = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

      if (!name || !email || !pswd || !age ){
        toast.error("all required")
        return;
      }
      if (!u_r.test(name)){
        toast.error("invalid username")
        return;
      }
      if (!p_r.test(pswd)){
        toast.error("invalid password")
        return;
      }

      axios.post("http://localhost:4000/ht/Reg",{
        a : name,
        b : email,
        c : pswd,
        d : age
      }).then(()=>{
        alert("Data Saved")
      }).catch((e)=>{
        if(e.status === 409){
          toast.error(e.response.data.msg)
          } else {
            console.log(e)
          }
        console.log(e.message)
      })
    } catch (error) {}
  }

  return (
<div className="register-background">
 <ToastContainer/>
 <div className="form-container">
    <h2>Register</h2>

    <label htmlFor="name">Name*</label>
    <input type="text" id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} required/>

    <label htmlFor="email">Email*</label>
    <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>

    <label htmlFor="password">Password*</label>
    <input type="password" id="password" name="password" value={pswd} onChange={(e)=> setPswd(e.target.value)} required/>

    <label htmlFor="age">Age (optional)</label>
    <input type="number" id="age" name="age" value={age} onChange={(e)=> setAge(e.target.value)}/>

    <button type="button" className="submit-btn" onClick={SubmitFun}>Submit</button>

    <button type="button" className="go-showdata-btn" onClick={()=>navigate('/showdata')}>
      Go to Show Data
    </button>
 </div>
</div>
  )
}
