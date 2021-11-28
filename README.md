### To run the application, you need:
1. to follow [the link](https://nodejs.org/en/) and install the LTS version of **Node**
2. to follow [the link](https://www.getpostman.com/) and download **Postman** to validate client-to-server requests and get a response from the backend

**First of all run the server**: 
1. ***In development mode*** : in the terminale write **npm run start:dev**
2. ***In production mode*** : in the terminale write **npm run start:prod**

**API path /person:**
1. **GET**: /person or /person/${personId} should return all persons or person with corresponding personId. 
In Postman you should choose method GET and write the following request:
> http://localhost:5000/person
OR:
http://localhost:5000/person/d70c1c56-8cab-44ab-9c89-c66673950bfc
2. **POST**: /person is used to create record about new person and store it in database.
In Postman you should choose method POST, write the following request:
> http://localhost:5000/person

And fill in the body of request:
- ***name*** — person's name (string, required)
- ***age*** — person's age (number, required)
- ***hobbies*** — person's hobbies (array of strings or empty array, required)
3. **PUT**: /person/${personId} is used to update record about existing person
4. **DELETE**: /person/${personId} is used to delete record about existing person from database
