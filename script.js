const registerBtn=document.querySelectorAll('.register-btn');
const modal=document.querySelector(".modal");
const overlay=document.querySelector(".overlay");
const closeModal=document.querySelector(".close-modal");

const featureBtn=document.querySelector('.item-feature');
const moreBtn=document.querySelector('.more-btn');
const navItems=document.querySelector('.menu-items');
const section1=document.getElementById("section1");

const navbar=document.querySelector('.navbar')


registerBtn.forEach((btn)=>{
    btn.addEventListener('click',function(e){
        e.preventDefault();
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    })
})

// console.log(registerBtn);

const closeModalFunc=function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
closeModal.addEventListener("click",closeModalFunc)

overlay.addEventListener('click',closeModalFunc);


moreBtn.addEventListener('click',function(){
    // e.preventDefault();
    const S1Coords=section1.getBoundingClientRect();
    ///// without Smooth Scroll: // window.scrollTo(S1Coords.left +window.scrollX,S1Coords.top + window.scrollY);

    // window.scrollTo({
    //     top: S1Coords.top + window.scrollY,
    //     left:S1Coords.left +window.scrollX ,
    //     behavior:'smooth',
    // })

    section1.scrollIntoView({behavior:'smooth'});
})

/////////Event Delegation(bubbling,capturing)
// 1.Add event listener to common parent element
// 2. Determine what element originated the event

navItems.addEventListener('click',function(e){
    console.log(e.target);
    if(e.target.classList.contains('menu-item')){
        const id=e.target.getAttribute('to');
        const sect=document.querySelector(`#${id}`);
        console.log(`#${id}`);
        sect.scrollIntoView({behavior:'smooth'});
    }
})


const operationBtnTab=document.querySelector('.operation-btns-tab');
const operationBtns=document.querySelectorAll('.operation-btns');
const operationContent=document.querySelectorAll(".operation-content");

// operationBtns.forEach(t=>t.addEventListener('click',function(){
//     console.log("Tab");
// }))     //// BAD PRACTICE BCZ IF WE HAVE A LOT OF COMPONENTS EVERY COMPONENT WILL HAVE ITS OWN FUNCTION THAT WHY WE USE EVENTS DELEGATION(BUBBLING,CAPTURING)

operationBtnTab.addEventListener('click',function(e){
    const clicked=e.target.closest('.operation-btns');
    if(!clicked) return;
    operationBtns.forEach(function(btn,i){
        btn.classList.remove('active');
        operationContent[i].classList.remove('active');
    })
    clicked.classList.add('active');
    console.log(clicked.dataset.tab);
    document.querySelector(`.content-tab${clicked.dataset.tab}`).classList.add('active');
})


// uxing for loop
// for(let i=0;i<operationBtns.length;i++){
//     operationBtns[i].addEventListener('click',function(e){
//         for(let n=0;n<operationBtns.length;n++){
//             operationBtns[n].classList.remove('active');
//         }
//         operationBtns[i].classList.add('active');

//     })
// }

// operationBtns.forEach((tab,i)=>{
//     tab.addEventListener('click',function(e){
//         if(e.target.classList.contains('active')){
//             return ;
//         }
//         else {
//             e.target.classList.add('active');
//         }
//     })
// })

navbar.addEventListener('mouseover', function(e){
    // console.log("dd")
    // console.log(e.target)
    if(e.target.classList.contains('menu-item')){
        const link =e.target;
        console.log(link)
        const sibling=link.closest('.menu-items').querySelectorAll('.menu-item');
        console.log(sibling);
        // const logo=link.closest('.menu-items').querySelector('.logo')
        // console.log(logo)
        sibling.forEach(el=>{
            if(el !==link) el.style.opacity=0.5;
        });
        // logo.style.opacity=0.5;
    }
})

navbar.addEventListener('mouseout', function(e){
    
    if(e.target.classList.contains('menu-item')){
        const link =e.target;
        console.log(link)
        const sibling=link.closest('.menu-items').querySelectorAll('.menu-item');
        console.log(sibling);
        // const logo=link.closest('.menu-items').querySelector('.logo')
        // console.log(logo)
        sibling.forEach(el=>{
            if(el !==link) el.style.opacity=1;
        });
        // logo.style.opacity=0.5;
    }
    })

//////Intersection observer tutorial

//     const obsCallback=function(entries,observer){
//         entries.forEach(entry=>{
//             console.log(entry)
//         })
//     }

//     const obsOption={
//         root:null,
//         threshold:0.1
//     }
// const observer=new IntersectionObserver(obsCallback,obsOption);
// observer.observe(section1);

///////// Implementing Intersection Observer

// const header=document.querySelector('.header');

// const stickyNav=function (entries){
//     const [entry]=entries;
//     console.log(entries);
//     // navbar.style.backgroundColor="white";
//     // navbar.style.position="fixed";

// }

// const headerObserver=new IntersectionObserver(stickyNav,{
//     root:null,
//     threshold:0
// })

// headerObserver.observe(header);


// const header=document.querySelector('.header');

const sections_feature=document.querySelectorAll('.features')

const revealSection=function(entries,observer){
    const [entry]= entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden')
    observer.unobserve(entry.target)
}

const sectionObserver=new IntersectionObserver(revealSection,{
    root:null,
    threshold:0.15,
    
})


sections_feature.forEach(function(section){
    sectionObserver.observe(section)
    section.classList.add('section-hidden')
})

/////// lazy loading images

const imgTargets=document.querySelectorAll('img[data-src]')
console.log(imgTargets)

const loadImg=function(entries, observer){
const [entry]= entries;
if(!entry.isIntersecting) return;

entry.target.src=entry.target.dataset.src;
entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
})
}
const imgObserver =new IntersectionObserver(loadImg,{
root:null,
threshold:0.6
})

imgTargets.forEach(img=>imgObserver.observe(img))


///////// slider

let curSlide=0;
const slides=document.querySelectorAll('.slide');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');


btnRight.forEach('click',function(){
    curSlide++;
    
    slides.forEach((s,i)=>s.style.transform=`translate(${100*(i-curSlide)}%)`)
})