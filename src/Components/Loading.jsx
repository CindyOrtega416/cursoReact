import React from "react"
// import './Input.css'
import Spinner from 'react-bootstrap/Spinner'
// import classes from './Input.css'

const styles={
    spinner:{
        position:"fixed",
        top:"50%",
        left:"50%"
    }
}

function Loading(props){
    const {loading,children,configuration} = props
    if(loading){
        return(<Spinner style={styles.spinner} animation={configuration?.animation || "grow"} variant={configuration?.variant || "dark"}  />)
    }else{
        return(
            <>
                {children}
            </>
        )
    }

    
}
export default Loading