// document.addEventListener('DOMContentLoaded', function () {
//     var swiper = new Swiper('.swiper-container', {
//         // Opciones del carrusel
//         loop: true,
//         slidesPerView: 'auto',  // Añade esto
//         spaceBetween: 30,       // Espacio entre diapositivas
        
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },
        
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
        
//         observer: true,          
//         observeParents: true,    
        
//         breakpoints: {           
//             320: {
//                 slidesPerView: 1,
//                 spaceBetween: 20,
//             },
//             768: {
//                 slidesPerView: 2,
//                 spaceBetween: 30,
//             },
//             1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//             }
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        
        // Opciones del carrusel
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});