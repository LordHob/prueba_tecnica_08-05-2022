import React, { useEffect, useState } from 'react';
import './photos_and_filters.css';
import order from '../../img/order.png';
import arrow from '../../img/arrow.png';
import { photos } from '../../photos.js';

const SelectedPhoto = () =>{
    
    const [photosFiltered, setPhotosFiltered] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(()=>{
        console.log(filters);
        if (filters.length !== 0) {
            setPhotosFiltered(photosFiltered => []);
            filters.map((filter)=>{
                photos.map((photo) =>{
                    if (photo.category === filter) {
                        setPhotosFiltered(photosFiltered => [...photosFiltered, photo]);
                    }
                })
            });
        } else{
            setPhotosFiltered(photos);
        }
    }, [filters])

    const addFilter = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(key => key !== filter));
            return;
        } else{
            setFilters([...filters, filter]);
            return;
        }
    }

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
                                <input type="checkbox" name="People" id="People" onChange={() => addFilter("People")}/>
                                <label htmlFor="People">People</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Premium" id="Premium" onChange={() => addFilter("Premium")}/>
                                <label htmlFor="Premium">Premium</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Pets" id="Pets" onChange={() => addFilter("Pets")}/>
                                <label htmlFor="Pets">Pets</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Food" id="Food" onChange={() => addFilter("Food")}/>
                                <label htmlFor="Food">Food</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Landmarks" id="Landmarks" onChange={() => addFilter("Landmarks")}/>
                                <label htmlFor="Landmarks">Landmarks</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Cities" id="Cities" onChange={() => addFilter("Cities")}/>
                                <label htmlFor="Cities">Cities</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Nature" id="Nature" onChange={() => addFilter("Nature")}/>
                                <label htmlFor="Nature">Nature</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="lower_than_20" id="lower_than_20" />
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="20_100" id="20_100" />
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="100_200" id="100_200" />
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="more_than_200" id="more_than_200" />
                                <label htmlFor="more_than_200">More than $200</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {photosFiltered.map((photo) =>{
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