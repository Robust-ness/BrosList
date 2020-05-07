async function mainlisting () {
let response = await fetch('https:127.0.0.1:3000/products');
response = response.json();
document.getElementById('listing1').innerText = `${response[0].postingTitle}`;

}
mainlisting();