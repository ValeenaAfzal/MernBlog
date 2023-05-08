import './App.css';

//components
import Login from './Components/Login';
import Provider from './context/provider';
import Home from './Components/Home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import { useState } from 'react';
// can pass data using props or chuldren
function App() {

  const [isUserAuthenticated,setUserAuthenticated]=useState(false);
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
        
        <Header/>
          <div>
            <Routes>
              <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
              <Route path='/' element={<Home/> }/>
              <Route />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>


    </div>
  );
}

export default App;
