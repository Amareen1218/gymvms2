const { error } = require('console');
const express = require('express')
const app = express()
const port =  process.env.PORT || 2000;
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const bcrypt = require('bcrypt');

//express.json
app.use(express.json())

// MongoDB setup
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://amareen:d5D4Ir1dT6PbLups@cluster0.cihdsmn.mongodb.net/?retryWrites=true&w=majority';

const swaggerUi = require('swagger-ui-express');

const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gym Fitness Management',
      version: '1.0.0',
    },
  },
  apis: ['./swagger.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//const client = new MongoClient(uri);

let viewCollection;
//let securityCollection;
let hostCollectionName;
let adminCollection;


MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  console.log('Connected to MongoDB'); 
  const db = client.db('GymFitnessManagement');
  adminCollection = db.collection('adminCollection');
  viewCollection = db.collection('viewCollection');
  //securityCollection = db.collection('securityCollectionName');
  hostCollectionName = db.collection('hostCollectionName');

  // Start the server or perform other operations

  const { ObjectId } = require('mongodb');

  ////Function User Login
  async function login(reqUsername, reqPassword) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
  
      // Validate the request payload
      if (!reqUsername || !reqPassword) {
        throw new Error('Missing required fields');
      }
  
      let matchuser = await hostCollectionName.findOne({ Username: reqUsername });
  
      if (!matchuser) {
        throw new Error('User not found!');
      }
      if (matchuser.Password === reqPassword) {
        return {
          user: matchuser,
        };
      } else {
        throw new Error('Invalid password');
      }
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('An error occurred during login.');
    } finally {
      await client.close();
    }
  }

  //Function Admin Login
  async function Adminlogin(reqAdminUsername, reqAdminPassword) {
   const client = new MongoClient(uri);
   try {
     await client.connect();

     // Validate the request payload
     if (!reqAdminUsername || !reqAdminPassword) {
       throw new Error('Missing required fields');
     }
     let matchuser = await adminCollection.findOne({ Username: reqAdminUsername });

     if (!matchuser) {
       throw new Error('User not found!');
     }
     if (matchuser.Password === reqAdminPassword) {
       const token = generateToken(matchuser);
       return {
        user: matchuser,
        token: token,
       };
     } else {
       throw new Error('Invalid password');
     }
   } catch (error) {
     console.error('Login Error:', error);
     throw new Error('An error occurred during login.');
   } finally {
     await client.close();
   }
  }
 
  //Function Admin Register
  async function registerAdmin(reqAdminUsername, reqAdminPassword, reqAdminName, reqAdminEmail) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
 
 
      // Validate the request payload
      if (!reqAdminUsername || !reqAdminPassword || !reqAdminName || !reqAdminEmail) {
        throw new Error('Missing required fields');
      }
 
      await adminCollection.insertOne({
        Username: reqAdminUsername,
        Password: reqAdminPassword,
        name: reqAdminName,
        email: reqAdminEmail,
      });
 
      return 'Registration Complete!!';
      } catch (error) {
      console.error('Registration Error:', error);
      throw new Error('An error occurred during registration.');
     } finally {
      await client.close();
    }
  }

  //Function User Register
  async function register(reqUsername, reqPassword, reqName, reqEmail) {
   const client = new MongoClient(uri);
   try {
     await client.connect();


     // Validate the request payload
     if (!reqUsername || !reqPassword || !reqName || !reqEmail) {
       throw new Error('Missing required fields');
     }

     await hostCollectionName.insertOne({
       Username: reqUsername,
       Password: reqPassword,
       name: reqName,
       email: reqEmail,
     });

     return 'Registration Complete!!';
     } catch (error) {
     console.error('Registration Error:', error);
     throw new Error('An error occurred during registration.');
    } finally {
     await client.close();
   }
  }

  //Function Generate Token
  function generateToken(user) {
    const payload = 
    {
      username: user.AdminUsername,
    };
    const token = jwt.sign
    (
      payload, 'inipassword', 
      { expiresIn: '1h' }
    );
    return token;
  }
  
  //Function Verify
  function verifyToken(req, res, next) {
    let header = req.headers.authorization;
    console.log(header);
  
    let token = header.split(' ')[1];
  
    jwt.verify(token, 'inipassword', function (err, decoded) {
      if (err) {
        return res.status(401).send('Invalid Token');
      }
  
      req.user = decoded;
      next();
    });
  }
  
  // Express setup
  app.use(express.json());

  //Login User
  app.post('/login', (req, res) => {
    console.log(req.body);
  
    login(req.body.Username, req.body.Password)
      .then((result) => {
        res.json(result.user); // Return user information without generating a token
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  });
  
  //Register User
  app.post('/register', (req, res) => {
    console.log(req.body);

    register(req.body.Username, req.body.Password, req.body.name, req.body.email)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
      res.status(400).send(error.message);
      });
  });

  // //Logout
  // app.post('/logout', (req, res) => {
  //   // Perform any logout-related tasks here
  //   res.send('Logout successful');
  // });

  //Create Visit
  
  app.post('/create-visit', async (req, res) => {
    try {
      const {username, userid, gender, age, phoneno, bookdate, time, hours , parkingslot } = req.body;

      // Ensure all required fields are present
      if (!username || !userid || !gender ||  !age || !phoneno || !bookdate || !time || !hours || !parkingslot ) {
        throw new Error('Missing required fields');
      }

      const db = client.db('GymFitnessManagement');
      const viewCollection = db.collection('viewCollection');

      // Insert the visit data into the viewCollection
      const visitData = {
        username,
        userid,
        gender,
        age,
        phoneno,
        bookdate,
        time,
        hours,
        parkingslot
      };
      await viewCollection.insertOne(visitData);

      res.send('Visit created successfully');
    } catch (error) {
      console.error('Error creating visit:', error);
      res.status(500).send('An error occurred while creating the visit');
    }
  });

 // Update visitor (only admin)
 app.patch('/update-visit/:visitName',verifyToken, (req, res) => {
  const visitName = req.params.visitName;
  const {username, userid, gender, age, phoneno, bookdate, time, hours, parkingslot } = req.body;

  if (!username && !userid && !gender && !age && !phoneno && !bookdate && !time && !hours && !parkingslot) {
    res.status(400).send('No fields provided for update');
    return;
  }

  const updateData = {};

  if (username) updateData.username = username;
  if (userid) updateData.userid = userid;
  if (gender) updateData.gender = gender;
  if (age) updateData.age = age;
  if (phoneno) updateData.phoneno = phoneno;
  if (bookdate) updateData.bookdate = bookdate;
  if (time) updateData.time = time;
  if (hours) updateData.hours = hours;
  if (parkingslot) updateData.parkingslot = parkingslot;

  viewCollection
    .findOneAndUpdate({ _id: new ObjectId(visitName) }, { $set: updateData })
    .then((result) => {
      if (!result.value) {
        // No matching document found
        throw new Error('Visit not found');
      }
      res.send('Visit updated successfully');
    })
    .catch((error) => {
      console.error('Error updating visit:', error);
      if (error.message === 'Visit not found') {
        res.status(404).send('Visit not found');
      } else {
        res.status(500).send('An error occurred while updating the visit');
      }
    });
});

  // Delete visit (only admin)
  app.delete('/delete-visit/:visitDetailId',verifyToken, (req, res) => {
    const visitDetailId = req.params.visitDetailId;
  
    viewCollection
      .deleteOne({ _id: new ObjectId(visitDetailId) })
      .then(() => {
        res.send('Visit detail deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting visit detail:', error);
        res.status(500).send('An error occurred while deleting the visit detail');
      });
  });
  
  // Read visit details (only admin)  
  app.get('/visit-details',verifyToken, (req, res) => {
    viewCollection
      .find({})
      .toArray()
      .then((visitDetails) => {
        res.json(visitDetails);
      })
      .catch((error) => {
        console.error('Error retrieving visit details:', error);
        res.status(500).send('An error occurred while retrieving visit details');
      });
  });

  // //Register Security
  // app.post('/register-security', (req, res) => {
  //   const { name, id, workshift, duration, date } = req.body;
  
  //   // Validate the request payload
  //   if (!name || !id || !workshift || !duration || !date) {
  //     res.status(400).send('Missing required fields');
  //     return;
  //   }  
  //   securityCollection
  //     .insertOne({ name, id, workshift, duration, date })
  //     .then(() => {
  //       res.send('Security guard registered successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error registering security guard:', error);
  //       res.status(500).send('An error occurred while registering the security guard');
  //     });
  // });
  
  //Register Admin
  app.post('/register-admin', (req, res) => {
    console.log(req.body);
  
    registerAdmin(req.body.Username, req.body.Password, req.body.name, req.body.email)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  });

  //Login Admin
  app.post('/login-Admin', (req, res) => {
    console.log(req.body);
  
    Adminlogin(req.body.Username, req.body.Password)
      .then((result) => {
        let token = generateToken(result);
        res.send(token);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  });
  
  // //Login Security
  // app.post('/login-security', (req, res) => {
  //   console.log(req.body);
  
  //   const { id, name } = req.body;
  
  //   // Validate the request payload
  //   if (!id || !name) {
  //     res.status(400).send('Missing required fields');
  //     return;
  //   }
  
  //   securityCollection
  //     .findOne({ id, name })
  //     .then((guard) => {
  //       if (!guard) {
  //         res.status(401).send('Invalid credentials');
  //         return;
  //       }
  
  //       // Generate a token for authentication
  //       const token = generateToken(guard);
  
  //       res.send(token);
  //     })
  //     .catch((error) => {
  //       console.error('Error during security guard login:', error);
  //       res.status(500).send('An error occurred during login');
  //     });
  // });
  

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
})
  .catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});