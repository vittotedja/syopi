axios.get('/shop/testing%20add%2030')
  .then(response => {
    console.log(response.data);
    // Do something with the response data
    document.querySelector("#first").innerText = response.data
  })
  .catch(error => {
    console.log(error);
    // Handle any errors that occurred while fetching the data
  });
