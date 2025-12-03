import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Entities from './pages/Entities'
import Contact from './pages/Contact'

function App() {
    const [count, setCount] = useState(0)
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="entities" element={<Entities />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App