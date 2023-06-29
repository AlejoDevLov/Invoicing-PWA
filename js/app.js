// Elementos DOM

const btnPrint = document.querySelector('.btn-print');
const date = document.querySelector('#date');
const priceInputs = document.querySelectorAll('.price-input');
const unitInputs = document.querySelectorAll('.unit-input');
const amountInputs = document.querySelectorAll('.amount-input');
const sumTotal = document.querySelector('.amount-8');

const allInputs = document.querySelectorAll('.bottom-form input');


let amount = 0;



// Eventos
btnPrint.addEventListener('click', () => {
    window.print();
})

for ( let i = 0; i < priceInputs.length; i++ ) {
    priceInputs[i].addEventListener('keyup', e => {
        const value = e.target.value;
        // console.log(unitInputs[i].value);
        const unit = unitInputs[i].value;
        const total = value*unit;
        const totalFormated = total.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 });
        amountInputs[i].textContent = totalFormated;
    });
}

for ( let i = 0; i < unitInputs.length; i++ ) {
    unitInputs[i].addEventListener('keyup', e => {
        const value = e.target.value;
        // console.log(unitInputs[i].value);
        const price = priceInputs[i].value;
        const total = value*price;
        const totalFormated = total.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 });
        amountInputs[i].textContent = totalFormated;
    });
}

for ( let i = 0; i < allInputs.length; i++ ) {
    allInputs[i].addEventListener('keydown', e => {
        if ( e.keyCode === 9 ){
            e.preventDefault();
            if( i+7 >= allInputs.length ){
                return;
            }
            allInputs[i+7].focus();
        }
    });
}


// funciones

const sumTotalAmount = () => {
    let total = 0;
    amountInputs.forEach( amount => {
        const string = amount.textContent.replace(/[^0-9.-]+/g,""); // elimina formato de moneda
        const number = Number(string); // convierte a tipo numero
        total = total + number;
        const totalFormated = total.toLocaleString('en-US', { style: 'currency',
                                                            currency: 'USD', 
                                                            minimumFractionDigits: 2, 
                                                            maximumFractionDigits: 6 
                                                            });
        sumTotal.textContent = totalFormated;
    } )
}


// instanciar un observador del constructor
const observer = new MutationObserver(fnObserver);

// callback como argumento para el MutationObserver
function fnObserver( mutationList, observer ) {
    // mutationList regresa un arreglo con el tipo de mutaciones en el elemento (atributo, contenido, elementos hijos etc)
    // console.log(mutationList[0].target.textContent);
    sumTotalAmount();
} 

// opciones para el observador ( que tipo de mutaciones va a observar)
const config = { attributes: true, childList: true, subtree: true };

// comenzar proceso de observacion de mutacion en el elemento pasado como argumento y la consifuracion para el observador
amountInputs.forEach( amount => {
    observer.observe(amount, config);
} )


date.textContent = new Date().getFullYear();

