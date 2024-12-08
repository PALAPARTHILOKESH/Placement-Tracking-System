import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Contact from './components/Contact'
import AdminHome from './components/Admin/AdminHome'
import AdminRoutes from './routes/AdminRoutes'
import StudentHome from './components/Student/StudentHome'
import StudentRoutes from './routes/StudentRoutes'
import RecruiterRoutes from './routes/RecruiterRoutes'
import RecruiterHome from './components/Recruiter/RecruiterHome'
import About from './components/About'

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/studenthome' element={<StudentHome />} />
          <Route path='/adminhome' element={<AdminHome />} />
          <Route path='recruiterhome' element={<RecruiterHome/>} />

          
          {/* Admin routes */}
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/student/*' element={<StudentRoutes />} />
          <Route path='/recruiter/*' element={<RecruiterRoutes />} />

        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
