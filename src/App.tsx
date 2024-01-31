import { useState, createContext, useRef } from 'react'
import StudentIdInputBox from '../components/StudentIdInputBox'
import Footer from '../components/Footer'
import UserTable from '../components/UserView'
import MessageBox from '../components/MessageBox'
import { StudentData } from './types'

type StateStoreProps = {
  studentId: string // 学籍番号
  statusCode: number // ステータスコード
  data: StudentData // 学生データ
  inputEl: React.RefObject<HTMLInputElement> // 学籍番号入力ボックスのRef
  setStudentId: React.Dispatch<React.SetStateAction<string>> // 学籍番号のセッター
  setStatusCode: React.Dispatch<React.SetStateAction<number>> // ステータスコードのセッター
  setData: React.Dispatch<React.SetStateAction<StudentData>> // 学生データのセッター

}

export const StateStore = createContext<StateStoreProps>({
  studentId: '',
  statusCode: 0,
  data: {
    studentId: '',
    studentName: '',
    kana: '',
    department: '',
    remarks: '',
    supply: "",
    receptionStatus: false,
  },
  inputEl: { current: null },
  setStudentId: () => { },
  setStatusCode: () => { },
  setData: () => { }
})

function App() {
  const [studentId, setStudentId] = useState<string>('')
  const [statusCode, setStatusCode] = useState<number>(0)
  const [data, setData] = useState<StudentData>({
    studentId: '',
    studentName: '',
    kana: '',
    department: '',
    remarks: '',
    supply: "",
    receptionStatus: false,
  })

  const inputEl = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className="container py-4">
        <StateStore.Provider value={{ studentId, setStudentId, statusCode, setStatusCode, data, setData, inputEl}}>
            <StudentIdInputBox />
            <MessageBox />
            {
              studentId && <UserTable />
            }
            <Footer />
        </StateStore.Provider>
      </div>
    </>
  )
}

export default App
