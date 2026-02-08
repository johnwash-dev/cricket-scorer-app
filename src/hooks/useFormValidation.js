import { useState } from 'react'

function useFormValidation(matchData) {
    const [errors, setErrors] =useState({})

    const validate =() =>{
        const newErrors = {}

        const {teamA, teamB,batsman,bowler,overs,tossWinner, tossDecision} = matchData

        if (!teamA.trim()){
          newErrors.teamA = "Team A is requeried"
        }

        if (!teamB.trim()){
          newErrors.teamB = "Team B is required"
        }
        
        if (teamA && teamB && teamA.trim()=== teamB.trim()){
          newErrors.teamB = "Team A and Team B must be diffrent"
        }
        if (!batsman[0].trim()){
          newErrors.striker = "striker name is important"
        }
        if (!batsman[1].trim()){
          newErrors.nonStriker = "Non-Striker name is important"
        }

        if (batsman[0] && batsman[1] && batsman[0].trim() === batsman[1].trim()){
          newErrors.nonStriker = "Striker name and Non-Striker name must be diffrent"
        }

        if(!bowler.trim()){
          newErrors.bowler = "Bowler name is  required"
        }
        if(!overs){
          newErrors.overs = "Total over is required"
        }else if(Number(overs) <= 0){
          newErrors.overs = "Overs must be greater than zero"
        }

        if (!tossWinner){
          newErrors.tossWinner = "Please select the Toss winner Team"
        }

        if(!tossDecision){
          newErrors.tossDecision = "Please select the Toss Decision Bat or Bowl"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
  return { errors, validate }
}

export default useFormValidation
