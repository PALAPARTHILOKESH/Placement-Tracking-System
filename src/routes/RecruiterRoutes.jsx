import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RecruiterProfile from '../components/Recruiter/RecruiterProfile'
import RecruiterHome from '../components/Recruiter/RecruiterHome'
import JobInsert from '../components/Recruiter/JobInsert'
import JobViewall from '../components/Recruiter/JobViewall'

function RecruiterRoutes() {
  return (
    <Routes>
        <Route path='recruiterprofile' element={<RecruiterProfile/>} />
        <Route path='addjob' element={<JobInsert/>} />
        <Route path='viewalljobs' element={<JobViewall/>} />
    </Routes>
  )
} 
export default RecruiterRoutes