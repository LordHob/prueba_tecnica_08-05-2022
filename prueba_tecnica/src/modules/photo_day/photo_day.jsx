import React, { useEffect, useState } from 'react';
import './photo_day.css';
import { photos } from '../../photos.js';

const PhotoDay = (props) =>{

    const [maxSales, setMaxSales] = useState({});
    const [secondSales, setSecondSales] = useState({});
    const [thirdSales, setThirdSales] = useState({});
    const [fourthSales, setFourthSales] = useState({});

    useEffect(() => {
        let sales = [];
        photos.map((photo) => {
            sales.push(photo.sales);
        })

        /*SACO FOTO CON MAS VENTAS*/
        let max = Math.max(...sales);
        setMaxSales(photos.filter(photo => photo.sales === max));

        /*SACO LA SEGUNDA FOTO CON MAS VENTAS*/
        sales = sales.filter(price => price !== max);
        let second = Math.max(...sales);
        setSecondSales(photos.filter(photo => photo.sales === second));
        
        /*SACO LA TERCERA FOTO CON MAS VENTAS*/
        sales = sales.filter(price => price !== second);
        let third = Math.max(...sales);
        setThirdSales(photos.filter(photo => photo.sales === third));
        
        /*SACO LA CUARTA FOTO CON MAS VENTAS*/
        sales = sales.filter(price => price !== third);
        let fourth = Math.max(...sales);
        setFourthSales(photos.filter(photo => photo.sales === fourth));
    }, []);

    return(
        <div className='photo_day'>
            <div className="header">
                <div className="photo_title">{maxSales[0]?.title}</div>
                {document.documentElement.scrollWidth > 768
                ?
                <div className="add_to_cart_photo_day" onClick={() => props.addToCart(maxSales[0])}>ADD TO CART</div>
                :
                null
                }
            </div>
            <div className="main_photo" style={{backgroundImage: `url("${maxSales[0]?.url}")`}}>
                <div className="message_photo_day">Photo of the day</div>
            </div>
            {document.documentElement.scrollWidth <= 768
            ?
            <div className="add_to_cart_photo_day_movil">ADD TO CART</div>
            :
            null
            }
            <div className="information_main_photo">
                <div className="about">
                    <div className="title_information_photo">About the {maxSales[0]?.title}</div>
                    <div className="category_information_photo">{maxSales[0]?.category}</div>
                    <div className="text_information_photo">{maxSales[0]?.description}</div>
                </div>
                <div className="alsobuy_and_details">
                    <div className="alsobuy">
                        <div className="title_information_photo">People also buy</div>
                        <div className="alsobuy_images">
                            <div className="alsobuy_image" style={{backgroundImage: `url("${secondSales[0]?.url}")`}}>
                            </div>
                            <div className="alsobuy_image" style={{backgroundImage: `url("${thirdSales[0]?.url}")`}}>
                            </div>
                            <div className="alsobuy_image" style={{backgroundImage: `url("${fourthSales[0]?.url}")`}}>
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="title_information_photo">Details</div>
                        <div className="size_information_photo">Size: {maxSales[0]?.size} pixel</div>
                        <div className="size_information_photo">Size: {maxSales[0]?.weight}</div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default PhotoDay;