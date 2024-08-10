import './App.css';
import { BrowserRouter, Routes, Route, Switch, Navigate } from "react-router-dom";

import Home from "./components/Home.js";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import DisplayProducts from "./components/DisplayProducts.js";
import DisplayWorkers from "./components/DisplayWorkers.js";
import DisplayStatus from "./components/DisplayStatus.js";
import UpdateStatus from "./components/UpdateStatus.js"
import AddProduct from "./components/AddProduct.js"



function App() {

  return (

    <div className="app">

      <div id="routes">
      <BrowserRouter>

        <ResponsiveAppBar/>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/workers" element={<DisplayWorkers />} />
          {/* <Route path="/nav" element={<Navbar />} /> */}
          <Route path="/products" element={<DisplayProducts />} />
            <Route path="/status" element={<DisplayStatus />} />
            <Route path="/Add%20Product" element={<AddProduct />} />
          <Route path="/Update%20Status" element={<UpdateStatus/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;