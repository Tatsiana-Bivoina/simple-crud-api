require('dotenv').config();
const http = require('http');
const fs = require('fs');
const { validatePost, validateUUID } = require('./validation');
const { generateUUID } = require('./generateUUID');
const { findPersonById } = require('./findPerson');

const port = process.env.PORT;
let personArr = [];

http.createServer(function(request,response) {
  console.log(request.url, request.method);
  let requestUrlArr = request.url.split('/');
  requestUrlArr.shift();
    
  if(requestUrlArr[0] == 'person' || (requestUrlArr[0] == 'person' && requestUrlArr.length == 2)) {
    switch(request.method) {
      case 'GET': 
        if(requestUrlArr.length == 1) {
          sendResponse(response, 200, personArr);
          break;
        }
        if(requestUrlArr.length == 2) {
          if(!validateUUID(request.url)) {
            sendResponse(response, 400, {"Message": "The requested id is not a universally unique identifier"});
          } else {
            let obj = findPersonById(requestUrlArr[1], personArr);
            if(obj.statusCode == 404) {
              sendResponse(response, obj.statusCode, {"Message": `${obj.message}`});
            }
            if(obj.statusCode == 200) {
              sendResponse(response, obj.statusCode, obj.person);
            }
          }
        }
      case 'POST': 
        request.on('data', data => {
          const jsondata = JSON.parse(data);
          let obj = validatePost(jsondata);
          if(obj.statusCode == 201) {
            let newObj = Object.assign({"id": generateUUID()}, jsondata)
            personArr.push(newObj);
            sendResponse(response, obj.statusCode, newObj);
          }
          if(obj.statusCode == 400) {
            sendResponse(response, obj.statusCode, obj.message);
          }
        });
        break;
      case 'DELETE':
        break;
      case 'PUT':
        break;
    }
  } else {
    sendResponse(response, 500, {"Message": "Resource that you requested doesn`t exist"});
  } 
}).listen(port, "localhost",()=>{
    console.log("Сервер начал прослушивание запросов");
});

function sendResponse(response, statusCode, data) {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = statusCode;
  response.end(JSON.stringify(data, null, '\t'));
}