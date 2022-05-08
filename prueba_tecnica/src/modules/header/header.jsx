import React from 'react';
import './header.css';
import shopping_cart from '../../img/shopping-cart.svg';

const Header = () =>{

    return(
        <div className='header'>
            <img src={shopping_cart} alt="Shopping Cart" />
            <hr />
        </div>
    )
}

export default Header;