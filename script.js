const items=[
  {
    name:'Pizza 001',
    price:5.99,
    quantity:1
  },
  {
    name:'Pizza 002',
    price:6.99,
    quantity:1
  },
  {
    name:'Pizza 003',
    price:7.99,
    quantity:1
  }

]

const SHIPPING=2;

function add(){
  items.push({
    name:`Pizza 00${(Math.random()).toFixed(2)}`,
    quantity:1,
    price: (Math.random()*10).toFixed(2)
  })
  render();
}

function remove(index){
  items.splice(index,1);
  render();
}

function    uppdateQuantity(index,quantity){
  if(quantity<1){
    return
  }
  items[index].quantity=quantity;
  render();
}


function render(){
  let subTotal = 0;
  items.forEach(item=>{
    subTotal+=item.quantity*item.price;
  })
  const total=subTotal+SHIPPING;

  const html= items.map(item=>`
    <li class="order-item">
      <span class="item-name">${item.name}</span>

      <span class="item-quantity">
        <button class="dec">-</button>
        <input class="quantity" type="text" value="${item.quantity}">
        <button class="inc">+</button>
      </span>

      <span class="item-price">
        <span>${(item.price*item.quantity).toFixed(2)}</span>
        <button class=" btn-delete delete">X</button>
      </span>
    </li>
  `).join('');
  document.getElementById('order-items').innerHTML=html;

  const deleteButtons= document.querySelectorAll('.delete');
  const decButtons=document.querySelectorAll('.dec');
  const incButtons=document.querySelectorAll('.inc')
  console.log(deleteButtons);

  for(let i=0;i<deleteButtons.length;i++){

    decButtons[i].addEventListener('click',()=>{
      uppdateQuantity(i,items[i].quantity-1);
    })
    incButtons[i].addEventListener('click',()=>{
      uppdateQuantity(i,items[i].quantity+1);
    })
    deleteButtons[i].addEventListener('click',()=>{
      remove(i);
    })
  }

  document.getElementById('sub-total').innerText=`$${subTotal.toFixed(2)}`;
  document.getElementById('shipping').innerText=`$${SHIPPING.toFixed(2)}`;
  document.getElementById('total').innerText=`$${total.toFixed(2)}`;
}

document.getElementById('btn-add').addEventListener('click',()=>{
  add();
})
render();

