// Custom Select Language
const customSelectTrigger = document.querySelector('.custom-select-trigger-lang');
const customOptions = document.querySelector('.custom-options-lang');
const customOptionsItems = document.querySelectorAll('.custom-option-lang');

customSelectTrigger.addEventListener('click', () => {
    customOptions.classList.toggle('open');
});

customOptionsItems.forEach(option => {
    option.addEventListener('click', () => {
        customSelectTrigger.textContent = option.textContent;
        customSelectTrigger.setAttribute('selected-lang', option.getAttribute('data-value'));
        customOptions.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-lang')) {
        customOptions.classList.remove('open');
    }
});


// Close PopUp
const btnsClosePopUp = document.querySelectorAll('.btn-close-pop');
btnsClosePopUp.forEach(button => {
    button.addEventListener('click', function () {
        const eleID = this.getAttribute('pop-id');
        const element = document.getElementById(eleID);
        if (element) {
            element.classList.remove('act');
        }
    });
})