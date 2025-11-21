import './style.css';
import drippingImage from '../assets/dripping.png'; 
const imageElement = document.getElementById('dripping-image');
if (imageElement) {
    imageElement.src = drippingImage;
}

function hideInfos() {
    const imgHome = document.getElementById('dripping-Homeimage')
    const imgMenu = document.getElementById('dripping-Menuimage')
    const imgContact = document.getElementById('dripping-Contactimage')
    const contentToHome = document.getElementById('storageHome');
    const contentToMenu = document.getElementById('storageMenu')
    const contentoToContact = document.getElementById('storageContact')
    const container = document.getElementById('container')
    const content = document.getElementById('content')
    const homeButton = document.getElementById('coverHome');
    const menuButton = document.getElementById('coverMenu');
    const contactB = document.getElementById('coverContact');
    const coverButtons = [homeButton, menuButton, contactB];
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            contentToHome.style.display = 'block';
            contentToMenu.style.display = 'none';
            contentoToContact.style.display = 'none'
            imgHome.style.visibility = 'visible'; 
            imgContact.style.visibility = 'hidden'
            imgMenu.style.visibility = 'hidden'
            container.style.height = '140vh'
            content.style.height = '125vh'
            setButton(homeButton)
            console.log('Home Clicado. Conteúdo visível.');
        });
    }
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            contentToHome.style.display = 'none';
            contentToMenu.style.display = 'block';
            contentoToContact.style.display = 'none'
            imgHome.style.visibility = 'hidden'; 
            imgContact.style.visibility = 'hidden'
            imgMenu.style.visibility = 'visible'
            container.style.height = '620vh'
            content.style.height = '610vh'
            setButton(menuButton)
            console.log('Menu Clicado. Conteúdo oculto.');
        });
    }
    if (contactB) {
        contactB.addEventListener('click', () => {
            contentToHome.style.display = 'none';
            contentToMenu.style.display = 'none';
            contentoToContact.style.display = 'block'
            imgHome.style.visibility = 'hidden'; 
            imgContact.style.visibility = 'visible'
            imgMenu.style.visibility = 'hidden'
            container.style.height = '115vh'
            content.style.height = '100vh'
            setButton(contactB)
            console.log('Contact Clicado. Conteúdo oculto.');
        });
    }
    function setButton(button){
        coverButtons.forEach(btn =>{
            if(btn){
                btn.classList.remove('activeCover');
            }
        });
        if(button){
            button.classList.add('activeCover');
        }
    }
    setButton(homeButton)
    imgHome.style.visibility = 'visible'; 
    imgMenu.style.visibility = 'hidden';
    imgContact.style.visibility = 'hidden';
}




document.addEventListener('DOMContentLoaded', hideInfos);