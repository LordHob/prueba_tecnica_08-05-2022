import './App.css';
import Header from './modules/header/header.jsx';
import PhotoDay from './modules/photo_day/photo_day.jsx';
import PhotosAndFilters from './modules/photos_and_filters/photos_and_filters.jsx';
import { useState } from 'react';

function App() {

  const [shoppingCart, setShoppingCart] = useState ([]);

  /*FUNCIÓN QUE AÑADE PRODUCTOS AL CARRITO. ES POSIBLE AÑADIRLO DESDE OTROS COMPONENTES GRACIAS A LOS PROPS*/
  const addToCart = (item) => {
    setShoppingCart(shoppingCart => [...shoppingCart, item])
    console.log(shoppingCart);
  }
  
  const clearCart = (item) => {
    setShoppingCart(shoppingCart => [])
  }

  return (
    <div className="App" id ="App">
      <div className="container">
        <Header products={shoppingCart} clearCart={clearCart} />
        <PhotoDay addToCart={addToCart}/>
        <PhotosAndFilters addToCart={addToCart}/>
      </div>
    </div>
  );
}

export default App;
