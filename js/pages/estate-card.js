DOMLoadedFunctions.push({
    call: () => {
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
                    breakpoints: {
                        1: {
                            pagination: {
                                el: document.querySelector('.services-section__cards .section-slider-pagination')
                            }
                        },
                        800: {
                            pagination: false
                        }
                    }

                });
            }
        };
        let setPc = {
            func: () => {
                serviceSectionContainer.innerHTML = templates.pc.about;
            }
        };

        let setted = {
            mobile: false,
            pc: false
        };

        let resizeFunctions = {
            func: () => {
                if (device.width <= 1800) {
                    if (!setted.mobile) {
                        let acAgentEl = document.querySelector('.ec-agent');
                        let acAgentClone = acAgentEl.cloneNode(1);
                        document.querySelector('.ec-grid').insertBefore(acAgentClone, document.querySelector('.ec-desc.mortgage-selection'));
                        acAgentEl.parentNode.removeChild(acAgentEl);
                        setted.pc = false;
                    }
                }
                else {
                    if (!setted.pc) {
                        let acAgentEl = document.querySelector('.ec-agent');
                        let acAgentClone = acAgentEl.cloneNode(1);
                        document.querySelector('.estate-card').appendChild(acAgentClone);
                        acAgentEl.parentNode.removeChild(acAgentEl);
                        setted.mobile = false;
                    }
                }
            }
        }

        setMobileVersionHookFunctions.push(setMobile);
        setPcVersionHookFunctions.push(setPc);
        resizeDeviceHookFunctions.push(resizeFunctions);

        const thumbsSlider = new Swiper('.ec-slider__thumbs .swiper', {
            // slidesPerView: 5,
            spaceBetween: 20,
            navigation: {
                nextEl: document.querySelector('.ec-slider__thumbs__navigation .btn__next'),
                prevEl: document.querySelector('.ec-slider__thumbs__navigation .btn__prev'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                800: {
                    slidesPerView: 5,
                }
            }
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


        // Read more
        function addReadMoreBtn(node) {
            node.classList.add('collapsed');
            let createdNode = document.createElement('div');
            createdNode.classList.add('btn-read-more');

            let svg = `<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.625033 0.00334696C0.707077 0.00323551 0.78833 0.0195841 0.864104 0.0514494C0.939879 0.0833148 1.00867 0.130066 1.06652 0.189006L4.26233 3.42622C4.35902 3.52421 4.47382 3.60193 4.60017 3.65496C4.72651 3.70799 4.86194 3.73529 4.9987 3.73529C5.13546 3.73529 5.27088 3.70799 5.39723 3.65496C5.52358 3.60193 5.63838 3.52421 5.73507 3.42622L8.92588 0.193225C8.98351 0.132774 9.05244 0.0845564 9.12867 0.0513852C9.20489 0.0182141 9.28687 0.00075418 9.36982 2.38975e-05C9.45278 -0.000706385 9.53504 0.0153076 9.61182 0.0471318C9.6886 0.078956 9.75836 0.125953 9.81701 0.18538C9.87567 0.244808 9.92206 0.315475 9.95348 0.39326C9.98489 0.471044 10.0007 0.554388 9.99998 0.638428C9.99926 0.722467 9.98202 0.80552 9.94928 0.88274C9.91654 0.95996 9.86894 1.0298 9.80927 1.08819L6.61847 4.32118C6.1886 4.75587 5.60606 5 4.9987 5C4.39134 5 3.8088 4.75587 3.37893 4.32118L0.183127 1.08397C0.0956969 0.995449 0.0361497 0.882646 0.0120202 0.759832C-0.0121094 0.637018 0.00026322 0.509713 0.0475724 0.394025C0.0948816 0.278337 0.175001 0.179466 0.277793 0.109923C0.380584 0.0403799 0.501428 0.0032902 0.625033 0.00334696Z" fill="#AA0001"/>
                </svg>`;

            createdNode.innerHTML = `Читать полностью ${svg}`;

            node.append(createdNode);

            let btn = node.querySelector('.btn-read-more');
            btn.addEventListener('click', () => {
                if (node.classList.contains('collapsed')) {
                    node.classList.remove('collapsed');
                    btn.innerHTML = `Свернуть ${svg}`;
                }
                else {
                    node.classList.add('collapsed');
                    btn.innerHTML = `Читать полностью ${svg}`;
                }
            });
        }

        let readMoreEls = document.querySelectorAll('.read-more');
        for (let i = 0; i < readMoreEls.length; i++) {
            let readMoreEl = readMoreEls[i];
            let text = readMoreEl.querySelector('.ec-desc__text').textContent;

            if (text.length > 250) {
                addReadMoreBtn(readMoreEl);
            }
        }
    }
});