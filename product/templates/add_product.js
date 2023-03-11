console.log('vitto jelek')
fetch('http://127.0.0.1:5000/')
.then(function (response) {
    return response.text();
}).then(function (text) {
    console.log('GET response:');
    console.log(text); 
    document.querySelector('#test').innerText = text;
});