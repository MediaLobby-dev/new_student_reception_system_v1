import { useState, createContext } from 'react'
import StudentIdInputBox from '../components/StudentIdInputBox'
import Footer from '../components/Footer'
import UserTable from '../components/UserView'
import MessageBox from '../components/MessageBox'

type MsgBoxProps = {
  statusCode: number
  setStatusCode: React.Dispatch<React.SetStateAction<number>>
}

export const StatusMsg = createContext<MsgBoxProps>({
  statusCode: 0,
  setStatusCode: () => { }
})

function App() {
  const [studentId, setStudentId] = useState<string>('')
  const [statusCode, setStatusCode] = useState<number>(0)

  return (
    <>
      <div className="container py-4">
        <StatusMsg.Provider value={{ statusCode: statusCode, setStatusCode: setStatusCode }}>
          <StudentIdInputBox setStudentId={setStudentId} />
          <MessageBox />
            {
              studentId ? <UserTable studentId={studentId} /> : "表示するデータがありません"
            }
          <Footer />
        </StatusMsg.Provider>
      </div>
    </>
  )
}

export default App
