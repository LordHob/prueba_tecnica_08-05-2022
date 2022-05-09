import './App.css';
import Header from './modules/header/header.jsx';
import SelectedPhoto from './modules/photo_day/photo_day.jsx';
import PhotosAndFilters from './modules/photos_and_filters/photos_and_filters.jsx';

function App() {
  return (
    <div className="App" id ="App">
      <div className="container">
        <Header/>
        <SelectedPhoto/>
        <PhotosAndFilters/>
      </div>
    </div>
  );
}

export default App;
