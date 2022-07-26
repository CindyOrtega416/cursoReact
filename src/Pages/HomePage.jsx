import React from "react"
import Productos from '../Components/Productos'
import firebase from '../Config/firebase'
function HomePage(){
    
    console.log(firebase)
    return(
        <div className="">
            <Productos />
        </div>
    )
    
} 

export default HomePage