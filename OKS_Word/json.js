process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

var getJSON = require('get-json');
var URL = 'https://localhost:4500/description/complete/Tony';
getJSON(URL,(err,response)=>{
  console.log(response[0].idinfo + ' - ' + response[0].category +' - ' + response[0].description);
  
});


/*const https = require('https');

https.get('https://localhost:4500/description/', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
}); */