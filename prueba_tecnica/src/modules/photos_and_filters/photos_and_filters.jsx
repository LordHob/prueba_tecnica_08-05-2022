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
    const [orderKey, setOrderKey] = useState("Price");
    const [orderWay, setOrderWay] = useState("ASC");

    
    
    /*GUARDA FOTOS CON FILTRO SI EXISTE ALGUN FILTRO APLICADO, Y SI NO GUARDA TODAS
    GUARDA LAS FOTOS FILTRADAS POR PRECIO EN SU PROPIO ARRAY
    GUARDA LAS FOTOS FILTRADAS POR CATEGORIAS EN SU PROPIO ARRAY
    */
    useEffect(()=>{
        setActivePage(1);
        if (filters.length !== 0) {
            setPhotosFiltered(photosFiltered => []);
            let photosCategories = [];
            let photosPrizes = [];
            filters.map((filter)=>{
                if (filter === "0-19" || filter === "20-99" || filter === "100-200" || filter === "201") {
                    switch (filter) {
                        case "0-19":
                            photos.map((photo) =>{
                                if (photo.price < 20) {
                                    photosPrizes.push(photo);
                                }
                            })
                            break;
                        case "20-99":
                            photos.map((photo) =>{
                                if (photo.price >= 20 & photo.price <= 100) {
                                    photosPrizes.push(photo);
                                }
                            })
                            break;
                        case "100-200":
                            photos.map((photo) =>{
                                if (photo.price > 100 & photo.price < 201) {
                                    photosPrizes.push(photo);
                                }
                            })
                            break;
                        case "201":
                            photos.map((photo) =>{
                                if (photo.price >= 201) {
                                    photosPrizes.push(photo);
                                }
                            })
                            break;
                    
                        default:
                            break;
                    }
                } else {
                    photos.map((photo) =>{
                        if (photo.category === filter) {
                            photosCategories.push(photo);
                        }
                    })
                }
            });
            if (photosCategories.length > 0 & photosPrizes.length > 0) {
                photosCategories.map((photoCategory) =>{
                    photosPrizes.map((photoPrice) =>{
                        if (photoCategory.id === photoPrice.id) {
                            setPhotosFiltered(photosFiltered => [...photosFiltered, photoPrice]);
                        }
                    })
                })
            }
            if (photosCategories.length > 0 & photosPrizes.length === 0) {
                setPhotosFiltered(photosCategories);
            }
            if (photosCategories.length === 0 & photosPrizes.length > 0) {
                setPhotosFiltered(photosPrizes);
            }
        } else{
            setPhotosFiltered(photos);
        }
    }, [filters]);

    /*MUESTRA HASTA 6 FOTOS POR PAGINA AL CAMBIAR DE FILTROS, Y MUESTRO LA CANTIDAD DE PAGINAS TOTALES*/
    useEffect(()=>{
        console.log(photosFiltered);
        setIndexPagination(0);
        if (photosFiltered.length > 0) {
            setPhotosPaginated(photosPaginated => []);
            for (let i = indexPagination; i < 6; i++) {
                if(photosFiltered[i]?.id){
                    setPhotosPaginated(photosPaginated => [...photosPaginated, photosFiltered[i]]);
                }
            }
        }
        let maxPage = Math.ceil(photosFiltered.length/6);
        setMaxPages(Math.ceil(photosFiltered.length/6));
        setPages(pages => []);
        for (let i = 1; i <= maxPage; i++) {
            setPages(pages => [...pages, <span id={i} className={activePage === i ? 'active' : ""}>{i}</span>]);
        }
    }, [photosFiltered]);
    
    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(()=>{
        if (photosFiltered.length > 0) {
            setPhotosPaginated(photosPaginated => []);
            for (let i = indexPagination; i < indexPagination + 6; i++) {
                if(photosFiltered[i]?.id){
                    setPhotosPaginated(photosPaginated => [...photosPaginated, photosFiltered[i]]);
                }
            }
        }
    }, [indexPagination]);

    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(()=>{
        for (let i = 1; i <= maxPages; i++) {
            if (document.getElementById(i)) {
                document.getElementById(i).classList.remove('active');
            }
        }
        if (document.getElementById(activePage)) {
            document.getElementById(activePage).classList.add('active');            
        }
    }, [activePage]);

    /*CONFIGURA QUE CRITERIO SIGUE PARA ORDENAR LAS FOTOS*/
    const configOrderKey = () => {
        setOrderKey(document.getElementById("categories_select").selectedOptions[0].innerHTML);
    }

    /*ORDENA RESULTADOS*/
    const orderPhotos = () => {
        let ordenedPhotos = []
        photosFiltered.map((photo) => {
            ordenedPhotos.push(photo);
        })
        console.log(orderKey);
        if (orderKey === "Price") {
            console.log(orderWay);
            if (orderWay === "ASC") {
                ordenedPhotos.sort(function (a, b) {
                    if (a.price > b.price) {
                    return 1;
                    }
                    if (a.price < b.price) {
                    return -1;
                    }
                    return 0;
                })
                console.log(ordenedPhotos);
                setOrderWay("DESC");
                setPhotosFiltered(ordenedPhotos);
                return;
            } else{
                ordenedPhotos.sort(function (a, b) {
                    if (a.price > b.price) {
                    return -1;
                    }
                    if (a.price < b.price) {
                    return 1;
                    }
                    return 0;
                })
                setOrderWay("ASC");
                setPhotosFiltered(ordenedPhotos);
                return;
            }
        } else{
            if (orderWay === "ASC") {
                ordenedPhotos.sort(function (a, b) {
                    if (a.title > b.title) {
                    return 1;
                    }
                    if (a.title < b.title) {
                    return -1;
                    }
                    return 0;
                })
                setOrderWay("DESC");
                setPhotosFiltered(ordenedPhotos);
                return;
            } else{
                ordenedPhotos.sort(function (a, b) {
                    if (a.title > b.title) {
                    return -1;
                    }
                    if (a.title < b.title) {
                    return 1;
                    }
                    return 0;
                })
                setOrderWay("ASC");
                setPhotosFiltered(ordenedPhotos);
                return;
            }
        }
    }

    /*AÑADE O QUITA FILTROS*/
    const addFilter = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(key => key !== filter));
            return;
        } else{
            setFilters([...filters, filter]);
            return;
        }
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
                    <img src={order} alt="Order" onClick={() => orderPhotos()}/>
                    <span>Sort by</span>
                    <select name="categories" id="categories_select" onChange={()=>configOrderKey()}>
                        <option value="price" selected>Price</option>
                        <option value="price">Name</option>
                    </select>
                    <img src={arrow} alt="Select" />
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
                                <input type="checkbox" name="lower_than_20" id="lower_than_20" onChange={() => addFilter("0-19")}/>
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="20_100" id="20_100" onChange={() => addFilter("20-99")}/>
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="100_200" id="100_200" onChange={() => addFilter("100-200")}/>
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="more_than_200" id="more_than_200" onChange={() => addFilter("201")}/>
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