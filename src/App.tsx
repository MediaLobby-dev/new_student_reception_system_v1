import { useState, createContext } from 'react'
import StudentIdInputBox from '../components/StudentIdInputBox'
import Footer from '../components/Footer'
import UserTable from '../components/UserView'
import MessageBox from '../components/MessageBox'
import { StudentData } from './types'

type MsgBoxProps = {
  statusCode: number
  setStatusCode: React.Dispatch<React.SetStateAction<number>>
}

type StudentDataStoreProps = {
  data: StudentData
  setData: React.Dispatch<React.SetStateAction<StudentData>>
}

export const StatusMsg = createContext<MsgBoxProps>({
  statusCode: 0,
  setStatusCode: () => { }
})

export const StudentDataStore = createContext<StudentDataStoreProps>({
  data: {
    studentId: '',
    studentName: '',
    pseudonym: '',
    department: '',
    remarks: ''
  },
  setData: () => { }
})

function App() {
  const [studentId, setStudentId] = useState<string>('')
  const [statusCode, setStatusCode] = useState<number>(0)
  const [data, setData] = useState<StudentData>({
    studentId: '',
    studentName: '',
    pseudonym: '',
    department: '',
    remarks: ''
  })

  return (
    <>
      <div className="container py-4">
        <StatusMsg.Provider value={{ statusCode: statusCode, setStatusCode: setStatusCode }}>
          <StudentDataStore.Provider value={{ data: data, setData: setData }}>
            <StudentIdInputBox studentId={studentId} setStudentId={setStudentId} />
            <MessageBox />
            {
              studentId && <UserTable studentId={studentId} />
            }
            <Footer />
          </StudentDataStore.Provider>
        </StatusMsg.Provider>
      </div>
    </>
  )
}

export default App
