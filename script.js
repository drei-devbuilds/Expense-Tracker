const addButton = document.querySelector('.add__button')

//modal
const modal = document.querySelector('.modal')
const transactionType = document.querySelector(
  'input[name="modalTransaction"]:checked'
)?.value;
const modalFieldset = document.querySelector('.modal__fieldset')
const modalDropdown = document.querySelector('.dropdown__button')
let modalDropdownOptions = document.querySelector('.dropdown__options')


const incomeOptions = ['Salary', 'Sold Item', 'Commissions'];
const expensesOptions = ['Salary', 'Sold Item', 'Commissions'];

//add item
addButton.addEventListener('click', (e) => {
  openModal()
})

//Transaction
const createTransaction = () =>{
}

//Modal
const openModal = () => {
  modal.style.display = 'flex'
}

const closeModal = () => {
  modal.style.display = 'none'
}

const activeModalDropdown = () => {
  modalDropdownOptions.classList.toggle('active')
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

const STORAGE_KEY = 'transactions';

const getData = () => {
  if(!transactionType){
    console.log('empty transaction type')
    return null
  }


}

getData()

const getTransaction = () => {
  //Get transaction in Local storage
  const transaction = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  )

  //if empty return an empty array instead
  return transaction || []
}


const saveTransaction = (transaction) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transaction))
}