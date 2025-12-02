import './style.css';

const image = document.querySelector('.images')
const btnLeft = document.querySelector('.btn.left')
const btnRight = document.querySelector('.btn.right')

btnRight.addEventListener('click', () => {
    image.scrollLeft += 400
})

btnLeft.addEventListener('click', () => {
    image.scrollLeft -= 400
})

setInterval(() =>{
    if(image.scrollLeft + image.clientWidth >= image.scrollWidth - 10){
        image.scrollLeft = 0
    }
    else{
        image.scrollLeft += 400
    }
}, 5000)