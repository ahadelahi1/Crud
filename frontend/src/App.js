import logo from './logo.svg';
import './App.css';

import Register from './Comp/Register';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowData from './Comp/ShowData';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
<Routes>
<Route path ='/' element ={<Register/>} />
<Route path ='/ShowData' element ={<ShowData/>} />
</Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
