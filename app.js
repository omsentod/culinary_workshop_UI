document.addEventListener("DOMContentLoaded", function() {
    let openShopping = document.querySelector('.openShopping');
    let closeShopping = document.querySelector('.closeShopping');
    let list = document.querySelector('#menu-dish');
    let listCard = document.querySelector('.listCard');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');

    openShopping.addEventListener('click', () => {
        body.classList.add('active');
    });

    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });

    let products = [
        {
            id: 1,
            name: 'Fresh Chicken Veggies',
            image: '1.png',
            price: 49000,
            calories: '120 calories',
            rate: 5,
            cat: 'lunch',
            link: 'dish-detail.html?id=1'
        },
        {
            id: 2,
            name: 'Grilled Chicken',
            image: '2.png',
            price: 55000,
            calories: '150 calories',
            rate: 5,
            cat: 'breakfast'
        },
        {
            id: 3,
            name: 'Panner Noddles',
            image: '3.png',
            price: 80000,
            calories: '120 calories',
            rate: 5,
            cat: 'dinner'
        },
        {
            id: 4,
            name: 'Meat Lover Noddles',
            image: '4.png',
            price: 80000,
            calories: '120 calories',
            rate: 5,
            cat: 'dinner'
        },
        {
            id: 5,
            name: 'Veg Fresh Salads',
            image: '5.png',
            price: 80000,
            calories: '120 calories',
            rate: 5,
            cat: 'dinner'
        },
        {
            id: 6,
            name: 'Spring Chicken Fried Rice ',
            image: '6.png',
            price: 80000,
            calories: '120 calories',
            rate: 5,
            cat: 'dinner'
        },
        // Add more products as needed
    ];

    let listCards = [];

    function initApp() {
        products.forEach((value, key) => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('col-lg-4', 'col-sm-6', 'dish-box-wp', value.cat); // Use value.cat
            newDiv.dataset.cat = value.cat; // Use value.cat
            newDiv.innerHTML = `
            <div class="dish-box text-center">
                <div class="dist-img">
                    <img src="assets/images/dish/${value.image}" alt="">
                </div>
                <div class="dish-rating">
                    ${value.rate}
                    <i class="uil uil-star"></i>
                </div>
                <div class="dish-title">
                    <h3 class="h3-title">${value.name}</h3>
                    <p>${value.calories}</p>
                </div>
                <div class="dish-info">
                    <ul>
                        <li>
                            <p>Type</p>
                            <b>Non Veg</b>
                        </li>
                        <li>
                            <p>Persons</p>
                            <b>2</b>
                        </li>
                    </ul>
                </div>
                <div class="dist-bottom-row">
                    <ul>
                        <li>
                            <b>$ ${value.price.toLocaleString()}</b>
                        </li>
                        <li>
                            <a class="btn btn-warning" href="${value.link}" role="button">Details</a>
                            <button class="dish-add-btn" onclick="addToCard(${key})">
                                <i class="uil uil-plus"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>`;
            list.appendChild(newDiv);
        });
    }

    window.addToCard = function(key) {
        if (!listCards[key]) {
            listCards[key] = { ...products[key], quantity: 1 };
        } else {
            listCards[key].quantity += 1;
        }
        reloadCard();
    }

    function reloadCard() {
        listCard.innerHTML = '';
        let count = 0;
        let totalPrice = 0;

        listCards.forEach((value, key) => {
            if (value) {
                totalPrice += value.price * value.quantity;
                count += value.quantity;

                let newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div><img src="assets/images/dish/${value.image}" /></div>
                    <div>${value.name}</div>
                    <div>$ ${value.price.toLocaleString()}</div>
                    <div>
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>`;
                listCard.appendChild(newDiv);
            }
        });

        let taxRate = 0.10;
        let taxAmount = totalPrice * taxRate;
        let totalWithTax = totalPrice + taxAmount;

        document.querySelector('.order-calculate p:nth-child(1) span').innerText = totalPrice.toLocaleString();
        document.querySelector('.order-calculate p:nth-child(2) span').innerText = count;
        document.querySelector('.order-calculate p:nth-child(4) span').innerText = totalWithTax.toLocaleString();
        total.innerText = `Pay $ ${totalWithTax.toLocaleString()}`;
        quantity.innerText = count;
    }

    window.changeQuantity = function(key, qty) {
        if (qty <= 0) {
            delete listCards[key];
        } else {
            listCards[key].quantity = qty;
        }
        reloadCard();
    }

    initApp();
});
