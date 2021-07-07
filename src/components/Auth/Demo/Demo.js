import React from 'react';
import './demo.css';

export const Demo = props => {
    return (
        <div className={`demo__wrapper ${props.isOpened ? 'open' : 'close'}`} style={{...props.style}}> 
            <div className='demo__body'>
                <div className='demo__close' onClick={props.onDemoClose}>
                    {/* Кнопка закрытия окна */}
                    ×
                </div>

                <div className='demo__title'>
                    <h2>{props.title}</h2>
                </div>
                
                <hr />
                <div className='demo__text'>
                    {props.children}
                </div>
                
            </div>
        </div>
    )
}