import logo from './logo.svg';
import './App.css';

import Register from './Comp/Register';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowData from './Comp/ShowData';
import Login from './Comp/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
<Routes>
<Route path ='/' element ={<Register/>} />
<Route path ='/ShowData' element ={<ShowData/>} />
<Route path ='/Login' element ={<Login/>} />
</Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
