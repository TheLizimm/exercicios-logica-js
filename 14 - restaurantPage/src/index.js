import './style.css';
import drippingImage from '../assets/dripping.png'; 
const imageElement = document.getElementById('dripping-image');
if (imageElement) {
    imageElement.src = drippingImage;
}