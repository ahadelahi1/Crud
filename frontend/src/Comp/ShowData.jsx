import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../ShowData.css"

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

  // Filtered data based only on name
  let filteredUsers = User.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  // Sorting logic
  if (sortOption === "nameAsc") {
    filteredUsers.sort((a,b) => a.name.localeCompare(b.name))
  } else if (sortOption === "nameDesc") {
    filteredUsers.sort((a,b) => b.name.localeCompare(a.name))
  } else if (sortOption === "ageAsc") {
    filteredUsers.sort((a,b) => a.age - b.age)
  } else if (sortOption === "ageDesc") {
    filteredUsers.sort((a,b) => b.age - a.age)
  }

  return (
<div style={{ 
  background: "linear-gradient(to right, #e0eafc, #cfdef3)",
  minHeight: "100vh",
  padding: "50px 0"
}}>
  <div className="container">
    <h1 className="text-center mb-5 text-primary" style={{fontWeight: 'bold'}}>User Record</h1>

    {/* Search input and Sort dropdown */}
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
          <div 
            className="card h-100 shadow-lg border-0 rounded-4"
            style={{
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 15px rgba(0,0,0,0.05)";
            }}
          >
            <div className="card-body text-center">
              <h5 className="card-title text-primary" style={{fontWeight:'bold'}}>{i.name}</h5>
              <p className="card-text text-muted">{i.email}</p>
              <p className="card-text text-secondary"><strong>Age:</strong> {i.age}</p>
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
