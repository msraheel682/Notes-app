const Addbutton = document.querySelector('#add');

const updatelocalstorage = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewnote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class='opreation'>
        <button class='edit'><i class='fas fa-edit'></i></button>
        <button class='delete'><i class='fas fa-trash-alt'></i></button>
    </div>
    <div class='main ${text ? '' : 'hidden'}'></div>
    <textarea class='${text ? 'hidden' : ''}'>${text}</textarea> `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    const editbutton = note.querySelector('.edit');
    const deletebutton = note.querySelector('.delete');
    const maindiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // delete data from textarea
    deletebutton.addEventListener('click', () => {
        note.remove();
        updatelocalstorage(); // Update local storage after removing a note
    });

    // edit textarea
    editbutton.addEventListener('click', () => {
        maindiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    // Update local storage when the textarea content changes
    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        maindiv.innerHTML = value;
        updatelocalstorage();
    });

    document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => {
        addNewnote(note);
    });
}

Addbutton.addEventListener('click', () => {
    addNewnote();
});
