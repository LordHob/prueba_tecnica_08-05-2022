import React from 'react';
import './photo_day.css';
import perro from '../../img/perro.jpg';
import foto1 from '../../img/foto1.jpg';
import foto2 from '../../img/foto2.jpeg';
import foto3 from '../../img/foto3.jpeg';

const SelectedPhoto = () =>{

    return(
        <div className='photo_day'>
            <div className="header">
                <div className="photo_title">Samurai King Resting</div>
                <div className="add_to_cart_photo_day">ADD TO CART</div>
            </div>
            <div className="main_photo">
                <img src={perro} alt="Foto Principal" />
                <div className="message_photo_day">Photo of the day</div>
            </div>
            <div className="information_main_photo">
                <div className="about">
                    <div className="title_information_photo">About the Samurai King Resting</div>
                    <div className="category_information_photo">Pets</div>
                    <div className="text_information_photo">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. </div>
                </div>
                <div className="alsobuy_and_details">
                    <div className="alsobuy">
                        <div className="title_information_photo">People also buy</div>
                        <div className="alsobuy_images">
                            <div className="alsobuy_image">
                                <img src={foto1} alt="Foto Principal" />
                            </div>
                            <div className="alsobuy_image">
                                <img src={foto2} alt="Foto Principal" />
                            </div>
                            <div className="alsobuy_image">
                                <img src={foto3} alt="Foto Principal" />
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="title_information_photo">Details</div>
                        <div className="size_information_photo">Size: 1020 x 1020 pixel</div>
                        <div className="size_information_photo">Size: 15 mb</div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default SelectedPhoto;