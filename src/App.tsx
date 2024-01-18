import InputBox from '../components/InputBox'
import Footer from '../components/Footer'
import UserTable from '../components/UserView'

function App() {
  return (
    <>
      <div className="container py-4">
        <InputBox />
        <UserTable />
        <Footer />
      </div>
    </>
  )
}

export default App
