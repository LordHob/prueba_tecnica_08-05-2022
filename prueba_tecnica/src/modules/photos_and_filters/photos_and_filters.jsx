import React, { useEffect, useState } from 'react';
import './photos_and_filters.css';
import order from '../../img/order.png';
import arrow from '../../img/arrow.png';
import { photos } from '../../photos.js';

const SelectedPhoto = () =>{
    
    /*HOOKS*/
    const [photosFiltered, setPhotosFiltered] = useState([]);
    const [filters, setFilters] = useState([]);
    const [photosPaginated, setPhotosPaginated] = useState([]);
    const [indexPagination, setIndexPagination] = useState(0);
    const [maxPages, setMaxPages] = useState();
    const [activePage, setActivePage] = useState(1);
    const [pages, setPages] = useState([]);

    /*GUARDA FOTOS CON FILTRO SI EXISTE ALGUN FILTRO APLICADO, Y SI NO GUARDA TODAS*/
    useEffect(()=>{
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
    }, [filters]);

    /*MUESTRA 6 FOTOS POR PAGINA AL CAMBIAR DE FILTROS, Y MUESTRO LA CANTIDAD DE PAGINAS TOTALES*/
    useEffect(()=>{
        setIndexPagination(0);
        if (photosFiltered.length > 0) {
            setPhotosPaginated(photosPaginated => []);
            for (let i = indexPagination; i < 6; i++) {
                setPhotosPaginated(photosPaginated => [...photosPaginated, photosFiltered[i]]);
            }
        }
        setMaxPages(photosFiltered.length/6);
        setPages(pages => []);
        for (let i = 1; i <= photosFiltered.length/6; i++) {
            setPages(pages => [...pages, <span id={i} className={activePage === i ? 'disabled' : ""}>{i}</span>]);
        }
    }, [photosFiltered]);
    
    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(()=>{
        if (photosFiltered.length > 0) {
            setPhotosPaginated(photosPaginated => []);
            for (let i = indexPagination; i < indexPagination + 6; i++) {
                setPhotosPaginated(photosPaginated => [...photosPaginated, photosFiltered[i]]);
            }
        }
    }, [indexPagination]);

    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(()=>{
        for (let i = 1; i <= maxPages; i++) {
            if (document.getElementById(i)) {
                document.getElementById(i).classList.remove('disabled');
            }
        }
        if (document.getElementById(activePage)) {
            document.getElementById(activePage).classList.add('disabled');            
        }
    }, [activePage]);

    /*AÑADE O QUITA FILTROS*/
    const addFilterCategory = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(key => key !== filter));
            return;
        } else{
            setFilters([...filters, filter]);
            return;
        }
    }

    const addFilterPrice = (lowPrice, highPrice) => {
        
    }

    const nextPage = () => {
        setIndexPagination(indexPagination + 6);
        setActivePage(activePage + 1);
    }
    
    const previousPage = () => {
        setIndexPagination(indexPagination - 6);
        setActivePage(activePage - 1);
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
                                <input type="checkbox" name="People" id="People" onChange={() => addFilterCategory("People")}/>
                                <label htmlFor="People">People</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Premium" id="Premium" onChange={() => addFilterCategory("Premium")}/>
                                <label htmlFor="Premium">Premium</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Pets" id="Pets" onChange={() => addFilterCategory("Pets")}/>
                                <label htmlFor="Pets">Pets</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Food" id="Food" onChange={() => addFilterCategory("Food")}/>
                                <label htmlFor="Food">Food</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Landmarks" id="Landmarks" onChange={() => addFilterCategory("Landmarks")}/>
                                <label htmlFor="Landmarks">Landmarks</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Cities" id="Cities" onChange={() => addFilterCategory("Cities")}/>
                                <label htmlFor="Cities">Cities</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Nature" id="Nature" onChange={() => addFilterCategory("Nature")}/>
                                <label htmlFor="Nature">Nature</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="lower_than_20" id="lower_than_20" onChange={() => addFilterPrice(0, 19)}/>
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="20_100" id="20_100" onChange={() => addFilterPrice(20, 99)}/>
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="100_200" id="100_200" onChange={() => addFilterPrice(100, 200)}/>
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="more_than_200" id="more_than_200" onChange={() => addFilterPrice(201, 10000)}/>
                                <label htmlFor="more_than_200">More than $200</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {photosPaginated.map((photo) =>{
                            return(
                                <div className="photography" key={photo?.id}>
                                    <div className="image_and_button" style={{backgroundImage: `url("${photo?.url}")`}}>
                                        <div className="add_cart_photography">ADD TO CART</div>
                                    </div>
                                    <div className="category">{photo?.category}</div>
                                    <div className="title">{photo?.title}</div>
                                    <div className="price">${photo?.price}</div>
                                </div> 
                            )
                        })}
                        
                    </div>
                    <div className="pages">
                        <img src={arrow} alt="ArrowLeft" onClick={() => previousPage()} className={indexPagination <= 0 ? 'disabled' : ""}/>
                        {pages.map((page) =>{
                            return(
                                page
                            )
                        })}
                        <img src={arrow} alt="ArrowRight" onClick={() => nextPage()} className={activePage === maxPages ? 'disabled' : ""}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedPhoto;