// // Here we will be unit testing the database functionality from server/controller/categoryController.js
// const fs = require('fs');
// const path = require('path');
// const { hasUncaughtExceptionCaptureCallback } = require('process');
const mongoose =require('mongoose');
const categoryController = require('../server/controller/categoryController.js');
const userController = require('../server/controller/userController.js');
const { User, Category, Item } = require('../server/models/models.js')
const { MongoMemoryServer } = require('mongodb-memory-server');

// instantiate a mongo memory server
const mongod = new MongoMemoryServer();

// const port = await mongod.getPort();
// const dbPath = await mongod.getDbPath();
// const dbName = await mongod.getDbName();

// create a constant mocking user creation data to be passed into middleware, per userSchema
const userEntries = {body: { fullName: 'Kevin Durant', password: '12345', userName: 'Derfus Maximus', email: 'neversummer@heavenly.io', categories: ['something interesting']}}

describe('testing middleware functionality', () => {
  //   beforeAll functionality to run before any tests are executed
  //   - connect to MongoDB Memory Server with mongoose.connect
  
  beforeAll(async () => {
    const uri = await mongod.getUri();
    console.log('------> returned uri object', uri);

    await mongoose.createConnection(
      `${uri}`, {
        useNewUrlParser: true, 
        useCreateIndex: true }, err => {
          if (err) {
            console.log('error connecting to MongoDB Memory Server', err);
            process.exit(1);
          }
        })
  });

  // --- testing user document creation in Mongo
  it('should create and save a new user successfully', async (done) => {
    // instantiate a new user passing the mock data 
    const newUser = new User(userEntries.body);
    console.log('instantiate a new user', newUser);
    const res = {};
    // initialize a constant to be assigned the evaluated return of the middleware invocation
    const savedUser = await userController.createUser(userEntries, res)
    console.log('saved data', savedUser);

    expect(savedUser._id).toBeDefined();                        // <--- id should be defined upon successful save
    expect(savedUser.userName).toBe(userEntries.userName);      // <--- stored userName should match passed value (TYP for all data)

    done();
    });








//   --- testing createCategory method of categoryController
//   it ('should add new category', () => {
//     // create variable to mock incoming data from request body
//     const mockUserData = [{
//       body: {
//         category: "Gerbils",
//       }
//     }]

//     const mockResObject = [{testJsonFile}]
    
//     create a mock result that invokes the middleware
//     const testResult = categoryController.createCategory(mockUserData, mockResObject)
//     expecting new category to be "Gerbils"
//     console.log(testResult)
    
//     expect(testResult)
//   })

//   it ('returns an error when category is not provided', () => {
//       const noCat = 
//   })

})
