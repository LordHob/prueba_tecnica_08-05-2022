import React from 'react';
import './header.css';
import shopping_cart from '../../img/shopping-cart.svg';

const Header = (props) =>{

    const showShoppingCart = () => {
        document.getElementById("shopping_cart_information").style.display = "flex";
    }

    const closeShoppingCart = () => {
        document.getElementById("shopping_cart_information").style.display = "none";
    }

    return(
        <div className='header'>
            <div className="shopping_cart">
                <div className="shopping_cart_information" id="shopping_cart_information">
                    <div className='close_shopping_cart'><span onClick={() => closeShoppingCart()}>X</span></div>
                    <div className='products_shopping_cart'></div>
                    {props.products.map((item) => {
                        return(
                            <div className='product_shopping_cart'>
                                <div className='information_product'>
                                    <div className="title_product">{item?.title}</div>
                                    <div className="price_product">${item?.price}</div>
                                </div>
                                <div className="photo_product" style={{backgroundImage: `url("${item?.url}")`}}></div>
                            </div>
                        )
                    })}
                    <hr />
                    <div className='button_clear_shopping_cart' onClick={() => props.clearCart()}>CLEAR</div>
                </div>
                {props.products.length > 0
                ?
                <span className='shopping_cart_notification' onClick={() => showShoppingCart()}>{props.products.length}</span>
                :
                null
                }
                <img src={shopping_cart} alt="Shopping Cart" onClick={() => showShoppingCart()}/>
            </div>
            <hr />
        </div>
    )
}

export default Header;