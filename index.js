const {countries} = require('country-data');

const {states} = require('countryjs');

const http = require('http');
const fs = require('fs');
const url = require('url');


http.createServer((request, response) => {  

   const { pathname } = url.parse(request.url);

     if(pathname === '/'){
      fs.readFile('index.html', (err, data) => {
        if (err) {
           console.log(err);
           response.writeHead(404, {'Content-Type': 'text/html'});
        }else { 
           response.writeHead(200, {'Content-Type': 'text/html'});  
           response.write(data.toString());   
        }
        response.end();
     });   

   }
   

else{
   
   if(/^\/countries$/.test(pathname)){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(countries.all.filter(c=> states(c.alpha2)).map(c=>({label: c.name, value: c.alpha2}))));
   }
   else if(/^\/countries\/\w+\/states$/.test(pathname)){
      const match = pathname.match(/^\/countries\/(\w+)\/states$/);
      const cc =  match[1];
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(states(cc).map(state => ({label: state, value: state}))));
   }
  
     response.end();   
  }
  
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
