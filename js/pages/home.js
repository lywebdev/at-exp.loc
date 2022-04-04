const districtSelect = new Select('.select.district-select', {
    placeholder: 'Выбрать',
    // selectedId: '2',
    data: [
        {id: '1', value: 'Пушкинский'},
    ],
    onSelect(item) {
        console.log('Выбранный район: ', item)
    }
});

const citySelect = new Select('.select.city-select', {
    placeholder: 'Выбрать',
    // selectedId: '2',
    data: [
        {id: '1', value: 'Московская'},
    ],
    onSelect(item) {
        console.log('Выбранная улица: ', item)
    }
});

const roomSizeSelect = new Select('.select.roomSize-select', {
    placeholder: 'Выбрать',
    selectedId: '1',
    data: [
        {id: '1', value: '1 комнатная'},
        {id: '2', value: '2 комнатная'},
    ],
    onSelect(item) {
        console.log('Выбранная комнатность: ', item)
    }
});


// const benefitsSlider = new Swiper();


document.addEventListener('DOMContentLoaded', () => {
    // Инициализация секционных слайдеров: ваши выгоды
    let sectionSliders = document.querySelectorAll('.section-slider');
    for (let i = 0; i < sectionSliders.length; i++) {
        let slider  = sectionSliders[i].querySelector('.swiper');
        let prevBtn = sectionSliders[i].querySelector('.section-slider__prev-btn');
        let nextBtn = sectionSliders[i].querySelector('.section-slider__next-btn');
        let pagination = sectionSliders[i].querySelector('.section-slider-pagination');

        if (sectionSliders[i].classList.contains('section-benefits')) {
            let swiperSlider = new Swiper(slider, {
                slidesPerView: 8,
                // centerInsufficientSlides: true,
                centeredSlides: false,
                spaceBetween: 18,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },
                breakpoints: {
                    100: {
                        slidesPerView: 1.1,
                        centeredSlides: true,
                        spaceBetween: 10,
                    },
                    800: {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 5,
                        centeredSlides: false
                    },
                    1300: {
                        slidesPerView: 6,
                        centeredSlides: false
                    },
                    1751: {
                        slidesPerView: 8,
                        centeredSlides: false
                    }
                }
            });
        }
        else if (sectionSliders[i].classList.contains('agents-section')) {
            let swiperSlider = new Swiper(slider, {
                slidesPerView: 4,
                spaceBetween: 40,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },
                pagination: {
                    el: pagination,
                    // dynamicBullets: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 20,
                        centeredSlides: true
                    },
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    800: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    }
                }
            });
        }
        else if (sectionSliders[i].classList.contains('section-reviews')) {
            let scrollbar = sectionSliders[i].querySelector('.swiper-scrollbar');

            let swiperSlider = new Swiper(slider, {
                slidesPerView: 4,
                spaceBetween: 30,
                scrollbar: {
                    el: scrollbar,
                    hide: false,
                    draggable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.1,
                        centeredSlides: true
                    },
                    800: {
                        slidesPerView: 2,
                    },
                    1000: {
                        slidesPerView: 3,
                    },
                    1200: {

                    }
                }
            });
        }
    }

    // Инициализация слайдеров фотографий для объектов недвижимости


    // Инициализация слайдера наши агенты
    function initAgentsSliders() {

    }
    initAgentsSliders();
});