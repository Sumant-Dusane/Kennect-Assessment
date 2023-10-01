import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainActivity from './components/MainActivity/MainActivity';
import PostDetail from './components/PostDetail/PostDetail';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';

export default function Router() {
  return (
    <>
    <Navbar />
    <div className="wrapper">
      <div className="activity">
        <Routes>
          <Route path='/auth' element={<Auth />} />
            <Route path='/' element={<MainActivity />} />
            <Route path='/post/:postId' element={<PostDetail />} />
        </Routes>
      </div>
    </div>
    <Footer />
    </>
  )
}
