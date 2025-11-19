import './style.css';
import drippingImage from '../assets/dripping.png'; 
const imageElement = document.getElementById('dripping-image');
if (imageElement) {
    imageElement.src = drippingImage;
}

function hideInfos() {
    const contentToHome = document.getElementById('storageHome');
    const contentToMenu = document.getElementById('storageMenu')
    const contentoToContact = document.getElementById('storageContact')
    const container = document.getElementById('container')
    const content = document.getElementById('content')
    const homeButton = document.getElementById('coverHome');
    const menuButton = document.getElementById('coverMenu');
    const contactButton = document.getElementById('coverContact');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            contentToHome.style.display = 'block';
            contentToMenu.style.display = 'none';
            contentoToContact.style.display = 'none'
            container.style.height = '140vh'
            content.style.height = '125vh'
            console.log('Home Clicado. Conteúdo visível.');
        });
    }
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            contentToHome.style.display = 'none';
            contentToMenu.style.display = 'block';
            contentoToContact.style.display = 'none'
            container.style.height = '620vh'
            content.style.height = '610vh'
            console.log('Menu Clicado. Conteúdo oculto.');
        });
    }
    if (contactButton) {
        contactButton.addEventListener('click', () => {
            contentToHome.style.display = 'none';
            contentToMenu.style.display = 'none';
            contentoToContact.style.display = 'block'
            console.log('Contact Clicado. Conteúdo oculto.');
        });
    }
}




document.addEventListener('DOMContentLoaded', hideInfos);