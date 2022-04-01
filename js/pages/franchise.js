document.addEventListener('DOMContentLoaded', () => {
    let officeSlider = document.querySelector('.slider-component .swiper');
    officeSlider = new Swiper(officeSlider, {
        // slidesPerView: 3.5,
        slidesPerView: 3.1,
        centeredSlides: true,
        initialSlide: 2,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: document.querySelector('.slider-nav__next'),
            prevEl: document.querySelector('.slider-nav__prev'),
        },
    });
});