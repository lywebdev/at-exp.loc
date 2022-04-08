/***********************************************************************************************************************
 *
 * --- RU: Этот файл является "точкой входа" для всех последующий JS файлов. Файл должен быть подключен на каждой странице
 * клиентской части приложения. Для того чтобы не регистрировать бесконечное множество листенеров для событий, все они
 * будут сосредоточены в предопределённых объектах. Реализован функционал хуков, для таких событий как
 * DOMContentLoaded, window.resize, document.click, чтобы также избежать зависаний на фронтэнде. Логика следующая:
 * для разных событий есть предопределённая переменная, в которую записываются массив с объектами, которые затем
 * перебираются в хэлпере "helpers.hooks". Таким образом, из любого файла JS мы можем прокинуть "наверх" данные, которые
 * хотим определить в глобальной области видимости в контексте текущей страницы. По схожей логике устроены фреймворки
 * Angular, React, Vue, здесь более упрощённый вариант.
 * Разбиение на компоненты отстутствует, в силу малого количества JS кода, а также его документируемости.
 * ---------------------------------------------------------------------------------------------------------------------
 * --- EN: This file is the "entry point" for all subsequent JS files. The file must be connected on every page
 * of the client part of the application. In order not to register an infinite number of listeners for events, they will all
 * be concentrated in predefined objects. Implemented the functionality of hooks, for events such as
 * DOMContentLoaded, window.resize, document.click to also avoid freezes on the frontend. The logic is as follows:
 * for different events, there is a predefined variable in which an array with objects is written, which then
 * they move to the helpers "helpers.hooks". Thus, from any JS file, we can throw up the data that
 * we want to define in the global scope in the context of the current page. Frameworks are arranged according to a
 * similar logic Angular, React, Vue, here is a more simplified version.
 * There is no division into components, due to the small amount of JS code, as well as its documentability.
 *
 *
 * @author {Kulik Leonid}
 **********************************************************************************************************************/


let $app = document.querySelector('#app');
// Global vars
var device = undefined;

const listeners = {
};


const slidersTemplates = {};
const startSlider = {
    rooms: () => {
        function initPhotoGallery() {
            let estatesObjectsPhotosSliders = document.querySelectorAll('.estate-object-photos-slider');
            for (let i = 0; i < estatesObjectsPhotosSliders.length; i++) {
                let photoSlider = estatesObjectsPhotosSliders[i].querySelector('.swiper');
                if (photoSlider) {
                    let prevBtn = estatesObjectsPhotosSliders[i].querySelector('.room__photos-nav__prev');
                    let nextBtn = estatesObjectsPhotosSliders[i].querySelector('.room__photos-nav__next');

                    let initSlider = new Swiper(photoSlider, {
                        slidesPerView: 1,
                        loop: false,
                        navigation: {
                            nextEl: nextBtn,
                            prevEl: prevBtn,
                        },
                    });
                }
            }
        }


        if (device.type === 'mobile') {
            let roomsMobileSliders = document.querySelectorAll('.roomsSlider .mobile-rooms-slider');
            if (roomsMobileSliders.length !== 0) {
                let allRoomsSliders = new Swiper('.roomsSlider .mobile-rooms-slider', {
                    slidesPerView: 1.1,
                    centeredSlides: true,
                    initialSlide: 1,
                    spaceBetween: 10,
                    pagination: {
                        el: '.section-slider-pagination',
                        clickable: true
                        // dynamicBullets: true,
                    }
                });
            }
        }
        else if (device.type === 'pc') {

        }


        initPhotoGallery();
    }
};


