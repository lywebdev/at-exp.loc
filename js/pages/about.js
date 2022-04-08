DOMLoadedFunctions.push({
    call: () => {
        let serviceSectionContainer = document.querySelector('.task-solution');

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
            <div class="task-solution__cards">
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
                let sl = document.querySelector('.task-solution__cards .swiper');
                let sliderInit = new Swiper(sl, {
                    slidesPerView: 1,
                    spaceBetween: 15
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
    }
});