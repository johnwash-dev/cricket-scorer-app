import react from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MatchForm from './pages/MatchForm'
import ScorerPage from './pages/ScorerPage'
function App() {
  

  return (
    <>
   <Routes>
     <Route path='/' element={<LandingPage/>} />
     <Route path='/form' element={<MatchForm/>} />
     <Route path='/scorer' element={<ScorerPage/>} />
   </Routes>
    </>
  )
}

export default App
