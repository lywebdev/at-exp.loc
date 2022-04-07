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


    // Sortable
    let rows = document.querySelectorAll('.photo-gallery__images .sortableContainer');
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        let sort = new Sortable(row, {
            swapThreshold: 1,
            animation: 150,
            ghostClass: 'blue-background-class',
            onUpdate: (e) => {
            }
        });
    }

    // Dropzone
    let photoGalleryDropzones = document.querySelectorAll('.dropzoneContainer');

    photoGalleryDropzones.forEach((el, index) => {
        let dropzone = photoGalleryDropzones[index];
        let dropzoneInput = dropzone.querySelector('.dropzoneInput');
        const inputMultiple = false;

        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function(event) {
            dropzone.addEventListener(event, function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            dropzone.addEventListener('dragover', (e) => {
                dropzone.classList.add('dropzone-dragging');
            }, false);
            dropzone.addEventListener('dragleave', (e) => {
                dropzone.classList.remove('dropzone-dragging');
            }, false);
            dropzone.addEventListener('click', function(e) {
                dropzoneInput.click();
            });

            dropzone.addEventListener('drop', (e) => {
                dropzone.classList.remove('dropzone-dragging');
                let files = e.dataTransfer.files;
                let dataTransfer = new DataTransfer();

                if (!inputMultiple) {
                    let file = files[0];
                    dataTransfer.items.add(file);

                    let reader = new FileReader();

                    reader.onload = function (e) {
                        let img = dropzone.querySelector('img');
                        if (img && img.length !== 0) {
                            img.remove();
                        }
                        let loadBtn = dropzone.querySelector('.photo-galley__load-btn');
                        if (loadBtn && loadBtn.length !== 0) {
                            loadBtn.remove();
                        }

                        let node = document.createElement('img');
                        node.setAttribute('src', e.target.result);
                        dropzone.appendChild(node);
                    };

                    reader.readAsDataURL(file);
                }

                let filesToBeAdded = dataTransfer.files;
                dropzoneInput.files = filesToBeAdded;

            }, false);
        });

    });


    /*
    let dropzone = document.querySelector('.dropzone');
    console.log(dropzone);
    let dropzoneInput = dropzone.querySelector('.dropzone-input');
    console.log(dropzoneInput);
    let multiple = dropzoneInput.getAttribute('multiple') ? true : false;
    console.log(multiple);

    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function(event) {
        dropzone.addEventListener(event, function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    dropzone.addEventListener('dragover', (e) => {
        dropzone.classList.add('dropzone-dragging');
    }, false);
    dropzone.addEventListener('dragleave', (e) => {
        dropzone.classList.remove('dropzone-dragging');
    }, false);

    dropzone.addEventListener('drop', (e) => {
        dropzone.classList.remove('dropzone-dragging');
        let files = e.dataTransfer.files;
        let dataTransfer = new DataTransfer();

        if (!multiple) {
            let file = files[0];
            dataTransfer.items.add(file);

            let reader = new FileReader();

            reader.onload = function (e) {
                let node = document.createElement('img');
                node.setAttribute('src', e.target.result);
                dropzone.appendChild(node);
            };

            reader.readAsDataURL(file);
        }

        let filesToBeAdded = dataTransfer.files;
        dropzoneInput.files = filesToBeAdded;

    }, false);

    dropzone.addEventListener('click', function(e) {
        dropzoneInput.click();
    });
    */
});