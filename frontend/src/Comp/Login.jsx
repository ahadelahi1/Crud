import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {

let [email, setEmail] = useState("");
let [pswd, setPswd] = useState("");

async function LooginLogic(){
try {
    if(!email ||!pswd){
        toast.error("All Fields Reqq")
        return;
    }
    await axios.post("http://localhost:4000/ht/Login", {
        email : email,
        pswd : pswd
    })
    .then((a)=>{
        setEmail("")
        setPswd("")
        toast.success("Login Succs");
    }).catch((e)=>{
        toast.error(e.message)
    })
} catch (error) {
    
}


}



return (

<div className="register-background">
 <ToastContainer/>
 <div className="form-container">
    <h2>Register</h2>


    <label htmlFor="email">Email</label>
    <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>

    <label htmlFor="password">Password*</label>
    <input type="password" id="password" name="password" value={pswd} onChange={(e)=> setPswd(e.target.value)} required/>



    <button type="button" className="submit-btn" onClick={LooginLogic}>Submit</button>

 </div>
</div>


  )

}
