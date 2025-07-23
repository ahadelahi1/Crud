import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../ShowData.css'
import { toast } from 'react-toastify'

export default function ShowData() {

  let [User, setUser] = useState([])
  let [search, setSearch] = useState('')
  let [sortOption, setSortOption] = useState('')

  useEffect(() => {
    Data();
  }, [])

  async function Data(){
    await axios.get("http://localhost:4000/ht/get")
    .then((a) => {
        console.log(a.data)
        setUser(a.data)
    }).catch((e) => {
        console.log(e.message)
    })
  }

 
  let filteredUsers = User.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  )

 
  if (sortOption === "nameAsc") {
    filteredUsers.sort((a,b) => a.name.localeCompare(b.name))
  } else if (sortOption === "nameDesc") {
    filteredUsers.sort((a,b) => b.name.localeCompare(a.name))
  } else if (sortOption === "ageAsc") {
    filteredUsers.sort((a,b) => a.age - b.age)
  } else if (sortOption === "ageDesc") {
    filteredUsers.sort((a,b) => b.age - a.age)
  }


  async function Delete(id,n){
    if(window.confirm(`Are You Want To Delete ${n}`)){
      await axios.delete(`http://localhost:4000/ht/delete/${id}`).then(()=>{
        toast.success("Record Deleted");
        Data()
      }).catch((e) =>{
        toast.error(e.message)
      })
    }

  }



  return (
<div className="main-background">
  <div className="container">
    <h1 className="text-center mb-5 text-primary fw-bold">User Record</h1>


    <div className="row mb-5">
      <div className="col-md-4 offset-md-2 mb-3 mb-md-0">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control shadow-sm rounded-pill"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <select
          className="form-control shadow-sm rounded-pill"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="nameAsc">Name A to Z</option>
          <option value="nameDesc">Name Z to A</option>
          <option value="ageAsc">Age Low to High</option>
          <option value="ageDesc">Age High to Low</option>
        </select>
      </div>
    </div>

    <div className="row">
      {filteredUsers.map((i) => (
        <div className="col-md-4 mb-4" key={i._id}>
          <div className="card user-card">
            <div className="card-body text-center">
              <h5 className="card-title text-primary fw-bold">{i.name}</h5>
              <p className="card-text text-muted">{i.email}</p>
              <p className="card-text text-secondary"><strong>Age:</strong> {i.age}</p>


              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success me-2">Edit</button>
                <button className="btn btn-danger" onClick={() =>{Delete(i._id, i.name)}}>Delete</button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>

    {filteredUsers.length === 0 && (
      <h4 className="text-center text-muted">No user found</h4>
    )}
  </div>
</div>
  )
}
