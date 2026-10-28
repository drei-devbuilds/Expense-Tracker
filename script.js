
const ul = document.querySelector('.transaction__container ul')
const addButton = document.querySelector('.add__button')

//modal
const modal = document.querySelector('.modal')
const amount = document.querySelector('.amount__input');
const transactionName = document.querySelector('.name__input');

const modalCloseIcon = document.querySelector('.modal-close__icon');
const categoryContainer = document.querySelector('.category__field');
const modalFieldset = document.querySelector('.modal__fieldset');
const modalDropdown = document.querySelector('.dropdown__button');
let modalDropdownOptions = document.querySelector('.dropdown__options');
const submitButton = document.querySelector('.submit__button')

//Search Input
const searchInput = document.querySelector('.transaction__filter input')

//alert container
const alertContainer = document.querySelector('.alert')
const alertImage = document.querySelector('.alert__image');
const alertText = document.querySelector('.alert__text');

//category filter
const typeField = document.querySelector('.filter')


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

//Search Add event Listner

searchInput.addEventListener('input', () => {
  let searchValue = searchInput.value.trim().toLowerCase()

  searchItems(searchValue)
})

submitButton.addEventListener('click', (e) => {
  console.log('submit clicked')
  getData()
  createListItem()
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
  transactionName.value = '';
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

  clearTimeout(alertTimeout)
  if(transactionType === ''){
    openAlert('error', 'Choose Transaction type')
    alertTimeout = setTimeout(() => closeAlert(), 3000)
    return
  }


  if (transactionName.value.trim() === ''){
    openAlert('error', 'Empty Title')
    alertTimeout = setTimeout(() => closeAlert(), 3000)
    return
  }

  if (amount.value.trim() === '' || Number(amount.value) <= 0 || !Number.isFinite(Number(amount.value))){
    openAlert('error', 'Empty Amount')
    alertTimeout = setTimeout(() => closeAlert(), 3000)
    return
  }


  if (selectedOption === '') {
    openAlert('error', 'Empty Category')
    alertTimeout = setTimeout(() => closeAlert(), 3000)
    return
  }

  const transaction = {
    date: transactionDate(),
    type: transactionType,
    name: transactionName.value,
    amount: amount.value,
    category: selectedOption
  } 
  storeData(transaction)
} 

const storeData = (transactionData) => {
  clearTimeout(alertTimeout)
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  transactions.push(transactionData);

  localStorage.setItem('transactions', JSON.stringify(transactions));

  openAlert('success', 'Successfully Added')
  alertTimeout = setTimeout(() => closeAlert(), 2000)
  closeModal()
}


const getStoredData = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  transactions.reverse()

  return transactions
}



const createListItem = () => {
  const transactionData = getStoredData()

  ul.innerHTML = transactionData.map(transaction => {
    return `
     <li class="transaction__item">

              <div class="transaction__top">
                <div class="transaction__info">
                  <h4 class="transaction__title">${transaction.name}</h4>
                  <p class="transaction__category">${transaction.category}</p>
                </div>
                
                <div class="transaction__price">
                  <h5 class="transaction__amount">-&#8369;${transaction.amount}</h5>
                  <p class="transaction__category">${transaction.type}</p>
                </div>
              </div>

              
              <div class="transaction__bottom">
                <div class="transaction__date">
                  <p>${transaction.date}</p>
                </div>
                
                <div class="transaction__buttons">
                  <button class="transaction__edit">
                    <img src="./assets/icons/edit-icon.svg" alt="">
                    <p>Edit</p>
                  </button>
                  <button class="transaction__delete">
                    <img src="./assets/icons/delete-icon.svg" alt="">
                    <p>Delete</p>
                  </button>
                </div>
              </div>

            </li>
    `
  }).join('');
} 

createListItem()

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


const Items = document.querySelectorAll('.transaction__item')

const searchItems = (searchValue) => {
  Array.from(Items).forEach(item => {
    const itemTitle = item.firstElementChild.firstElementChild.firstElementChild.textContent.trim().toLowerCase()

    if (itemTitle.includes(searchValue)){
      item.style.display = ''
    }else{
      item.style.display = 'none'
    }

  })
}


typeField.addEventListener('change', (e) => {
  console.log("type field changed")

  if (e.target.matches('input[type="radio"]')){
      transactionTypeFilter(e.target.value)
    }
  }
)

const transactionTypeFilter = (transTypeValue) => {
  Array.from(Items).forEach((item) => {
    const itemTransType = item.firstElementChild.children[1].children[1].textContent.trim().toLocaleLowerCase()

    if(transTypeValue.toLocaleLowerCase().trim() === 'all'){
      item.style.display = ''
      return
    }

     if(itemTransType === transTypeValue.toLocaleLowerCase().trim()){
        item.style.display = ''
     }
     else{
        item.style.display = 'none'
     }

  })
}