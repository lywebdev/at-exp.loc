DOMLoadedFunctions.push({
    call: () => {
        const roomTypeSelect = new Select('.select.roomType-select', {
            placeholder: 'Выбрать',
            selectedId: '1',
            data: [
                {id: '1', value: 'Новостройки'},
            ],
            onSelect(item) {
            }
        });
    }
});