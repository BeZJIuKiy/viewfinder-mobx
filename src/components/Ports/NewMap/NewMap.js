import React from 'react'; 
import './newMap.css';



export const NewMap = (props) => {
    return (
        <div className={`newmap ${props.isVisible ? 'show' : 'hide'}`} style={{...props.style}}>
            Some new Map
        </div>
    )        
}