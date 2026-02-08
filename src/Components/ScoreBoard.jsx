import "../styles/scoreBoard.css"

export default function ScoreBoard({
teamA,
teamB,
battingTeam,
bowlingTeam,
innings,
scores,
wickets,
overs,
batsman,
bowler,
target,
crr,
rrr,
}){
  return(
    <>
    <h3 className="text-light text-center">{teamA} vs {teamB}</h3>
    <div className="card card-borders text-light mb-1 bg-blur d-flex ">
      <div className="card-body p-3 d-flex justify-content-between align-items-center">
        <div className=" text-start">
          <p className="fs-5 fw-semibold text-muted m-0">{battingTeam}, {innings === 1 ? '1st':'2nd'} Innings</p>
          <p className="fs-2 fw-bold m-0">{scores} - {wickets} <span className="fs-6 ">({overs})</span></p>
        </div>
        <div>
          <div className=" fs-6 fw-semibold text-black">CRR</div>
          <p className="fs-6 fw-bold">{crr}</p>
        </div>
      </div>
    </div>

    { innings === 2 &&(
      <div className="card card-borders bg-blur p-0 mb-1">
        <div className="card-body bg-blur d-flex justify-content-between">
          <h4>Target : {target}</h4>
          <h4>RRR: {rrr}</h4>
        </div>
      </div>
    )}

    <div className="card card-borders bg-blur px-3 mb-1">
      <div className="row fw-semibold row-bottom text-center py-2">
        <div className="col-4 text-start ps-3">Batsman</div>
        <div className="col px-0">R</div>
        <div className="col px-0">B</div>
        <div className="col px-0">6s</div>
        <div className="col px-0">4s</div>
        <div className="col px-0">SR</div>
      </div>
       {batsman.map((b,i)=>(
      <div key={i} className="row text-lightWhite py-2 text-center ">
        <div className={`col-4 text-start ps-3 ${b.strike? 'text-danger fw-semibold':''}`}>
          {b.name}{b.strike ? '*' : ''}
        </div>
        <div className="col">{b.runs}</div>
        <div className="col">{b.balls}</div>
        <div className="col">{b.sixes}</div>
        <div className="col">{b.fours}</div>
        <div className="col">{b.balls ? ((b.runs/b.balls)*100).toFixed(1): "0.00"}</div>
      </div>
    ))}
    </div>
    
    <div className="card card-borders bg-blur pe-3  overflow-x-hidden">
      <div className="row fw-semibold row-bottom ps-3 py-2 text-center">
        <div className="col-4 text-start ps-3 px-0">Bowler</div>
        <div className="col px-0">O</div>
        <div className="col px-0">R</div>
        <div className="col px-0">W</div>
        <div className="col px-0">ER</div>
      </div>
      <div className="row  text-lightWhite ps-3 py-2 text-center">
        <div className="col-4 text-start ps-3 px-0">{bowler.name}</div>
        <div className="col px-0">{Math.floor((bowler.balls/6))}.{bowler.balls%6}</div>
        <div className="col px-0">{bowler.runs}</div>
        <div className="col px-0">{bowler.wickets}</div>
        <div className="col px-0">{bowler.balls ? (bowler.runs/(bowler.balls/6)).toFixed(2): '0.00'}</div>
      </div>
    </div>
    
    </>
  )
}
