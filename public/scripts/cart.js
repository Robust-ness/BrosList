import Cookies from '/scripts/js.cookie.mjs'
async function createPage () {
    if (!Cookies.get('sessionToken')) {
        
    } else {
        // let response = await fetch('/users/me', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${Cookies.get('sessionToken')}`
        //     }
        // })
        // response = await response.json()

        document.getElementById('login').innerText = 'Log Out'
        document.getElementById('loginlink').href = '/logout'
    }
    if (!Cookies.get('cart')) {
        document.getElementById('cart').innerHTML = '<p>Empty Cart</p>'
    } else {
        let arr = Cookies.get('cart').split(',')
        arr.forEach(async (element) => {
            let res = await fetch(`/product/${element.split(':')[0]}/info`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            res = await res.json()
            document.getElementById('cart').innerHTML = document.getElementById('cart').innerHTML + `<div class="item">
                <div class="item-image-container">
                    <img src="data:image/png;base64,${res.itemPicture}" alt="" class="item-image">
                </div>
                <div class="item-text">
                    <h1 class="item-name">${res.postingTitle}</h1>
                    <p class="item-description">Quantity: ${element.split(':')[1]}</p>
                </div>
            </div>`
        })
        
    }
        document.getElementById('checkout').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('fdsf9i')
        function buildSupportedPaymentMethodData() {
            // Example supported payment methods:
            return [{
              supportedMethods: 'basic-card',
              data: {
                supportedNetworks: ['visa', 'mastercard'],
                supportedTypes: ['debit', 'credit']
              }
            }];
          }
          function buildShoppingCartDetails() {
            // Hardcoded for demo purposes:
            return {
              id: 'order-123',
              displayItems: [
                {
                  label: 'Example item',
                  amount: {currency: 'USD', value: '1.00'}
                }
              ],
              total: {
                label: 'Total',
                amount: {currency: 'USD', value: '1.00'}
              }
            };
          }
        var request = new PaymentRequest(buildSupportedPaymentMethodData(),
                                 buildShoppingCartDetails());
        
          
          request.show().then(function(paymentResponse) {
            // Here we would process the payment. For this demo, simulate immediate success:
            paymentResponse.complete('success')
            .then(function() {
              // For demo purposes:
              introPanel.style.display = 'none';
              successPanel.style.display = 'block';
            });
          })
    })

}

// document.getElementById('addCart').addEventListener('click', async (e) => {
//     e.preventDefault()
//     let res = await (await fetch(window.location.pathname + '/info', {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })).json()
//     if (!Cookies.get('cart')) {
        

//         Cookies.set('cart', [res._id + ':' + document.getElementById('quantity').selectedOptions[0].value].toString())
//     } else {
//         let arr = Cookies.get('cart').split(',')
//         arr.push(res._id + ':' + document.getElementById('quantity').selectedOptions[0].value)
//         console.log(arr)
//         Cookies.set('cart', arr.toString())
//     }
// })

createPage()





