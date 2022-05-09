import React from 'react';
import './filtersAndPhotographs.css';
import filter from '../../img/filter.png';
import arrow from '../../img/arrow.png';
import Photography from '../../atoms/photography/photography';
import CheckboxItem from '../../atoms/checkboxItem/checkboxItem';

const FiltersAndPhotographs = (props) =>{

    return(
        <div className="container_filters_photographs">
                <div className="filters" id="filters">
                    {props.showFiltersMovil
                    ?
                    <div className="header_movil">
                        <div className="photos_and_filters_title_movil">
                            <span>Photography</span><span className='separator'> / </span><span className='premium_photos'>Premium Photos</span>
                        </div>
                        <div className="button_filters">
                            <img src={filter} alt="Filter" onClick={() => props.seeFilters()}/>
                        </div>
                    </div>
                    :
                    null
                    }
                    <div className="categories">
                        <div className="title_filters">Category</div>
                        {props.showFiltersMovil
                        ?
                        <div className='close_movil_filters' onClick={() => props.closeFilters()}>X</div>
                        :
                        null
                        }
                        <div className="checkbox_list">
                            {props.filtersCategory.map((filter) =>{
                                return(
                                    <CheckboxItem
                                        filter={filter}
                                        addFilter={props.addFilter}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="lower_than_20" id="lower_than_20" onChange={() => props.addFilter("0-19")}/>
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="20_100" id="20_100" onChange={() => props.addFilter("20-99")}/>
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="100_200" id="100_200" onChange={() => props.addFilter("100-200")}/>
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="more_than_200" id="more_than_200" onChange={() => props.addFilter("201")}/>
                                <label htmlFor="more_than_200">More than $200</label>
                            </div>
                        </div>
                    </div>
                    {props.showFiltersMovil
                    ?
                    <div className="save_clear_filters">
                        <div className="clear_filters" onClick={() => props.closeAndClearFilters()}>CLEAR</div>
                        <div className="save_filters" onClick={() => props.closeFilters()}>SAVE</div>
                    </div>
                    :
                    null
                    }
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {props.photosPaginated.map((photo) =>{
                            return(
                                <Photography
                                    id={photo?.id}
                                    url={photo?.url}
                                    addToCart={props.addToCart}
                                    category={photo?.category}
                                    title={photo?.title}
                                    price={photo?.price}
                                    photo={photo}
                                />
                            )
                        })}
                        
                    </div>
                    <div className="pages">
                        <img src={arrow} alt="ArrowLeft" onClick={() => props.previousPage()} className={props.indexPagination <= 0 ? 'disabled' : ""}/>
                        {props.pages.map((page) =>{
                            return(
                                page
                            )
                        })}
                        <img src={arrow} alt="ArrowRight" onClick={() => props.nextPage()} className={props.activePage === props.maxPages ? 'disabled' : ""}/>
                    </div>
                </div>
            </div>
    )
}

export default FiltersAndPhotographs;