import { useState } from 'react'
import StudentIdInputBox from '../components/StudentIdInputBox'
import Footer from '../components/Footer'
import UserTable from '../components/UserView'


function App() {
  const [studentId, setStudentId] = useState('')

  return (
    <>
      <div className="container py-4">
        <p>{studentId}</p>
        <StudentIdInputBox setStudentId={setStudentId} />
        <UserTable studentId={studentId} />
        <Footer />
      </div>
    </>
  )
}

export default App
