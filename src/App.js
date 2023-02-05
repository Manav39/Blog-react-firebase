import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import Explore from './pages/Explore';
import Feature from './pages/Feature';
import Login from './pages/Login';
import Register from './pages/Register';
import YourBlogs from './pages/YourBlogs';
import {useFirebase} from './context/Firebase';
import ErrorPage from './pages/ErrorPage';
import BlogDetail from './pages/BlogDetail';
import BlogCard from './pages/BlogCard';
function App() {
  const firebase = useFirebase();

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Feature />}/>
        {!firebase.isLoggedIn && <Route path='/login' element={<Login/>}/>}
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/createblog' element={<CreateBlog/>}/>
        <Route path='/yourblogs' element={<YourBlogs/>}/>
        <Route path='/yourblogs/blog/:blogId' element={<BlogDetail/>}/>
        <Route path='/explore/blog/:blogId' element={<BlogDetail />}/>
        {!firebase.isLoggedIn && <Route path='/register' element={<Register/>}/>}
        <Route path="*" element={<ErrorPage/>}/> 
      </Routes>
    </div>
  );
}

export default App;
