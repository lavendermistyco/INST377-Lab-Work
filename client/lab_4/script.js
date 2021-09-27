var today = new Date();
var day = today.getDay();
var month = today.getMonth() + 1;
var date = convertMonth(month)+" "+today.getDate() + ", " +today.getFullYear();
function convertMonth (month) { 
    var conversion;
    switch (month) {
        case 1: 
         conversion = "Jan";   
         break;
        case 2:
         conversion = "Feb" 
         break;
         case 3:
         conversion = "Mar" 
         break;
         case 4:
         conversion = "Apr" 
         break;
         case 5:
         conversion = "May" 
         break;
         case 6:
         conversion = "Jun" 
         break;
         case 7:
         conversion = "Jul" 
         break;
         case 8:
         conversion = "Aug" 
         break;
         case 9:
         conversion = "Sep" 
         break;
         case 10:
         conversion = "Oct" 
         break;
         case 11:
         conversion = "Nov" 
         break;
         case 12:
         conversion = "Dec" 
         break;

    }
    return conversion;
}     
document.getElementById("displayDate").innerHTML = date;


//The carousel code: 
let slidePosition = 0; 
const slides = document.querySelectorAll(".photo-grid-item");
const totalSlides = slides.length;

console.log(totalSlides);

document.querySelector("#photo-grid-button-next").addEventListener("click", function() {
    moveToNextSlide();
})

document.querySelector("#photo-grid-button-prev").addEventListener("click", function() {
    moveToPrevSlide();
})

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove("first-item");
        slide.classList.add("hidden");
    }
    slides[slidePosition].classList.add('first-item');
}

function moveToNextSlide() {
    if (slidePosition === totalSlides -1) {
        slidePosition = 0;
    } else {
        slidePosition++; 
    }
    updateSlidePosition()
}

function moveToPrevSlide() {
    if (slidePosition === 0 ) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    updateSlidePosition()
}