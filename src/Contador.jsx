import React,{useState,useReducer} from "react"

function reducer(state,action){
  console.log("reducer",state,action)
  switch(action.type){
    case "incrementar":
      return {cantidad:state.cantidad+1}
    case "decrementar":
      return {cantidad:state.cantidad-1}
    default:
      return {cantidad:0}
  }
}

function Contador() {

  const [state,dispatch] = useReducer(reducer,{cantidad:0})

  return (
    <div className="App">
      <button onClick={()=>dispatch({type:"incrementar"})}>Incrementar</button>
      <button onClick={()=>dispatch({type:"decrementar"})}>Decrementar</button>
      <div>
        {state.cantidad}
      </div>
    </div>
  );
}

export default Contador;
