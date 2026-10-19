const addButton = document.querySelector('.add__button')

//modal
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const expensesRadio = document.querySelector('#modal-expenses')
const incomeRadio = document.querySelector('#modal-income')
const expensesButton = document.querySelector('.expenses__label');
const incomeButton = document.querySelector('.income__label');
const amount = document.querySelector('.amount__input')

const categoryContainer = document.querySelector('.category__field')
const modalFieldset = document.querySelector('.modal__fieldset');
const modalDropdown = document.querySelector('.dropdown__button');
let modalDropdownOptions = document.querySelector('.dropdown__options');
let selectedOption = '';
let transactionType = '';


const incomeOptions = ['Salary', 'Sale', 'Commissions'];
const expensesOptions = ['Food', 'Medecine', 'Supplies', 'Plants'];

//Opens modal for adding transactions
addButton.addEventListener('click', (e) => {
  openModal()

  if (expensesRadio.checked) {
    modalDropdownOptions.innerHTML = '';
    dynamicDropdown(expensesOptions)
    getData('expense')
  } else {
    alert('invalid option')
  } 

})

//Choose between expenses and income on transactions
//default is expenses
//after choosing the category options would also change

//income option
incomeRadio.addEventListener('click', (e) => {
    if(incomeRadio.checked){
      modalDropdownOptions.innerHTML = '';
      dynamicDropdown(incomeOptions)
      transactionType = 'income';
      getData(transactionType)
    }else{
      alert('invalid option')
    }
})


//expenses option
expensesRadio.addEventListener('click', (e) => {
  if (expensesRadio.checked) {
    modalDropdownOptions.innerHTML = '';
    dynamicDropdown(expensesOptions)
    transactionType = 'expense';
    getData(transactionType)
  } else {
    alert('invalid option')
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


//open the modal
const openModal = () => {
  modal.style.display = 'flex'
}

//close the modal
const closeModal = () => {
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
const getData = (transactionType) => {
    console.log(transactionType)
    console.log(amount.value)
    console.log(selectedOption)
} 

//Create Data
// const createData = (transactionType) => {
//   const data = {
//     date: transactionDate(),
//     transactionType: transactionType,
//     amount: amount,
//     category: modalDropdown.value
//   }
// }