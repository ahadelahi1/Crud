import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ShowData() {

    let [User,setUSEr] = useState([])
    
    useEffect(() => {
    Data();
    },[])

async function Data(){
    await axios.get("http://localhost:4000/ht/get").
    then((a) => {
        console.log(a.data)
        setUSEr(a.data)
    }).catch((e) => {
        console.log(e.message)
    })
}


  return (
    <div>
      <h1>User Record</h1>
      <div className="container">
        <div className="row">
            {User.map((i) =>(
                <div className="mt-4 col-md-3">
                    <div class="card" key={(i._id)}>
                
                        <div class="card-body">
                            <h4 class="card-title">{i.name}</h4>
                            <p class="card-text">{i.email}</p>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
