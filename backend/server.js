const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const app = express();

//აქ ვაკეთებ ქორსს რომ მარტო 3000 ზე მყოფ პორტს ქონდეს წვდომა სერვერზე
const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
//აქ ვუკავშირდები database-ს sequlize-ით
const sequelize = new Sequelize('postgres', 'postgres', 'Tuta68686', {
  host: 'localhost',
  dialect: 'postgres',
});

//აქ უკვე table-ის ტიპებს ვქმნი
const User = sequelize.define('Inventories', {
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
//ეს ტესტირებისთვის გავაკეთე რომ დამეტესტა სერვერი big data-ს როგორ გაუმკლავდებდა
const testData = [];
for (let i = 0; i < 300; i++) {
  testData.push({
    name: `Item ${i}`,
    location: `Location ${i}`,
    price: `${i * 10}.00`,
  });
}

// აქ insert-ს ვაკეთებ data-სი database-ში
User.bulkCreate(testData)
  .then(() => {
    console.log('Test data inserted successfully.');
  })
  .catch((error) => {
    console.error('Unable to insert test data:', error);
  });
// აქ log - გამომაქვს დაუკავშრდა თუ არა database-ს
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });

// აქ ვქმნი ახალ inv-ის რომ შემდეგ fetch-ვქნა 
app.post('/Inventories', (req, res) => {
  const { name, price, location } = req.body;
  const { page = 1, limit = 10 } = req.query;
  
  User.create({ name, price, location })
    .then(() => {
      
      const order = req.query.sort === 'price'
        ? [['price', 'ASC']]
        : [['name', 'ASC']];
      
      return User.findAndCountAll({
        where: { location },
        order,
        offset: (page - 1) * limit,
        limit,
      });
    })
    .then(({ count, rows }) => res.json({ total: count, pages: Math.ceil(count / limit), page, limit, data: rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});


//ვიპოვოთ ყველა item
app.get('/Inventories', (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// ვიპოვოთ inv-ში id-ის მიხედვით
app.get('/Inventories/:id', (req, res) => {
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



// აქ ვშლით ნივთებს
app.delete('/Inventories/:id', (req, res) => {
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

// სერვერთან დაკავშრება
app.listen(8080, () => {
  console.log('Server is running on port 8080.');
});
