console.log('test dulu')
fetch('http://127.0.0.1:5000/users')
      .then(function (response) {
          return response.text();
      }).then(function (text) {
          console.log('GET response:');
          console.log(text);
      });