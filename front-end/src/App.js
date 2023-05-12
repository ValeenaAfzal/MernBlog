import './App.css';

//components
import Login from './Components/Login';
import Provider from './context/provider';
import Home from './Components/Home/home';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import { useState } from 'react';
import CreatePost from './Components/PostOperations/CreatePost';
import DetailView from './Components/Details/Details';
import Update from './Components/PostOperations/Update';
import Profile  from './Components/Profile';
// can pass data using props or chuldren

const PrivateRoute = ({ isUserAuthenticated, ...props }) => { // when you refresh the page isUserAutheticated is set to false and User signs out automaticaally
  return isUserAuthenticated ?
    //display header after login
    <>
      <Header />
      <Outlet />
    </>
    :
    <Navigate replace to="/login" />
}
function App() {
  //except login all are not acessble thats why private route

  const [isUserAuthenticated, setUserAuthenticated] = useState(false);
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path='/login' element={<Login isUserAuthenticated={setUserAuthenticated} />} />

              <Route path='/' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />}>
                <Route path='/' element={<Home />} />
              </Route>

              <Route path='/create' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />}>
                <Route path='/create' element={<CreatePost />} />
              </Route>

              <Route path='/details/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                <Route path='/details/:id' element={<DetailView />} />
              </Route>

              <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                <Route path='/update/:id' element={<Update />} />
              </Route>

              <Route path='/profile' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />}>
                <Route path='/profile' element={<Profile />} />
              </Route>

            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
