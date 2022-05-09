import React, { useEffect, useState } from 'react';
import './photos_and_filters.css';
import order from '../../img/order.png';
import arrow from '../../img/arrow.png';
import filter from '../../img/filter.png';
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
    const [showFiltersMovil, setShowFiltersMovil] = useState(false);
    const [photosPerPage, setPhotosPerPage] = useState(6);

    /*DETERMINA LA CANTIDAD DE FOTOS QUE SE VEN POR PÁGINA (6 EN VERSIÓN NORMAL Y 4 EN VERSIÓN MOVIL*/
    useEffect(() =>{
        if (document.documentElement.scrollWidth > 768) {
            setPhotosPerPage(6);
        } else{
            setPhotosPerPage(4);
        }
    })
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

    /*MUESTRA HASTA 6 FOTOS POR PAGINA (4 EN VERSIÓN MOVIL) AL CAMBIAR DE FILTROS, Y MUESTRO LA CANTIDAD DE PAGINAS TOTALES*/
    useEffect(()=>{
        setIndexPagination(0);
        if (photosFiltered.length > 0) {
            setPhotosPaginated(photosPaginated => []);
            for (let i = indexPagination; i < photosPerPage; i++) {
                if(photosFiltered[i]?.id){
                    setPhotosPaginated(photosPaginated => [...photosPaginated, photosFiltered[i]]);
                }
            }
        }
        let maxPage = Math.ceil(photosFiltered.length/photosPerPage);
        setMaxPages(Math.ceil(photosFiltered.length/photosPerPage));
        setPages(pages => []);
        for (let i = 1; i <= maxPage; i++) {
            setPages(pages => [...pages, <span id={i} className={activePage === i ? 'active' : ""}>{i}</span>]);
        }
    }, [photosFiltered]);
    
    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(()=>{
        if (photosFiltered.length > 0) {
            setPhotosPaginated(photosPaginated => []);
            for (let i = indexPagination; i < indexPagination + photosPerPage; i++) {
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
        if (orderKey === "Price") {
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
        setIndexPagination(indexPagination + photosPerPage);
        setActivePage(activePage + 1);
    }
    
    const previousPage = () => {
        setIndexPagination(indexPagination - photosPerPage);
        setActivePage(activePage - 1);
    }

    const seeFilters = () => {
        document.getElementById("filters").style.display = "inline-block";
        setShowFiltersMovil(true)
    }

    const closeFilters = () => {
        document.getElementById("filters").style.display = "none";
        setShowFiltersMovil(false)
    }

    const closeAndClearFilters = () => {
        let checkboxes = document.getElementsByClassName("input_checkbox");
        console.log(checkboxes);
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        document.getElementById("filters").style.display = "none";
        setShowFiltersMovil(false)
        setFilters([]);
    }

    return(
        <div className='photos_and_filters'>
            <div className="header">
                <div className="photos_and_filters_title">
                    <span>Photography</span><span className='separator'> / </span><span className='premium_photos'>Premium Photos</span>
                </div>
                {document.documentElement.scrollWidth > 768
                ?
                <div className="order">
                    <img src={order} alt="Order" onClick={() => orderPhotos()}/>
                    <span>Sort by</span>
                    <select name="categories" id="categories_select" onChange={()=>configOrderKey()}>
                        <option value="price" selected>Price</option>
                        <option value="price">Name</option>
                    </select>
                    <img src={arrow} alt="Select" />
                </div>
                :
                <div className="button_filters">
                    <img src={filter} alt="Filter" onClick={() => seeFilters()}/>
                </div>
                }
            </div>
            <div className="container_filters_photographs">
                <div className="filters" id="filters">
                    {showFiltersMovil
                    ?
                    <div className="header_movil">
                        <div className="photos_and_filters_title_movil">
                            <span>Photography</span><span className='separator'> / </span><span className='premium_photos'>Premium Photos</span>
                        </div>
                        <div className="button_filters">
                            <img src={filter} alt="Filter" onClick={() => seeFilters()}/>
                        </div>
                    </div>
                    :
                    null
                    }
                    <div className="categories">
                        <div className="title_filters">Category</div>
                        {showFiltersMovil
                        ?
                        <div className='close_movil_filters' onClick={() => closeFilters()}>X</div>
                        :
                        null
                        }
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="People" id="People" onChange={() => addFilter("People")}/>
                                <label htmlFor="People">People</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Premium" id="Premium" onChange={() => addFilter("Premium")}/>
                                <label htmlFor="Premium">Premium</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Pets" id="Pets" onChange={() => addFilter("Pets")}/>
                                <label htmlFor="Pets">Pets</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Food" id="Food" onChange={() => addFilter("Food")}/>
                                <label htmlFor="Food">Food</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Landmarks" id="Landmarks" onChange={() => addFilter("Landmarks")}/>
                                <label htmlFor="Landmarks">Landmarks</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Cities" id="Cities" onChange={() => addFilter("Cities")}/>
                                <label htmlFor="Cities">Cities</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Nature" id="Nature" onChange={() => addFilter("Nature")}/>
                                <label htmlFor="Nature">Nature</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="lower_than_20" id="lower_than_20" onChange={() => addFilter("0-19")}/>
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="20_100" id="20_100" onChange={() => addFilter("20-99")}/>
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="100_200" id="100_200" onChange={() => addFilter("100-200")}/>
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="more_than_200" id="more_than_200" onChange={() => addFilter("201")}/>
                                <label htmlFor="more_than_200">More than $200</label>
                            </div>
                        </div>
                    </div>
                    {showFiltersMovil
                    ?
                    <div className="save_clear_filters">
                        <div className="clear_filters" onClick={() => closeAndClearFilters()}>CLEAR</div>
                        <div className="save_filters" onClick={() => closeFilters()}>SAVE</div>
                    </div>
                    :
                    null
                    }
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {photosPaginated.map((photo) =>{
                            return(
                                <div className="photography" key={photo?.id}>
                                    <div id={"photo" + photo?.id} className="image_and_button" style={{backgroundImage: `url("${photo?.url}")`}}>
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