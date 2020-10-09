//Targeting Elements
const $container = document.getElementById('container')
const $addRed = document.getElementById('add-red')
const $addGreen = document.getElementById('add-green')
const $addBlue = document.getElementById('add-blue')
const $buttonSet = document.getElementById('button-set')

//Variables
const itemInfo = {
    title: 'Apple',
    price: 9.99,
    description: 'Probably edible',
    quantity: 10
}

let itemCount = 0

let cart = []

//Functions
function capitalize(inputString) {
    return inputString[0].toUpperCase() + inputString.substring(1)
}



function addItem(event) {

    const color = event.target.dataset.color

    const itemElement = `
        <div id='item-${itemCount}' class='item'>
            <p>${capitalize(color)} ${itemInfo.title}</p>
            <p>$${itemInfo.price}</p>
            <p>${itemInfo.description}</p>
            <p class='quantity-remaining'><span>${itemInfo.quantity}</span> remaining</p>
            <p>
                <span>Quantity</span>
                <button class='plus'>+</button>
                <button class='minus'>-</button>
                <span class='quantity'>0</span
            </p>
            <p>
                <button class='add-to-cart'>Add To Cart</button>
            </p>
        </div>
    `
    $container.insertAdjacentHTML('beforeend', itemElement)

    const $icon = document.createElement('i')
    $icon.classList.add('fa', 'fa-apple')
    $icon.style.fontSize = '100px'
    $icon.style.color = color

    const $item = document.getElementById(`item-${itemCount}`)
    $item.insertBefore($icon, $item.firstElementChild)

    //add event listeners to new quantity buttons
    document.querySelector(`#item-${itemCount} .plus`).addEventListener('click', plusItem)
    document.querySelector(`#item-${itemCount} .minus`).addEventListener('click', minusItem)
    document.querySelector(`#item-${itemCount} .add-to-cart`).addEventListener('click', addToCart)

    itemCount++
}

function plusItem(event) {
    event.target.parentElement.children[3].textContent++
}

function minusItem(event) {
    event.target.parentElement.children[3].textContent--
}

function addToCart(event) {
    let quantity = event.target.closest('div').children[5].children[3].textContent

    for (let i = quantity; i > 0; i--) {
        cart.push(event.target.closest('.item').getAttribute('id'))
    }

    event.target.closest('div').children[4].firstElementChild.textContent -=quantity

    console.log(`Cart: ${cart}`)
}

//Event Listeners

$buttonSet.addEventListener('click', addItem)
//