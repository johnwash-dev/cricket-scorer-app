import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/scorer.css";
import ScoreBoard from "../Components/ScoreBoard";

function ScorerPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const totalOvers = Number(state.overs);
  const totalBalls = totalOvers * 6;

  const [innings, setInnings] = useState(1);
  const [battingTeam, setBattingTeam] = useState("");
  const [bowlingTeam, setBowlingTeam] = useState("");
  const [target, setTarget] = useState(null);
  const [result, setResult] = useState(null);

  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);

  const [batsman, setBatsman] = useState([
    {
      name: state.batsman[0],
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      strike: true,
    },
    {
      name: state.batsman[1],
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      strike: false,
    },
  ]);
  const [bowler, setBowler] = useState({
    name: state.bowler,
    balls: 0,
    runs: 0,
    wickets: 0,
  });
  const [pendingExtra, setPendingExtra] = useState(null);
  const [overEndWicket, setOverEndWicket] = useState(false);

  const [askBatsman, setAskBatsman] = useState(false);
  const [askBowler, setAskBowler] = useState(false);
  const [newBatsman, setNewBatsman] = useState("");
  const [newBowler, setNewBowler] = useState("");
  const [errors, setErrors] = useState("")

  const [askSecondInningsStart, setAskSecondInningsStart] = useState(false);
  const [asksecondInningsOpeners, setAskSecondInningsOpeners] = useState(false);
  const [secondInningsOpeners, setSecondInningsOpeners] = useState(["", ""]);

  useEffect(() => {
    if (state.tossDecision === "bat") {
      setBattingTeam(state.tossWinner);
      setBowlingTeam(
        state.tossWinner === state.teamA ? state.teamB : state.teamA,
      );
    } else {
      setBowlingTeam(state.tossWinner);
      setBattingTeam(
        state.tossWinner === state.teamA ? state.teamB : state.teamA,
      );
    }
  }, [state]);

  const ballsBowled = overs * 6 + balls;
  const ballsLeft = innings === 2 ? totalBalls - ballsBowled : null;
  const runsLeft = innings === 2 && target ? target - score : null;
  const crr = ballsBowled ? ((score / ballsBowled) * 6).toFixed(2) : "0.00";
  const rrr =
    innings === 2 && ballsLeft > 0 && runsLeft > 0
      ? ((runsLeft / ballsLeft) * 6).toFixed(2)
      : null;
  const isInputBlocked =
    askBatsman ||
    askBowler ||
    askSecondInningsStart ||
    result ||
    asksecondInningsOpeners;
  const bowlersBalls = overs * 6 + balls

  const swapStrike = () => {
    setBatsman(([a, b]) => [
      { ...b, strike: true },
      { ...a, strike: false },
    ]);
  };

  const handleBall = (currentScore) => {
    setBowler((b) => ({...b, balls: b.balls + 1 }));
    if (innings===2 && target && currentScore>=target){
      setResult(`${battingTeam} is won the match`)
    }
    if (balls + 1 === 6) {
      const newOvers = overs + 1;
      if (newOvers === totalOvers || wicket === 10) endInnings(currentScore);
      else {
        setOvers(newOvers);
        setBalls(0);
        swapStrike();
        if (!overEndWicket) {
          setAskBowler(true);
        }
      }
    } else setBalls((b) => b + 1);
  };

  const handleRun = (runs) => {
    if (isInputBlocked) return;
    if (pendingExtra === "wide" || pendingExtra === "noball") {
      const total = 1 + runs;
      const newScore = score + total;
      setScore(newScore);
      setBowler((b) => ({ ...b, runs: b.runs + total }));
      setPendingExtra(null);

      if (innings === 2 && target && newScore >= target) {
        setResult(`${battingTeam} won the match`);
        return;
      }
      return;
    }

    const newScore = score + runs;
    setScore(newScore);
    updateBatsman(runs);
    handleBall(newScore);
  };

  const updateBatsman = (runs) => {
    setBatsman(([s, ns]) => {
      const updated = {
        ...s,
        runs: s.runs + runs,
        balls: s.balls + 1,
        fours: runs === 4 ? s.fours + 1 : s.fours,
        sixes: runs === 6 ? s.sixes + 1 : s.sixes,
      };
      return [updated, ns];
    });
    setBowler(b => ({...b, runs: b.runs + runs}))
    if (runs % 2 === 1) swapStrike();
  };

  const islastBallofInnings = ()=>{
    const nextBall = overs * 6 + balls + 1
    return nextBall >= totalBalls || wicket + 1 >= 10
  }
  const handleWicket = () => {
    if (pendingExtra || isInputBlocked) return;
    const isLastBall = islastBallofInnings()
    setWicket((w) => w + 1);
    setBowler((b) => ({ ...b, wickets: b.wickets + 1 }));
    if (innings === 2 && target && score < target && isLastBall){
      endInnings(score)
      return
    }
    if (balls + 1 === 6) {
      setOverEndWicket(true)
    }
    handleBall(score);
    if (!isLastBall){
      setAskBatsman(true);
    }
  };

  const confirmNewBatsman = () => {
    const name = newBatsman.trim()
    const existingBatsman = batsman.map(b => b.name.toLowerCase())
    if(!name){
    setErrors("Batsman name should not be empty")
    return
    }

    if(existingBatsman.includes(name.toLowerCase())){
      setErrors("Batsman name should not same as existing batsman")
      return
    }

    setErrors("")
    setBatsman(([s, ns]) => [
      {
        name: newBatsman,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strike: !overEndWicket,
      },
      { ...ns, strike: false },
    ]);
    setNewBatsman("");
    setAskBatsman(false);

    if (overEndWicket) {
      setAskBowler(true);
      setOverEndWicket(false);
    }
  };

  const endInnings = (finalScore) => {
    if (innings === 1) {
      setTarget(finalScore + 1);
      setAskSecondInningsStart(true);
    } else {
      if (finalScore >= target) setResult(`${battingTeam}is won the match `);
      else setResult(`${bowlingTeam} is won the match`);
    }
  };

 const startSecondInnings = () => {
  setInnings(2);

  setScore(0);
  setWicket(0);
  setOvers(0);
  setBalls(0);
  setPendingExtra(null);
  setOverEndWicket(false);

  setBattingTeam(bowlingTeam);
  setBowlingTeam(battingTeam);

  setAskSecondInningsStart(false)
  setAskSecondInningsOpeners(true);
};
  const confirmSecondOpeners = () => {
    const [op1, op2] = secondInningsOpeners.map(b=> b.trim())

    if (!op1 || !op2){
      setErrors("Both openers name required")
      return
    }

    if (op1.toLowerCase() === op2.toLowerCase()){
      setErrors('Openers name cannot be same')
      return
    }
    setBatsman("")
    setBatsman([
      {
        name: secondInningsOpeners[0],
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strike: true,
      },
      {
        name: secondInningsOpeners[1],
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strike: false,
      },
    ]);
    setSecondInningsOpeners(false);
    setAskSecondInningsOpeners(false)
    setAskBowler(true);
  };

  const confirmSecondInngsBowler = () => {
    const name  = newBowler.trim()
    if(!name){
      setErrors("Bowler name should not be empty")
      return
    }
    if (name.toLowerCase()=== bowler.name.toLowerCase()){
      setErrors("Bowler name should not same as existing bowler")
      return
    }
    setErrors("")
    setBowler({ name: newBowler, balls: 0, wickets: 0, runs: 0 });
    setNewBowler("");
    setAskBowler(false);
  };

  return (
    <>
      {(askBatsman ||
        askBowler ||
        asksecondInningsOpeners ||
        askSecondInningsStart ||
        result) && (
        <div className="inputContainer ">
          <div className="card shadow p-3 text-center inputCard">
            {askBatsman ? (
              <>
                <h4>Wicket Fallen</h4>
                <input
                  className={`form-control my-2 ${errors && "border-2 border-danger"}`}
                  placeholder="New batsman"
                  value={newBatsman}
                  onChange={(e) => setNewBatsman(e.target.value)}
                />
                {errors && <p className="text-danger text-start">{errors}</p> }
                <button
                  className="btn btn-success w-100"
                  onClick={confirmNewBatsman}
                >
                  Confirm
                </button>
              </>
            ) : 
            askBowler ? (
              <>
                <h4>New Bowler</h4>
                <input
                  className={`form-control my-2 ${errors && "border-2 border-danger"}`}
                  placeholder="Bowler name"
                  value={newBowler}
                  onChange={(e) => setNewBowler(e.target.value)}
                />
                {errors && <p className="text-danger text-start">{errors}</p> }
                <button
                  className="btn btn-success w-100"
                  onClick={confirmSecondInngsBowler}
                >
                  Confirm
                </button>
              </>
            ) : 
            askSecondInningsStart ? (
              <>
                <h4>1st Innings Complete</h4>
                <p>Target: {target}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={startSecondInnings}
                >
                  Start 2nd Innings
                </button>
              </>
            ) : 
            asksecondInningsOpeners ? (
              <>
                <h4>2nd Innings Openers</h4>
                <input
                  className={`form-control my-2 ${errors && "border-2 border-danger"}`}
                  placeholder="Opener 1"
                  value={secondInningsOpeners[0]}
                  onChange={(e) =>
                    setSecondInningsOpeners([e.target.value, secondInningsOpeners[1]])
                  }
                />
                {errors && <p className="text-danger text-start">{errors}</p> }
                <input
                  className={`form-control my-2 ${errors && "border-2 border-danger"}`}
                  placeholder="Opener 2"
                  value={secondInningsOpeners[1]}
                  onChange={(e) =>
                    setSecondInningsOpeners([secondInningsOpeners[0], e.target.value])
                  }
                />
                {errors && <p className="text-danger text-start">{errors}</p> }
                <button
                  className="btn btn-success w-100"
                  onClick={confirmSecondOpeners}
                >
                  Confirm
                </button>
              </>
            ) : 
            result ? (
              <>
                <h3>Match Result</h3>
                <p className="fw-bold">{result}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Go to Home
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}

      <div className=" myContainer  ">
        <div className="row justify-content-center my-2 ">
          <div className="scoreBoard bg-blur shadow-lg col-lg-6 col-md-6 col-sm-10 col-11 ">
            <ScoreBoard
              teamA={state.teamA}
              teamB={state.teamB}
              battingTeam={battingTeam}
              bowlingTeam={bowlingTeam}
              innings={innings}
              scores={score}
              wickets={wicket}
              overs={`${overs}.${balls}`}
              ballsLeft={ballsLeft}
              runsLeft={runsLeft}
              batsman={batsman}
              bowler={bowler}
              target={target}
              rrr={rrr}
              crr={crr}
              result={result}
            />
          </div>
        </div>

        <div className="row text-center d-flex justify-content-center mb-2">
          <div className="myRow shadow-lg bg-blur col-lg-6 col-md-6 col-sm-10 col-11 ">
            <div className=" d-flex justify-content-center align-items-center flex-wrap p-1 ">
              {[0, 1, 2, 3, 4, 6].map((run) => (
                <div key={run}>
                  <button
                    onClick={() => handleRun(run)}
                    className="btn btn-success buttons mx-2 mb-2 "
                  >
                    {run}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row overflow-x-hidden d-flex justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-10 col-11 shadow-lg myRow bg-blur">
            <div className="d-flex justify-content-center align-items-center flex-wrap p-2">
              <div className=" form-check mb-2 me-2">
                <input
                  type="checkbox"
                  className=" form-check-input"
                  checked={pendingExtra === "wide"}
                  onChange={() =>
                    setPendingExtra(pendingExtra === "wide" ? null : "wide")
                  }
                />
                <label className="form-check-label">Wide</label>
              </div>
              <div className=" form-check mb-2 me-2">
                <input
                  type="checkbox"
                  className=" form-check-input"
                  checked={pendingExtra === "noball"}
                  onChange={() =>
                    setPendingExtra(pendingExtra === "noball" ? null : "noball")
                  }
                />
                <label className="form-check-label">No ball</label>
              </div>
              
              <div className=" form-check mb-2 me-2 ">
                <input
                  type="checkbox"
                  className=" form-check-input"
                  checked={pendingExtra === "byes"}
                  onChange={() =>
                    setPendingExtra(pendingExtra === "byes" ? null : "byes")
                  }
                />
                <label className="form-check-label">Byes</label>
              </div>
              <div className=" form-check mb-2 me-2 mb-1 ">
                <input
                  type="checkbox"
                  className=" form-check-input "
                  checked={pendingExtra === "legbyes"}
                  onChange={() =>
                    setPendingExtra(
                      pendingExtra === "legbyes" ? null : "legbyes",
                    )
                  }
                />
                <label className="form-check-label">Leg byes</label>
              </div>
              <button className="btn btn-danger " onClick={handleWicket}>
                wicket
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScorerPage;
