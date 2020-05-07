async function mainlisting() {
  let response = await fetch("/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  console.log(response[0]);
  document.getElementById("listing1name").innerText = `${response[0].postingTitle}`;
  document.getElementById("listing1desc").innerText = `${response[0].description}`;
  document.getElementById("listing1link").href = `/product/${response[0]._id}`;

  document.getElementById("listing2name").innerText = `${response[1].postingTitle}`;
  document.getElementById("listing2desc").innerText = `${response[1].description}`;
  document.getElementById("listing2link").href = `/product/${response[1]._id}`;

  document.getElementById("listing3name").innerText = `${response[2].postingTitle}`;
  document.getElementById("listing3desc").innerText = `${response[2].description}`;
  document.getElementById("listing3link").href = `/product/${response[2]._id}`;

  document.getElementById("listing4name").innerText = `${response[3].postingTitle}`;
  document.getElementById("listing4desc").innerText = `${response[3].description}`;
  document.getElementById("listing4link").href = `/product/${response[3]._id}`;

  document.getElementById("listing5name").innerText = `${response[4].postingTitle}`;
  document.getElementById("listing5desc").innerText = `${response[4].description}`;
  document.getElementById("listing5link").href = `/product/${response[4]._id}`;

  document.getElementById("listing6name").innerText = `${response[5].postingTitle}`;
  document.getElementById("listing6desc").innerText = `${response[5].description}`;
  document.getElementById("listing6link").href = `/product/${response[5]._id}`;
  // document.getElementById('listing1').innerText = `hello`;
}
mainlisting();
