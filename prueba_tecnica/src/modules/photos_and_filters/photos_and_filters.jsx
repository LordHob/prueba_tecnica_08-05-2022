import React from 'react';
import './photos_and_filters.css';
import order from '../../img/order.png';
import foto1 from '../../img/foto1.jpg';
import foto2 from '../../img/foto2.jpeg';
import perro from '../../img/perro.jpg';
import arrow from '../../img/arrow.png';
import { photos } from '../../photos.js';

const SelectedPhoto = () =>{

    console.log(photos);

    return(
        <div className='photos_and_filters'>
            <div className="header">
                <div className="photos_and_filters_title">
                    <span>Photography</span><span className='separator'> / </span><span className='premium_photos'>Premium Photos</span>
                </div>
                <div className="order">
                    <img src={order} alt="Order" />
                    <span>Sort by</span>
                    <select name="categories" id="categories_select">
                        <option value="price">Price</option>
                        <option value="price">Name</option>
                    </select>
                </div>
            </div>
            <div className="container_filters_photographs">
                <div className="filters">
                    <div className="categories">
                        <div className="title_filters">Category</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">People</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Premium</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Pets</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Food</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Landmarks</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Cities</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Nature</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">More than $200</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {photos.map((photo) =>{
                            return(
                                <div className="photography">
                                    <div className="image_and_button" style={{backgroundImage: `url("${photo.url}")`}}>
                                        <div className="add_cart_photography">ADD TO CART</div>
                                    </div>
                                    <div className="category">{photo.category}</div>
                                    <div className="title">{photo.title}</div>
                                    <div className="price">${photo.price}</div>
                                </div> 
                            )
                        })}
                        
                    </div>
                    <div className="pages">
                        <img src={arrow} alt="ArrowLeft" />
                        <span>1 2 3 4</span>
                        <img src={arrow} alt="ArrowRight" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedPhoto;