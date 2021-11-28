function findPersonById(id, personsArr) {
  let obj = {
    "statusCode": 200,
    "message": '',
    "person": {},
    "personIndex": null
  }
  personsArr.forEach((element, index) => {
    if(element.id == id) {
      obj.person = element;
      obj.personIndex = index;
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