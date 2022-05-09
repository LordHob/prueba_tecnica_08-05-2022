import React from 'react';
import './headerPhotosAndFilter.css';
import order from '../../img/order.png';
import filter from '../../img/filter.png';
import arrow from '../../img/arrow.png';

const HeaderPhotosAndFilter = (props) =>{

    return(
        <div className="header">
            <div className="photos_and_filters_title">
                <span>Photography</span><span className='separator'> / </span><span className='premium_photos'>Premium Photos</span>
            </div>
            {document.documentElement.scrollWidth > 768
            ?
            <div className="order">
                <img src={order} alt="Order" onClick={() => props.orderPhotos()}/>
                <span>Sort by</span>
                <select name="categories" id="categories_select" onChange={() => props.configOrderKey()}>
                    <option value="price" selected>Price</option>
                    <option value="title">Title</option>
                </select>
                <img src={arrow} alt="Select" />
            </div>
            :
            <div className="button_filters">
                <img src={filter} alt="Filter" onClick={() => props.seeFilters()}/>
            </div>
            }
        </div>
    )
}

export default HeaderPhotosAndFilter;