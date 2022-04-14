let itemList = {
  items: [],
  amounts: [],
  addItem: function(itemText, itemAmount){
    this.items.push(itemText);
    this.amounts.push(itemAmount);
  },
  deleteItem: function(position){
    this.items.splice(position, 1);
    this.amounts.splice(position, 1);
  },
  sumItemAmount: function(arr){
    let sum = 0;
    for (let i =0 ; i <this.amounts.length ; i++){
      sum += parseInt(this.amounts[i])
    }
    return sum;
  }
}

let handlers = {
  addItem: function(){
    let addItemTextInput = document.getElementById('addItemTextInput');
    let addItemAmountInput =  document.getElementById('addItemAmount');
    itemList.addItem(addItemTextInput.value, addItemAmountInput.value);
    addItemTextInput.value = 'Add Item'; //Update this code to add the placeholder value as a means to clear the UI.
    addItemAmountInput.value = 0; //Update this code to add the placeholder value as a means to clear the UI.
    view.displayItems();
  },

  deleteItem: function(position) {
   itemList.deleteItem(position);
   view.displayItems();
  },

  updateAmount: function(){
    let totalAmountUI = document.getElementById('totalAmount');
     totalAmountUI.innerHTML = itemList.sumItemAmount(itemList.amounts);
  },

  sendInvoice: function(){
    let sendInvoiceBtn = document.getElementById('sendInvoice');
    sendInvoiceBtn.onclick = function(){
      document.location.reload(true);
      e.alert("clicked");  
    }
  }
}

let view = {
  displayItems: function () {
    //Title:
  let itemsTitleUl = document.querySelector('ul');
  itemsTitleUl.innerHTML = '';
  itemList.items.forEach(function (item, position) {
    let itemLi = document.createElement('li');
    itemLi.id = position;
    itemLi.textContent = item;
    console.log("debugged");
    itemLi.appendChild(this.createDeleteButton());
    itemsTitleUl.appendChild(itemLi);
  }, this);
  //Amount:
  let itemsAmountOl =  document.querySelector('ol');
  itemsAmountOl.innerHTML = '';
  itemList.amounts.forEach(function(amount, position){
    let amountLi = document.createElement('li');
    amountLi.id = position;
    amountLi.textContent = amount;
    console.log("debugged amount");
    itemsAmountOl.appendChild(amountLi);
    handlers.updateAmount();
  }, this);
 },

 createDeleteButton: function(){
   let deleteButton = document.createElement("button");
   deleteButton.textContent = "Delete";
   deleteButton.className = "deleteButton"
   return deleteButton;
 },

 setupEventListener: function(){
 let itemListElements = document.querySelector('ul');

 itemListElements.addEventListener('click', function(e){
  let capturedEvent = e.target;
  if(capturedEvent.className === 'deleteButton'){
    handlers.deleteItem(parseInt(capturedEvent.parentNode.id));
  }
 })
 } 
}
view.setupEventListener();