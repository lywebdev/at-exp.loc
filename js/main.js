// Global vars
var device = undefined;
const SCREEN_XS = 575;
const SCREEN_SM = 576;
const SCREEN_MD = 768;
const SCREEN_LG = 992;
const SCREEN_XL = 1200;
const SCREEN_XXL = 1400;


document.addEventListener('DOMContentLoaded', () => {
    // Engine here..

    /**
     * Dropdown
     */
    function openDropdown(node) {
        node.classList.add('open');
    }

    function closeDropDown(node) {
        node.classList.remove('open');
    }

    function toggle(node) {
        node.classList.contains('open') ? closeDropDown(node) : openDropdown(node);
    }

    function dropdownsInit() {
        const dropdowns = document.getElementsByClassName('dropdown');
        if (dropdowns.length !== 0) {
            for (let i = 0; i < dropdowns.length; i++) {
                dropdowns[i].addEventListener('click', (e) => {
                    toggle(dropdowns[i]);
                });
            }
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
     * Frontend functions
     */
    const templates = {
        header: {
            mobile: undefined,
            pc: undefined
        }
    };

    const toggleHeaderMenu = () => {
        let header = document.getElementsByClassName('header')[0];
        header.classList.toggle('open');
    }

    function adaptive() {
        const header = () => {
            /**
             * Мы также должна учитывать ининализацию всех выпадающих менюшек и т.д.
             * @type {Element}
             */

            const headerEl = document.getElementsByClassName('header')[0];

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
             * Генерация шаблона относительно уже существующего контента
             */
            if (!templates.header.pc) {
                templates.header.pc = headerEl.cloneNode(true)
                templates.header.pc = templates.header.pc.outerHTML;
            }
            if (!templates.header.mobile) {
                // Должны поэлементно разобрать и составить шаблон под мобилку
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
                        <div class="header-mobile__overlay-nav">
                            ${navEl.outerHTML}
                        </div>
                        <div class="header-mobile__overlay-communication">
                            ${communicationEl.outerHTML}
                        </div>
                    </div>
                </header>
            `);
                templates.header.mobile = template;
            }

            headerEl.classList.remove('mobile', 'pc');
            if (device.type === 'mobile') {
                if (headerEl.classList.contains('mobile')) {
                    // Шаблон для телефона уже внедрен
                }
                else {
                    headerEl.outerHTML = templates.header.mobile;
                    hamburgerInit();
                }
                headerEl.classList.add('mobile');
            }
            else if (device.type === 'pc') {
                if (headerEl.classList.contains('pc')) {
                    // Шаблон для пк уже внедрен
                }
                else {
                    headerEl.outerHTML = templates.header.pc;
                }
                headerEl.classList.add('pc');
            }

            dropdownsInit();
        };


        header();
    }
    adaptive();


    /**
     * Document Events Listeners
     */
    window.addEventListener('resize', (event) => {
        device = initDevice();
        adaptive();
    });

    window.addEventListener('click', (e) => {
        // header hamburger
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