function initSliders() {
    let sliders = document.querySelectorAll('.section-slider');
    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        if (!slidersTemplates[i]) {
            slidersTemplates[i] = {};
        }

        if (slider.classList.contains('roomsSlider')) {
            /**
             * needRerender - отвечает, нужно ли обрабатывать текущий слайдер на разных типах девайсов
             */
            slidersTemplates[i].needRerender = true;
            if (!(slidersTemplates[i].template)) {
                slidersTemplates[i].node = slider; // Пишем ноду в объект, чтобы можно было к ней стучаться

                let pc     = slider.innerHTML;
                let mobile = ``;

                // mobile
                let sliderTitle = slider.querySelector('.section__title');
                let slidesEls   = slider.querySelectorAll('.room');

                mobile += sliderTitle.outerHTML;
                mobile += `<div class="collections-section__container"><div class="swiper mobile-rooms-slider"><div class="swiper-wrapper">`;
                for (let j = 0; j < slidesEls.length; j++) {
                    mobile += `<div class="swiper-slide">${slidesEls[j].outerHTML}</div>`;
                }
                mobile += `</div>

                    <div class="section-slider-pagination"></div>

                </div></div>`;


                slidersTemplates[i].template = {
                    pc: pc,
                    mobile: mobile
                };
            }
        }
    }
    for (let key in slidersTemplates) {
        if (slidersTemplates[key].needRerender) {
            let slider = slidersTemplates[key].node;

            slider.innerHTML = slidersTemplates[key].template[device.type];
        }
    }

    startSlider.rooms();
}

const setMobileVersionHookFunctions = [];
const setPcVersionHookFunctions = [];
const resizeDeviceHookFunctions = [];
const DOMLoadedFunctions = [];

let templates = undefined;
const helper = {
    options: {
        app: {
            version: undefined
        }
    },
    hooks: {
        DOMContentLoaded: () => {
            DOMLoadedFunctions.map((functionObject, index) => {
                functionObject.call(functionObject.params);
            });
        },
        resize: () => {
            for (let i = 0; i < resizeDeviceHookFunctions.length; i++) {
                resizeDeviceHookFunctions[i].func();
            }
        },
        setMobileVersion: () => {
            for (let i = 0; i < setMobileVersionHookFunctions.length; i++) {
                setMobileVersionHookFunctions[i].func();
            }

            let app = document.querySelector('#app');
            app.classList.remove('pc');
            app.classList.add('mobile');
            helper.options.app.version = 'mobile';
            // Должны вызвать функцию инициализации слайдера, передав параметр - тип девайса.
            // Мы вызываем инициализацию слайдера из этого хука.
            // В зависимости от типа девайса отдаем разную версию шаблона. Генерим мобильный из пк версии, а пкшный просто копируем
            initSliders();
        },
        setPcVersion: () => {
            for (let i = 0; i < setPcVersionHookFunctions.length; i++) {
                setPcVersionHookFunctions[i].func();
            }

            let app = document.querySelector('#app');
            app.classList.remove('mobile');
            app.classList.add('pc');
            helper.options.app.version = 'pc';

            initSliders();
        },
        setTemplates: (params) => {
            templates = params;
        }
    }
};
const SCREEN_XS  = 575;
const SCREEN_SM  = 576;
const SCREEN_MD  = 768;
const SCREEN_LG  = 992;
const SCREEN_XL  = 1200;
const SCREEN_XXL = 1400;

