let setMobile = {
    func: () => {
        console.log('resize');
    }
};

let setPc = {
    func: () => {
        // ...
    }
};

setMobileVersionHookFunctions.push(setMobile);

document.addEventListener('DOMContentLoaded', () => {
    const thumbsSlider = new Swiper('.ec-slider__thumbs .swiper', {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: document.querySelector('.ec-slider__thumbs__navigation .btn__next'),
            prevEl: document.querySelector('.ec-slider__thumbs__navigation .btn__prev'),
        },
    });

    const mainSlider = new Swiper('.ec-slider__main .swiper', {
        slidesPerView: 1,
        navigation: {
            nextEl: document.querySelector('.ec-slider__main__navigation .btn__next'),
            prevEl: document.querySelector('.ec-slider__main__navigation .btn__prev'),
        },
        thumbs: {
            swiper: thumbsSlider,
        },
    });
});