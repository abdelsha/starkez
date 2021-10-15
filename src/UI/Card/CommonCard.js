import React from 'react'
import './CommonCard.css'

function CommonCard(props) {
    return <div className='CommonCard'>{props.children}</div>
}

export default CommonCard;