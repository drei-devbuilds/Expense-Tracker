const modalDropdown = document.querySelector('.dropdown__button')
let modalDropdownOptions = document.querySelector('.dropdown__options')
console.log(modalDropdownOptions)

modalDropdown.addEventListener('click', () => {
  modalDropdownOptions.classList.toggle('active')
})