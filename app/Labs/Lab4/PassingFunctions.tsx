"use client"

export default function PassingFunctions(
 { theFunction }: { theFunction: () => void }) {
  return (
    <div>
      <h2>Passing Functions</h2>
      <button onClick={theFunction} className="btn btn-primary ms-1">
        Invoke the Function
      </button>
      <hr/>
    </div>
);}
