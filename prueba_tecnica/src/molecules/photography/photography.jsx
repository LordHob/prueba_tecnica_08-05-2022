import React, { useEffect, useState } from 'react';
import './photography.css';

const Photography = (props) =>{

    return(
        <div className="photography" key={props.id}>
            <div id={"photo" + props.id} className="image_and_button" style={{backgroundImage: `url("${props.url}")`}}>
                <div className="add_cart_photography" onClick={() => props.addToCart(props.photo)}>ADD TO CART</div>
            </div>
            <div className="category">{props.category}</div>
            <div className="title">{props.title}</div>
            <div className="price">${props.price}</div>
        </div>
    )
}

export default Photography;