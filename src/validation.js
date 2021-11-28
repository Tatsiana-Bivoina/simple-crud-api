function validatePost(jsondata) {
  let obj = {
    "statusCode": 201,
    "message": ''
  }
  if(!jsondata.hasOwnProperty('name') || typeof jsondata.name != 'string' || jsondata.name == '') {
    return sendResponse(obj, 'Property name is missing in the request or the type is incorrect');
  }
  if(!jsondata.hasOwnProperty('age') || typeof jsondata.age != 'number') {
    return sendResponse(obj, 'Property age is missing in the request or the type is incorrect');
  }
  if(!jsondata.hasOwnProperty('hobbies') || !Array.isArray(jsondata.hobbies) || !checkTypeArray(jsondata.hobbies)) {
    return sendResponse(obj, 'Property hobbies is missing in the request or the type is incorrect');
  }
  return obj;
}

function checkTypeArray(arr) {
  let isString = true;
  arr.forEach(element => {
    if(typeof element != 'string' || element == '') isString = false;
  });
  return isString;
}


function sendResponse(obj, message) {
  obj.statusCode = 400;
  obj.message = message;
  return obj;
}

function validateUUID(requestUrl) {
  const regExp = /^\/person\/[0-9a-z]{8}-{1}[0-9a-z]{4}-{1}[0-9a-z]{4}-{1}[0-9a-z]{4}-{1}[0-9a-z]{12}$/g;
  let isUUID = true;
  if(!regExp.test(requestUrl)) {
    return isUUID = false;
  }
  return isUUID;
}

module.exports = {
  validatePost,
  validateUUID
}