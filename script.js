const addButton = document.querySelector('.add__button')

//modal
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const expensesRadio = document.querySelector('#modal-expenses')
const incomeRadio = document.querySelector('#modal-income')
const expensesButton = document.querySelector('.expenses__label');
const incomeButton = document.querySelector('.income__label');

const modalFieldset = document.querySelector('.modal__fieldset');
const modalDropdown = document.querySelector('.dropdown__button');
let modalDropdownOptions = document.querySelector('.dropdown__options');

let transactionType = '';

//Opens modal for adding transactions
addButton.addEventListener('click', (e) => {
  openModal()

  if (expensesRadio.checked) {
    modalDropdownOptions.innerHTML = '';
    expensesDropdown()
  } else {
    alert('invalid option')
  } 

})

//modal dynamic dropdown options
incomeRadio.addEventListener('click', (e) => {
    if(incomeRadio.checked){
      modalDropdownOptions.innerHTML = '';
      incomeDropdown()
      transactionType = 'income';
      getData(transactionType)
    }else{
      alert('invalid option')
    }
})

expensesRadio.addEventListener('click', (e) => {
  if (expensesRadio.checked) {
    modalDropdownOptions.innerHTML = '';
    expensesDropdown()
    transactionType = 'expense';
    getData(transactionType)
  } else {
    alert('invalid option')
  } 
})



modalDropdown.addEventListener('click', () => {
  modalDropdownOptions.classList.toggle('active')
})

//Modal
const openModal = () => {
  modal.style.display = 'flex'
}

const closeModal = () => {
  modal.style.display = 'none'
}

//Get Date
const transactionDate = ()=> {
  const today = new Date();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();

  const transactionDate = `${month}-${day}-${year}`;
  return transactionDate
}

const incomeOptions = ['Salary', 'Sale', 'Commissions'];
const expensesOptions = ['Food', 'Medecine', 'Supplies', 'Plants'];

//Income Dropdown Function
const incomeDropdown = () => {
  incomeOptions.forEach(item => {
    const li = document.createElement('li')
    li.innerHTML = `<button type="button" data-category="${item}">${item}</button>`
    modalDropdownOptions.prepend(li)
  })
}

//Expenses Dropdown Function
const expensesDropdown = () => {
  expensesOptions.forEach(item => {
    const li = document.createElement('li')
    li.innerHTML = `<button type="button" data-category="${item}">${item}</button>`
    modalDropdownOptions.prepend(li)
  })
}


//Create Data
const createData = (transactionType) => {
  const data = {
    date: transactionDate(),
    transactionType: transactionType,
    amount: sadasd,
    category: fdsfd
  }
}