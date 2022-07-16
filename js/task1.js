// Пишемо свій слайдер зображень
// відображаємо зображення та кнопки Next, Prev з боків від зображення
// При натисканні на Next - показуємо наступне зображення
// При натисканні на Prev - попереднє
// При досягненні останнього зображення – ховати кнопку Next. Аналогічно з першим зображенням та кнопкою
const imgArray = document.querySelectorAll(".slider img")
const dotHeight = document.querySelector(".sliderDots").offsetHeight*0.66
const imgContainersArray = document.querySelectorAll(".slider .imgContainer div")
const sliderUi = document.querySelector(".sliderUi")
const slider = document.querySelector(".slider")
const prevBtn = document.querySelector(".prevBtn")
const nextBtn = document.querySelector(".nextBtn")
const sliderDotsContainer = document.querySelector(".sliderDots")
const imgContainer = document.querySelector(".imgContainer")
const sliderParent = slider.parentElement.parentElement
const imgArrayLength = imgArray.length
let sliderParentWidthWithoutButtons = ""
let sliderParentHeight = sliderParent.offsetHeight
let shift = 0
let counter = 0
function moveSlidesInterval(){
    if(counter!==imgContainersArray.length-1){
        counter+=1
        calcDynamicShift()
        addTransform()
        activeDot()
        calcResponsiveDotSize ()
    }else{
        counter=0
        calcDynamicShift()
        addTransform()
        activeDot()
        calcResponsiveDotSize ()
    }
}

let timeoutId
let intervalId = setInterval(moveSlidesInterval,1000)
function stopAndContinueSliderInterval(){
    clearInterval(intervalId)    
    clearTimeout(timeoutId)
    timeoutId = setTimeout(()=>{
        intervalId = setInterval(moveSlidesInterval,1000)
    },5000)
}
addDots()
function sliderInit(){
    sliderParentHeight = sliderParent.offsetHeight
    sliderParentWidthWithoutButtons = sliderParent.offsetWidth-prevBtn.clientWidth-nextBtn.clientWidth
    activeDot()
    // btnLimits()
    calcResponsiveDotSize()
    calcDynamicShift()
    sliderUi.style.width = `${sliderParent.offsetWidth}px`
    slider.style=`max-width:${sliderParentWidthWithoutButtons}px; height:${sliderParentHeight}px`
    const imgContainerWidth = sliderParentWidthWithoutButtons*imgArrayLength
    imgContainer.style.width=`${imgContainerWidth}px`
    imgContainersArray.forEach(function(element){
        element.style=`width:${sliderParentWidthWithoutButtons}px; height:${sliderParentHeight}px`
    })
    imgArray.forEach(function(element){
        element.style=`max-width:${sliderParentWidthWithoutButtons}px; max-height:${sliderParentHeight}px`
    })
}
window.onload = sliderInit
window.addEventListener("resize",sliderInit)
// function btnLimits(){
//     if(counter==imgArrayLength-1){
//         nextBtn.setAttribute("disabled","")
//         nextBtn.classList.add("disabled")
//     }else{
//         nextBtn.removeAttribute("disabled")
//         nextBtn.classList.remove("disabled")
//     }
//     if(counter==0){
//         prevBtn.setAttribute("disabled","")
//         prevBtn.classList.add("disabled")
//     }else{
//         prevBtn.removeAttribute("disabled")
//         prevBtn.classList.remove("disabled")
//     }
// }
function addTransform(){
    imgContainer.style.transform=`translate(${shift}px)`
    let styleValue = imgContainer.getAttribute("style")
    styleValue = styleValue.replace("transition: none 0s ease 0s;","")
    imgContainer.style=styleValue
}
function calcDynamicShift(){
    shift = -(counter*sliderParentWidthWithoutButtons)
    imgContainer.style.transition="none"
    imgContainer.style.transform=`translate(${shift}px)`
}
nextBtn.addEventListener("click",function(){
    stopAndContinueSliderInterval()
    if(counter!==imgContainersArray.length-1){
        counter+=1
        calcDynamicShift()
        addTransform()
        activeDot()
        calcResponsiveDotSize ()
    }else{
        counter=0
        calcDynamicShift()
        addTransform()
        activeDot()
        calcResponsiveDotSize ()
    }
    
    // btnLimits()
})
prevBtn.addEventListener("click",function(){
    stopAndContinueSliderInterval()
    if(counter!==0){
        counter-=1
        calcDynamicShift()
        addTransform()
        activeDot()
        calcResponsiveDotSize ()
    }else{
        counter=imgContainersArray.length-1
        calcDynamicShift()
        addTransform()
        activeDot()
        calcResponsiveDotSize ()
    }
})
function activeDot(){
    const sliderDotsContainerArray =  sliderDotsContainer.querySelectorAll(".circle")
    sliderDotsContainerArray.forEach(function(element){
        element.classList.remove("active")
    })
    sliderDotsContainerArray[counter].classList.add("active")
}
function addDots(){
    for(let i=0; i<imgContainersArray.length; i++){
        sliderDotsContainer.insertAdjacentHTML("beforeend",'<div class="dotContainer"><div class="circle"></div></div>')
        const sliderDotsArray = sliderDotsContainer.querySelectorAll(".circle")
        sliderDotsArray[i].addEventListener("click",function(){
            stopAndContinueSliderInterval()
            counter=i
            activeDot()
            calcResponsiveDotSize()
            // btnLimits()
            calcDynamicShift()
            addTransform()
        })
        
    }
}
function calcResponsiveDotSize (){
    const sliderDotsArray = sliderDotsContainer.querySelectorAll(".circle")
    const sliderDotsArrayContainer = sliderDotsContainer.querySelectorAll(".dotContainer")
    const dotWidth = slider.parentElement.parentElement.offsetWidth*0.5/sliderDotsArray.length*0.5
    let dotSize = (function(){
        if(dotWidth>dotHeight){
            return dotHeight
        }else{
            return dotWidth
        }
    }())
    sliderDotsArrayContainer.forEach((element)=>{
        element.style=`width:${dotSize*1.5}px;height:${dotSize*1.5}px;border-radius:${dotSize/2*1.5}px;position:relative`
    })
    sliderDotsContainer.style.maxWidth=`${dotSize*sliderDotsArrayContainer.length*1.5}px`
    sliderDotsContainer.style.height=`${dotSize*1.5}px`
    sliderDotsArray.forEach(function(element){
        if (element.classList.contains("active")){
            element.style=`width:${dotSize*1.5}px;height:${dotSize*1.5}px;border-radius:${dotSize/2*1.5}px;`
        }else{
            element.style=`width:${dotSize}px;height:${dotSize}px;border-radius:${dotSize/2}px;position:absolute;left:0;
            right:0;
            top:0;
            bottom:0;`
        }
    })
}


