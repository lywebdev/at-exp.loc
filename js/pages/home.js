DOMLoadedFunctions.push({
    call: () => {
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
                        1: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            // centeredSlides: true
                            pagination: {
                                el: document.querySelector('.section-benefits .section-slider-pagination')
                            }
                        },
                        800: {
                            slidesPerView: 4,
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

        // Инициализация + адаптация сервисов
        let serviceSectionContainer = document.querySelector('.services-section');

        let serviceSection = {
            pc: serviceSectionContainer.innerHTML
        };
        let serviceSectionRows = {
            pc: {
                sectionTitle: serviceSectionContainer.querySelector('.section__title'),
                serviceCards: serviceSectionContainer.querySelectorAll('.service-card')
            }
        };
        serviceSectionMobileTemplate = (`
            <div class="container-fluid">
                <div class="ac-grid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section__title">${serviceSectionRows.pc.sectionTitle.innerHTML}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="services-section__cards">
                <div class="swiper">
                    <div class="swiper-wrapper">
                `);
        let cardsCounter = 1;
        for (let i = 0; i < serviceSectionRows.pc.serviceCards.length; i++) {

            if (serviceSectionRows.pc.serviceCards[i] && serviceSectionRows.pc.serviceCards[i] + 1) {
                serviceSectionMobileTemplate += `<div class="swiper-slide"><div class="service__row">`;
                serviceSectionMobileTemplate += `${serviceSectionRows.pc.serviceCards[i].outerHTML}`;
                serviceSectionMobileTemplate += `${serviceSectionRows.pc.serviceCards[i + 1].outerHTML}`;
                serviceSectionMobileTemplate += `</div></div>`;

                i++;
            }
            else {
                serviceSectionMobileTemplate += `<div class="swiper-slide"><div class="service__row">`;
                serviceSectionMobileTemplate += `${serviceSectionRows.pc.serviceCards[i].outerHTML}`;
                serviceSectionMobileTemplate += `</div></div>`;
            }
        }
        serviceSectionMobileTemplate += (`
                    </div>
                </div>
                <div class="section-slider-pagination"></div>
            </div>
        `);


        helper.hooks.setTemplates({
            mobile: {
                about: serviceSectionMobileTemplate
            },
            pc: {
                about: serviceSection.pc
            }
        });

        let setMobile = {
            func: () => {
                serviceSectionContainer.innerHTML = templates.mobile.about;
                let sl = document.querySelector('.services-section__cards .swiper');
                let sliderInit = new Swiper(sl, {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    pagination: {
                        el: document.querySelector('.services-section__cards .section-slider-pagination')
                    }
                });
            }
        };
        let setPc = {
            func: () => {
                serviceSectionContainer.innerHTML = templates.pc.about;
            }
        };

        setMobileVersionHookFunctions.push(setMobile);
        setPcVersionHookFunctions.push(setPc);
    },
    params: []
});