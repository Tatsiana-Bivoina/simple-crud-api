function validatePost(jsondata, response) {
  if(!jsondata.hasOwnProperty('name') || typeof jsondata.name != 'string' || jsondata.name == '') {
    sendResponse(response, 'Property name is missing in the request or the type is incorrect');
    return false;
  }
  if(!jsondata.hasOwnProperty('age') || typeof jsondata.age != 'number') {
    sendResponse(response, 'Property age is missing in the request or the type is incorrect');
    return false;
  }
  if(!jsondata.hasOwnProperty('hobbies') || !Array.isArray(jsondata.hobbies) || !checkTypeArray(jsondata.hobbies)) {
    sendResponse(response, 'Property hobbies is missing in the request or the type is incorrect');
    return false;
  }
  return true;
}

function checkTypeArray(arr) {
  let isString = true;
  arr.forEach(element => {
    if(typeof element != 'string' || element == '') isString = false;
  });
  return isString;
}

function sendResponse(response, message) {
  response.statusCode = 400;
  response.end(`"Message": "${message}"`);
}

function validateUUID(requestUrl, response) {
  const regExp = /^\/person\/[0-9a-z]{8}-{1}[0-9a-z]{4}-{1}[0-9a-z]{4}-{1}[0-9a-z]{4}-{1}[0-9a-z]{12}$/g;
  let isUUID = true;
  if(!regExp.test(requestUrl)) {
    sendResponse(response, 'The requested id is not a universally unique identifier');
    return isUUID = false;
  }
  return isUUID;
}

module.exports = {
  validatePost,
  validateUUID
}