import React, { useState } from "react";
import "../styles/matchForm.css";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../Components/customDropdown";
import useFormValidation from "../hooks/useFormValidation";

function MatchForm() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [batsman, setBatsman] = useState(["", ""]);
  const [bowler, setBowler] = useState("");
  const [overs, setOvers] = useState("");
  const [tossWinner, setTosswinner] = useState("");
  const [tossDecision, setTossDecision] = useState("");
  const navigate = useNavigate();
  const matchData = {
    teamA,
    teamB,
    batsman,
    bowler,
    overs,
    tossWinner,
    tossDecision,
  };
  const { errors, validate } = useFormValidation(matchData);
  const formSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    navigate("/scorer", {
      state: { ...matchData, overs: Number(overs) },
      replace: true,
    });
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center forms">
        <form
          onSubmit={formSubmit}
          className=" col-10 col-lg-5 col-md-5 col-sm-11 myForms"
        >
          <h1 className="text-center headText mb-4">Let's Start</h1>
          <input
            type="text"
            className={errors.teamA ? "input-error mb-0" : ""}
            placeholder="Enter the Team A Name"
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
          />
          {errors.teamA && <p className="error">{errors.teamA}</p>}
          <input
            type="text"
            className={errors.teamB ? "input-error mb-0" : ""}
            placeholder="Enter the Team B Name"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
          />
          {errors.teamB && <p className="error">{errors.teamB}</p>}
          <input
            type="text"
            className={errors.striker ? "input-error mb-0" : ""}
            placeholder="Enter striker name"
            value={batsman[0]}
            onChange={(e) => setBatsman([e.target.value, batsman[1]])}
          />
          {errors.striker && <p className="error">{errors.striker}</p>}
          <input
            type="text"
            className={errors.nonStriker ? "input-error mb-0" : ""}
            placeholder="Enter Non striker name"
            value={batsman[1]}
            onChange={(e) => setBatsman([batsman[0], e.target.value])}
          />
          {errors.nonStriker && <p className="error">{errors.nonStriker}</p>}
          <input
            type="text"
            className={errors.bowler ? "input-error mb-0" : ""}
            placeholder="Enter Bowler name"
            value={bowler}
            onChange={(e) => setBowler(e.target.value)}
          />
          {errors.bowler && <p className="error">{errors.bowler}</p>}
          <input
            type="number"
            className={errors.overs ? "input-error mb-0" : ""}
            placeholder="Enter the Total Overs"
            value={overs}
            onChange={(e) => setOvers(e.target.value)}
          />
          {errors.overs && <p className="error">{errors.overs}</p>}
          <div className=" dropDowns">
            <CustomDropdown
          value={tossWinner}
          placeholder="who won the toss"
          options={[teamA, teamB].filter(Boolean)}
          onChange={setTosswinner}
          errors = {errors.tossWinner}
          />
          <CustomDropdown
          value={tossDecision}
          placeholder="Toss Decision"
          options={["Bat","Bowl"]}
          onChange={setTossDecision}
          errors = {errors.tossDecision}
          />
          </div>
          
          
          <button type="submit" className=" w-100 btn formBtn">Track Score</button>
        </form>
      </div>
    </>
  );
}

export default MatchForm;
