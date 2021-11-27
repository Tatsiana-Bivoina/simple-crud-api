function findPersonById(id, personArr, response) {
  let person = {};
  personArr.forEach(element => {
    if(element.id == id) {
      person = element;
    }
  });
  if(Object.keys(person).length == 0) {
    response.statusCode = 404;
    response.end('"Message": "Person with requested id does not exist"');
    return;
  }
  return person;
}

module.exports = {
  findPersonById
}