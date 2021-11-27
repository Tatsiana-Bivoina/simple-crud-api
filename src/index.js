require('dotenv').config();
const http = require('http');
const fs = require('fs');
const { validatePost, validateUUID } = require('./validation');
const { generateUUID } = require('./generateUUID');
const { findPersonById } = require('./findPerson');

const port = process.env.PORT;
let personArr = [];


http.createServer(function(request,response){
    console.log(request.url, request.method);

    if(request.url == '/person') {
      switch(request.method) {
        case 'GET': 
          response.setHeader('Content-Type', 'application/json');
          response.statusCode = 200;
          response.end(JSON.stringify(personArr, null, '\t'));
          break;
        case 'POST': 
          request.on('data', data => {
            const jsondata = JSON.parse(data);
            if(validatePost(jsondata, response)) {
              let newObj = Object.assign({"id": generateUUID()}, jsondata)
              personArr.push(newObj);
              response.setHeader('Content-Type', 'application/json');
              response.statusCode = 201;
              response.end(JSON.stringify(newObj, null, '\t'));
            }
          });
          break;
      }
    } else if (validateUUID(request.url, response)) {
      let id = request.url.split('/');
      let person = findPersonById(id[id.length - 1], personArr, response);

      switch(request.method) {
        case 'GET': 
          response.setHeader('Content-Type', 'application/json');
          response.statusCode = 200;
          response.end(JSON.stringify(person, null, '\t'));
          break;
      }
    } else {
      response.statusCode = 500;
      response.end('"Message": "Resource that you requested doesn`t exist"');
    }
    
     
}).listen(port, "localhost",()=>{
    console.log("Сервер начал прослушивание запросов");
});
