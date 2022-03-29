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
                centerInsufficientSlides: true,
                spaceBetween: 18,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },
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
            });
        }
    }

    // Инициализация слайдеров фотографий для объектов недвижимости


    // Инициализация слайдера наши агенты
    function initAgentsSliders() {

    }
    initAgentsSliders();
});