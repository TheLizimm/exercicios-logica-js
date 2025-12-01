import './style.css';

function showAndHide (){
    const takeImg = document.getElementById('imgSide')
    const sideBar = document.querySelector('.sideBar');
    takeImg.addEventListener('click' ,() =>{
        sideBar.classList.toggle('show')
    })
}

document.addEventListener('DOMContentLoaded', showAndHide);