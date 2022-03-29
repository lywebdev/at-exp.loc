document.addEventListener('DOMContentLoaded', () => {
    let accordion = new Accordion('.app-submission__options .accordion-container');

    const roomSizeSelect = new Select('.select.roomSize-select', {
        placeholder: 'Выбрать',
        selectedId: '1',
        data: [
            {id: '1', value: '1 комнатная'},
        ],
        onSelect(item) {
        }
    });

    const stateSelect = new Select('.select.state-select', {
        placeholder: 'Выбрать',
        selectedId: '1',
        data: [
            {id: '1', value: 'Евро'},
            {id: '2', value: 'Косметический'},
            {id: '3', value: 'Среднее'},
            {id: '4', value: 'Без ремонта'},
            {id: '5', value: 'Пред чистовая'},
            {id: '6', value: 'Черновая'},
        ],
        onSelect(item) {
        }
    });

    const wallMaterialSelect = new Select('.select.wallMaterial-select', {
        placeholder: 'Выбрать',
        selectedId: '1',
        data: [
            {id: '1', value: 'Кирпич'},
        ],
        onSelect(item) {
        }
    });

    const constructionYearSelect = new Select('.select.constructionYear-select', {
        placeholder: 'Выбрать',
        selectedId: '1',
        data: [
            {id: '1', value: '2021'},
        ],
        onSelect(item) {
        }
    });

    const ceilingHeightSelect = new Select('.select.ceilingHeight-select', {
        placeholder: 'Выбрать',
        selectedId: '1',
        data: [
            {id: '1', value: '4'},
        ],
        onSelect(item) {
        }
    });

    const bathroomSelect = new Select('.select.bathroom-select', {
        placeholder: 'Выбрать',
        selectedId: '1',
        data: [
            {id: '1', value: 'Раздельный'},
        ],
        onSelect(item) {
        }
    });

    const villageSelect = new Select('.select.village-select', {
        placeholder: 'Выбрать',
        data: [
            {id: '1', value: 'Название посёлка'},
        ],
        onSelect(item) {
        }
    });

    const districtSelect = new Select('.select.district-select', {
        placeholder: 'Выбрать',
        selectedId: '1',
        data: [
            {id: '1', value: 'Сарыаркинский район'},
        ],
        onSelect(item) {
        }
    });
});