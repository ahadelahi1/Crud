import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../ShowData.css'
import { ToastContainer, toast } from 'react-toastify'

export default function ShowData() {

  let [User, setUser] = useState([])
  let [search, setSearch] = useState('')
  let [sortOption, setSortOption] = useState('')

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPass] = useState('')
  let [age, setAge] = useState('')
  let [city, setCity] = useState('')
  let [id, setId] = useState('')

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

  async function EditData(){
    try {
      await axios.put(`http://localhost:4000/ht/update/${id}`,{
      b : name ,
      c : email,
      d : password,
      e : age,
      f : city
    
    }).then((a)=>{
        toast.success(a.data.msg);
        Data()
      }).catch((e)=>{
        toast.error(e.message)
      })

      
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  function setData(a,b,c,d,e,f){
    setName(a)
    setEmail(b)
    setPass(c)
    setAge(d)
    setCity(e)
    setId(f)
  }



  return (
<div className="main-background">
  <ToastContainer/>
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
                <button className="btn btn-success me-2"  data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => {
                  setData(i.name,i.email,i.password,i.age,i.city,i._id)
                }}>Edit</button>
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

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
  <input type="text" className="form-control mt-2" value={name} onChange={(e) => setName(e.target.value)} />
  <input type="email" className="form-control mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
  <input type="password" className="form-control mt-2" value={password} onChange={(e) => setPass(e.target.value)} />
  <input type="text" className="form-control mt-2" value={age} onChange={(e) => setAge(e.target.value)} />
  <input type="text" className="form-control mt-2" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=> {
          EditData();
          document.querySelector(".close").click()
        }} >Save changes</button>
      </div>
    </div>
  </div>
</div>









</div>
  )
}
