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
<div className="container-fluid bg-light py-5">
  <h1 className="text-center mb-4 text-primary">User Record</h1>
  <div className="row">
    {User.map((i) => (
      <div className="col-md-4 mb-4" key={i._id}>
        <div className="card shadow-lg border-light rounded">
          <div className="card-body text-center">
            <h5 className="card-title text-primary">{i.name}</h5>
            <p className="card-text text-muted">{i.email}</p>
            <p className="card-text text-secondary"><strong>Age:</strong> {i.age}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}
