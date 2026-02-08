import React from 'react'
import '../styles/landingPage.css'
import { useNavigate } from 'react-router-dom'


function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className=' d-flex flex-column align-items-center justify-content-center land-containter'>
    
       <div className=' text-center col-10 col-lg-8 col-md-8 landing-text'>
        <h1 className=' text-light text-capitalize fw-normal my-2'>Welcome to the <span >cricket scorer</span> </h1>
       <h2 className=' text-light  fw-normal my-2'> This app helps you record cricket matches in real-time
        track runs, wickets, overs, and extras easily.</h2>
       </div>
        <button onClick={()=> navigate('/form')} className='btn text-light myBtn'>Start Match</button>
    </div>
  )
}

export default LandingPage
