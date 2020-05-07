async function mainlisting() {
  let response = await fetch("/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  //console.log(response[0]);
  var last_element = response[response.length - 1];
  document.getElementById("listing1name").innerText = `${response[response.length - 1].postingTitle}`;
  document.getElementById("listing1desc").innerText = `${response[response.length - 1].description}`;
  document.getElementById("listing1link").href = `/product/${response[response.length - 1]._id}`;

  document.getElementById("listing2name").innerText = `${response[response.length - 2].postingTitle}`;
  document.getElementById("listing2desc").innerText = `${response[response.length - 2].description}`;
  document.getElementById("listing2link").href = `/product/${response[response.length - 2]._id}`;

  document.getElementById("listing3name").innerText = `${response[response.length - 3].postingTitle}`;
  document.getElementById("listing3desc").innerText = `${response[response.length - 3].description}`;
  document.getElementById("listing3link").href = `/product/${response[response.length - 3]._id}`;

  document.getElementById("listing4name").innerText = `${response[response.length - 4].postingTitle}`;
  document.getElementById("listing4desc").innerText = `${response[response.length - 4].description}`;
  document.getElementById("listing4link").href = `/product/${response[response.length - 4]._id}`;

  document.getElementById("listing5name").innerText = `${response[response.length - 5].postingTitle}`;
  document.getElementById("listing5desc").innerText = `${response[response.length - 5].description}`;
  document.getElementById("listing5link").href = `/product/${response[response.length - 5]._id}`;

  document.getElementById("listing6name").innerText = `${response[response.length - 6].postingTitle}`;
  document.getElementById("listing6desc").innerText = `${response[response.length - 6].description}`;
  document.getElementById("listing6link").href = `/product/${response[response.length - 6]._id}`;
  // document.getElementById('listing1').innerText = `hello`;
}
mainlisting();
