import React, { useEffect, useState } from 'react';
import './photos_and_filters.css';
import { photos } from '../../photos.js';
import HeaderPhotosAndFilter from '../../molecules/headerPhotosAndFilter/headerPhotosAndFilter';
import FiltersAndPhotographs from '../../molecules/filtersAndPhotographs/filtersAndPhotographs';

const PhotosAndFilters = (props) =>{
    
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

    /*ARRAY CON LOS FILTROS DE LAS CATEGORÍAS*/
    const filtersCategory = ['People', 'Premium', 'Pets', 'Food', 'Landmarks', 'Cities', 'Nature'];

    /*DETERMINA LA CANTIDAD DE FOTOS QUE SE VEN POR PÁGINA (6 EN VERSIÓN NORMAL Y 4 EN VERSIÓN MOVIL*/
    useEffect(() =>{
        if (document.documentElement.scrollWidth > 768) {
            setPhotosPerPage(6);
        } else{
            setPhotosPerPage(4);
        }
    }, [])
    /*GUARDA FOTOS CON FILTRO SI EXISTE ALGUN FILTRO APLICADO, Y SI NO GUARDA TODAS.
    GUARDA LAS FOTOS FILTRADAS POR PRECIO EN SU PROPIO ARRAY.
    GUARDA LAS FOTOS FILTRADAS POR CATEGORIAS EN SU PROPIO ARRAY.
    SI HAY 2 TIPOS DE FILTRO APLICADOS, MUESTRA LAS COINCIDENCIAS DE AMBOS ARRAYS.
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

    /*CONFIGURA QUÉ CRITERIO SIGUE PARA ORDENAR LAS FOTOS*/
    const configOrderKey = () => {
        setOrderKey(document.getElementById("categories_select").selectedOptions[0].innerHTML);
    }

    /*ORDENA RESULTADOS*/
    const orderPhotos = () => {
        setActivePage(1);
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

    /*MOVIMIENTO ENTRE PÁGINAS*/
    const nextPage = () => {
        setIndexPagination(indexPagination + photosPerPage);
        setActivePage(activePage + 1);
    }
    
    const previousPage = () => {
        setIndexPagination(indexPagination - photosPerPage);
        setActivePage(activePage - 1);
    }

    /*CONTROLA VISUALIZACIÓN DE PANTALLA DE FILTROS EN MOVIL*/
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
            <HeaderPhotosAndFilter
                orderPhotos={orderPhotos}
                configOrderKey={configOrderKey}
                seeFilters={seeFilters}
            />
            <FiltersAndPhotographs
                showFiltersMovil={showFiltersMovil}
                seeFilters={seeFilters}
                closeFilters={closeFilters}
                filtersCategory={filtersCategory}
                addFilter={addFilter}
                closeAndClearFilters={closeAndClearFilters}
                photosPaginated={photosPaginated}
                previousPage={previousPage}
                indexPagination={indexPagination}
                pages={pages}
                nextPage={nextPage}
                activePage={activePage}
                maxPages={maxPages}
                addToCart={props.addToCart}
            />
        </div>
    )
}

export default PhotosAndFilters;