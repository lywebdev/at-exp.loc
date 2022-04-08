DOMLoadedFunctions.push({
    call: () => {
        let officeSlider = document.querySelector('.slider-component .swiper');
        officeSlider = new Swiper(officeSlider, {
            // slidesPerView: 3.5,
            navigation: {
                nextEl: document.querySelector('.slider-nav__next'),
                prevEl: document.querySelector('.slider-nav__prev'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    loop: false,
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    loop: false,
                },
                992: {
                    slidesPerView: 3.1,
                    loop: true,
                    initialSlide: 2,
                    spaceBetween: 30,
                    centeredSlides: true,
                }
            }
        });
    }
});