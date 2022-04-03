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
            spaceBetween: 15
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