function findPersonById(id, personsArr) {
  let obj = {
    "statusCode": 200,
    "message": '',
    "person": {}
  }
  personsArr.forEach(element => {
    if(element.id == id) {
      obj.person = element;
    }
  });
  if(Object.keys(obj.person).length == 0) {
    obj.statusCode = 404;
    obj.message = 'Person with requested id does not exist';
  }
  return obj;
}

module.exports = {
  findPersonById
}