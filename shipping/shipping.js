fetch('http://127.0.0.1:5000/shipping')
      .then(function (response) {
          return response.text();
      }).then(function (text) {
          console.log('GET response:');
          console.log(text); 
      });