document.addEventListener('DOMContentLoaded', () => {
    helper.hooks.DOMContentLoaded();
    /**
     * Dropdown
     */
    function openDropdown(node) {
        node.classList.add('open');
    }

    function closeDropDown(node) {
        node.classList.remove('open');
    }

    function toggleDropdown(node) {
        node.classList.contains('open') ? closeDropDown(node) : openDropdown(node);
    }

    function dropdownsInit() {
        const dropdowns = document.getElementsByClassName('dropdown');
        if (dropdowns.length !== 0) {
            for (let i = 0; i < dropdowns.length; i++) {
                dropdowns[i].addEventListener('click', (e) => {
                    toggleDropdown(dropdowns[i]);
                });
            }
        }
    }


    /**
     * Hamburger
     */
    function hamburgerInit() {
        let header = document.getElementsByClassName('header')[0];
        let hamburger = document.querySelector('.header-mobile__hamburger');
        if (hamburger.length !== 0) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleHeaderMenu();
            });
        }
    }

    /**
     * Mobile Version
     */
    function initDevice() {
        const windowInnerWidth = window.innerWidth;
        /* Если будет необходимость точно идентифицировать устройство юзера
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (windowInnerWidth < 1201) {
                return "mobile";
            }
        }*/

        if (windowInnerWidth < 1201) {
            return {
                type: 'mobile',
                width: windowInnerWidth
            };
        }

        return {
            type: 'pc',
            width: windowInnerWidth
        };
    }
    device = initDevice();


    /**
     * Templates
     */
    const templates = {
        mobile: {
            header: undefined,
            footer: undefined,
            footerNav: (pcNav) => {
                let template = `
                    <div class="footer__mobile-nav">
                       <div class="accordion-container">
                `;
                let sections = pcNav.querySelectorAll('.footer__nav-section');
                for (let i = 0; i < sections.length; i++) {
                    let currentAccordionItem = ``;
                    let sectionName = sections[i].querySelector('.footer__nav-title').innerHTML;
                    let items = sections[i].querySelectorAll('.footer__nav-item');

                    let itemsTemplate = ``;
                    for (let i = 0; i < items.length; i++) {
                        itemsTemplate += `${items[i].outerHTML}`;
                    }

                    currentAccordionItem += (`
                        <div class="footer__mobile-nav__section ac">
                            <div class="footer__mobile-nav__title ac-header ac-trigger">
                                ${sectionName}
                            </div>
                            <div class="footer__mobile-nav__items ac-panel">
                                ${itemsTemplate}
                            </div>
                        </div>
                    `);

                    template += currentAccordionItem;
                }

                template += `</div></div>`;

                return template;
            }
        },
        pc: {
            header: document.getElementsByClassName('header')[0].outerHTML,
            footer: document.getElementsByClassName('footer')[0].outerHTML
        }
    };

    const toggleHeaderMenu = () => {
        let header = document.getElementsByClassName('header')[0];
        header.classList.toggle('open');
    }

    function adaptive() {
        let headerEl = document.getElementsByClassName('header')[0];
        let footerEl = document.getElementsByClassName('footer')[0];

        const header = {
            setPc: () => {
                headerEl.classList.remove('mobile');

                headerEl.outerHTML = templates.pc.header;
                headerEl.classList.add('pc');
                dropdownsInit();
            },
            setMobile: () => {
                headerEl.classList.remove('pc');

                if (!templates.mobile.header) {
                    let headerTopbarEL  = headerEl.getElementsByClassName('header-topbar')[0];
                    let headerMainEl    = headerEl.getElementsByClassName('header-main')[0];

                    let locationEl      = headerTopbarEL.getElementsByClassName('header-topbar__location')[0];
                    let communicationEl = headerTopbarEL.getElementsByClassName('header-topbar__communication')[0];
                    let logoEl          = headerMainEl.getElementsByClassName('header__logo')[0];
                    let navEl           = headerMainEl.getElementsByClassName('header__nav')[0];
                    let userEl          = headerMainEl.getElementsByClassName('header-main__user')[0];

                    let template = (`
                    <header class="header header-mobile">
                        <div class="header-mobile__top">
                            <div class="row ai-c">
                                <div class="col">${logoEl.outerHTML}</div>
                                <div class="col f jc-fe">
                                    <div class="header-mobile__hamburger">
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.3633 3.57422H9.66797C8.21367 3.57422 7.03125 4.75723 7.03125 6.21094C7.03125 7.66523 8.21367 8.84766 9.66797 8.84766H27.3633C28.817 8.84766 30 7.66523 30 6.21094C30 4.75723 28.817 3.57422 27.3633 3.57422Z" fill="#AA0001"/>
                                            <path d="M27.3633 12.3633H9.66797C8.21367 12.3633 7.03125 13.5463 7.03125 15C7.03125 16.4543 8.21367 17.6367 9.66797 17.6367H27.3633C28.817 17.6367 30 16.4543 30 15C30 13.5463 28.817 12.3633 27.3633 12.3633Z" fill="#AA0001"/>
                                            <path d="M27.3633 21.1523H9.66797C8.21367 21.1523 7.03125 22.3354 7.03125 23.7891C7.03125 25.2434 8.21367 26.4258 9.66797 26.4258H27.3633C28.817 26.4258 30 25.2434 30 23.7891C30 22.3354 28.817 21.1523 27.3633 21.1523Z" fill="#AA0001"/>
                                            <path d="M2.63672 3.57422C1.18242 3.57422 0 4.75723 0 6.21094C0 7.66523 1.18242 8.84766 2.63672 8.84766C4.09043 8.84766 5.27344 7.66523 5.27344 6.21094C5.27344 4.75723 4.09043 3.57422 2.63672 3.57422Z" fill="#AA0001"/>
                                            <path d="M2.63672 12.3633C1.18242 12.3633 0 13.5463 0 15C0 16.4543 1.18242 17.6367 2.63672 17.6367C4.09043 17.6367 5.27344 16.4543 5.27344 15C5.27344 13.5463 4.09043 12.3633 2.63672 12.3633Z" fill="#AA0001"/>
                                            <path d="M2.63672 21.1523C1.18242 21.1523 0 22.3354 0 23.7891C0 25.2434 1.18242 26.4258 2.63672 26.4258C4.09043 26.4258 5.27344 25.2434 5.27344 23.7891C5.27344 22.3354 4.09043 21.1523 2.63672 21.1523Z" fill="#AA0001"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-mobile__overlay">
                        <div class="header-mobile__main">
                            <div class="header-mobile__overlay-top">
                                ${logoEl.outerHTML}
                                ${userEl.outerHTML}
                            </div>
                            <div class="header-mobile__overlay-location">
                                ${locationEl.outerHTML}
                            </div>
                            <div class="header-mobile__overlay-communication">
                                ${communicationEl.outerHTML}
                            </div>
                            <div class="header-mobile__overlay-nav">
                                ${navEl.outerHTML}
                            </div>
                        </div>
                    </header>
                `);
                    templates.mobile.header = template;
                }


                headerEl.outerHTML = templates.mobile.header;
                headerEl.classList.add('mobile');
                hamburgerInit();
                dropdownsInit();
            }
        };

        const footer = {
            setPc: () => {
                footerEl.classList.remove('mobile');

                footerEl.outerHTML = templates.pc.footer;
                footerEl.classList.add('pc');
            },
            setMobile: () => {
                footerEl.classList.remove('pc');

                if (!templates.mobile.footer) {
                    let footerLogoEl   = footerEl.getElementsByClassName('footer__logo')[0];
                    let footerNavEl    = footerEl.getElementsByClassName('footer__nav')[0];
                    let footerSocialEl = footerEl.getElementsByClassName('footer__social')[0];
                    let footerCopyrightEl = footerEl.getElementsByClassName('footer__copyright')[0];
                    let footerLiftingUpEl = footerEl.getElementsByClassName('footer__lifting-up')[0];

                    /**
                     * Гереним навигацию с аккордеоном
                     */
                    let footerNavTemplate = templates.mobile.footerNav(footerNavEl);

                    let template = (`
                        <footer class="footer footer-mobile">
                            ${footerLogoEl.outerHTML}
                            ${footerNavTemplate}
                            <div class="footer-mobile__bottom">
                                <div class="ls">
                                    ${footerSocialEl.outerHTML}
                                    ${footerCopyrightEl.outerHTML}
                                </div>
                                <div class="rs">
                                    ${footerLiftingUpEl.outerHTML}
                                </div>
                            </div>
                        </footer>
                    `);
                    templates.mobile.footer = template;
                }

                footerEl.outerHTML = templates.mobile.footer;
                footerEl.classList.add('mobile');
                let accordion = new Accordion('.footer .accordion-container');
            }
        };

        if (device.type === 'pc' && !document.querySelector('#app').classList.contains('pc')) {
            header.setPc();
            footer.setPc();
            helper.hooks.setPcVersion();
        }
        else if (device.type === 'mobile' && !document.querySelector('#app').classList.contains('mobile')) {
            header.setMobile();
            footer.setMobile();
            helper.hooks.setMobileVersion();
        }


        helper.hooks.resize();
    }
    adaptive();


    /*******************************************************************************************************************
     * Document Events Listeners
     ******************************************************************************************************************/
    window.addEventListener('resize', (event) => {
        device = initDevice();
        adaptive();
    });

    // Anchors
    let footerLiftingUpEl = document.querySelector('.footer__lifting-up');
    footerLiftingUpEl.addEventListener('click', () => {
        document.querySelector('.header').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });


    window.addEventListener('click', (e) => {
        // Header hamburger
        if (device.type === 'mobile') {
            let container = document.getElementsByClassName('header-mobile')[0];
            let menu = document.getElementsByClassName('header-mobile__main')[0];
            let hamburger = document.querySelector('.header-mobile__hamburger');

            let target = e.target;
            let its_menu = target == menu || menu.contains(target);
            let its_hamburger = target == hamburger;
            let is_active = container.classList.contains('open');

            if (!its_menu && !its_hamburger && is_active) {
                toggleHeaderMenu();
            }
        }
    });
});