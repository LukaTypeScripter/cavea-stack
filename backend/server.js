const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();

// Allow only requests from port 3000
const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

// create a new Sequelize instance with the database connection details
const sequelize = new Sequelize('postgres', 'postgres', 'Tuta68686', {
  host: 'localhost',
  dialect: 'postgres',
});

// define a User model
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
    unique: true,
  },
});
const testData = [];
for (let i = 0; i < 300; i++) {
  testData.push({
    name: `Item ${i}`,
    location: `Location ${i}`,
    price: `${i * 10}.00`,
  });
}

// insert the test data into the database
User.bulkCreate(testData)
  .then(() => {
    console.log('Test data inserted successfully.');
  })
  .catch((error) => {
    console.error('Unable to insert test data:', error);
  });
// sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });

// create a new user
app.post('/users', (req, res) => {
  const { name, location, price } = req.body;
  User.create({ name, location, price })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// get all users
app.get('/users', (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// get a user by id
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// update a user by id
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, location, price } = req.body;
  User.update({ name, location, price }, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated > 0) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// delete a user by id
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id } })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080.');
});
