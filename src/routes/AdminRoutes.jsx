import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentInsert from '../components/Admin/StudentInsert'
import StudentDelete from '../components/Admin/StudentDelete'
import StudentUpdate from '../components/Admin/StudentUpdate'
import StudentViewAll from '../components/Admin/StudentViewAll'
import RecruiterInsert from '../components/Admin/RecruiterInsert'
import RecruiterDelete from '../components/Admin/RecruiterDelete'
import RecruiterUpdate from '../components/Admin/RecruiterUpdate'
import RecruiterViewAll from '../components/Admin/RecruiterViewAll'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='insertstudent' element={<StudentInsert/>} />
      <Route path='viewallstudents' element={<StudentViewAll />} />
      <Route path='updatestudent' element={<StudentUpdate />} />
      <Route path='deletestudent' element={<StudentDelete />} />

      <Route path='addrecruiter' element={<RecruiterInsert/>} />
      <Route path='deleterecruiter' element={<RecruiterDelete/>} />
      <Route path='updaterecruiter' element={<RecruiterUpdate/>} />
      <Route path='viewallrecruiter' element={<RecruiterViewAll/>} />

    </Routes>
  )
}

export default AdminRoutes
