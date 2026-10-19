const addButton = document.querySelector('.add__button')

//modal
const modal = document.querySelector('.modal')
const amount = document.querySelector('.amount__input');
const modalCloseIcon = document.querySelector('.modal-close__icon');
const categoryContainer = document.querySelector('.category__field');
const modalFieldset = document.querySelector('.modal__fieldset');
const modalDropdown = document.querySelector('.dropdown__button');
let modalDropdownOptions = document.querySelector('.dropdown__options');
const submitButton = document.querySelector('.submit__button')


//alert container
const alertContainer = document.querySelector('.alert')
const alertImage = document.querySelector('.alert__image');
const alertText = document.querySelector('.alert__text');


let selectedOption = '';
let transactionType = '';
let alertTimeout = null;


const incomeOptions = ['Salary', 'Sale', 'Commissions'];
const expensesOptions = ['Food', 'Medecine', 'Supplies', 'Plants'];

//Opens modal for adding transactions
addButton.addEventListener('click', (e) => {
  openModal()
})

//Choose between expenses and income on transactions
//default is expenses
//after choosing the category options would also change

modalFieldset.addEventListener('change', (e) => {
  modalDropdownOptions.innerHTML = '';
  if(e.target.matches('input[type="radio"]')){
    transactionType = e.target.value
    if(transactionType === 'expense'){
      dynamicDropdown(expensesOptions)
    } else if (transactionType === 'income') {
      dynamicDropdown(incomeOptions)
    }
  }
})

//Income Dropdown Function
const dynamicDropdown = (options) => {
  options.forEach(item => {
    const li = document.createElement('li')
    li.innerHTML = `<button type="button" class="option__button" data-category="${item}">${item}</button>`
    modalDropdownOptions.prepend(li)
  })
}

//working custom dropdown
//what ever option you choose would change the text inside the parent option button
categoryContainer.addEventListener('click', (e) => {
  modalDropdownOptions.classList.toggle('active')
  if (e.target.classList.value == 'option__button'){
      selectedOption = e.target.textContent;
      modalDropdown.firstElementChild.textContent = selectedOption;
    }
})

submitButton.addEventListener('click', (e) => {
  console.log('submit clicked')
  getData()
})

modalCloseIcon.addEventListener('click', () => {
  closeModal()
})


//open the modal
const openModal = () => {
  modal.style.display = 'flex';
}

//close the modal
const closeModal = () => {
  transactionType = 'expense';
  selectedOption = '';
  amount.value = '';
  modal.style.display = 'none'
}

//to get the current date of the transaction
const transactionDate = ()=> {
  const today = new Date();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();

  const transactionDate = `${month}-${day}-${year}`;
  return transactionDate
}


//get the data
const getData = () => {
  alertTimeout = null;
  if(amount.value === ''){
    openAlert('error', 'Invalid Amount')
    alertTimeout = setTimeout(() => closeAlert(), 3000)
  }

  if(transactionType === ''){
    openAlert('error', 'Invalid Transaction type')
    alertTimeout = setTimeout(() => closeAlert(), 3000)
  }
} 


const openAlert = (alertType, message) => {
  alertContainer.style.display = 'flex';
  if(alertType === 'error'){
    alertImage.src = './assets/icons/error-icon.svg';
    alertText.textContent = message
    alertText.style.color = '#B42318'
  }else{
    alertImage.src = './assets/icons/check-icon.svg';
    alertText.textContent = message
  }
}

const closeAlert = () => {
  alertContainer.style.display = 'none';
}
