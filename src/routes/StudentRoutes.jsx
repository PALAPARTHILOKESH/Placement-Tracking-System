import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentProfile from '../components/Student/StudentProfile'
import StudentJobs from '../components/Student/StudentJobs'
import StudentAppliedJobs from '../components/Student/StudentAppliedJobs'

function StudentRoutes() {
  return (
   <Routes>
      <Route path='/profile' element={<StudentProfile/>} />
      <Route path='/jobs' element={<StudentJobs/>} />
      <Route path='/applied' element={<StudentAppliedJobs/>} />
   </Routes>
  ) 
}

export default StudentRoutes