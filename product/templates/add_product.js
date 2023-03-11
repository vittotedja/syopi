console.log('vitto jelek')
fetch('http://127.0.0.1:5000/')
.then(function (response) {
    return response;
}).then(function (text) {
    console.log('GET response:');
    console.log(text); 
});