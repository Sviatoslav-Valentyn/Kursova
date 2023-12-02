const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// Приклади "бази даних" у пам'яті
let users = [
  {username: 'admin', password: '1234', admin: true}
];
let pharmacies = [
  {
    "id": 1,
    "name": "Pharmacy 1",
    "street": "Pharmacy street 1",
    "goods": [
      {
        "name": "One Medicine",
        "description": "One Medicine description",
        "price": 1245
      },
      {
        "name": "Second Medicine",
        "description": "Second Medicine description",
        "price": 3455
      }
    ]
  },
  {
    "id": 2,
    "name": "Pharmacy 2",
    "street": "Pharmacy street 2",
    "goods": [
      {
        "name": "One Medicine",
        "description": "One Medicine description",
        "price": 1245
      },
    ]
  },
  {
    "id": 3,
    "name": "Pharmacy 3",
    "street": "Pharmacy street 3",
    "goods": [
      {
        "name": "One Medicine",
        "description": "One Medicine description",
        "price": 1245
      },
      {
        "name": "Second Medicine",
        "description": "Second Medicine description",
        "price": 3455
      },
      {
        "name": "Third Medicine",
        "description": "Third Medicine description",
        "price": 2545
      }
    ]
  }
];

app.get('/', (req, res) => {
  res.send('Working')
})

app.get('/pharmacies', (req, res) => {
  res.json(pharmacies);
});

app.get('/pharmacies/:id', (req, res) => {
  const pharmaciesItem = pharmacies.find((item) => item.id === parseInt(req.params.id)); 
  res.json(pharmaciesItem);
});

// Реєстрація користувача
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const newUser = { username, password, admin: false };
  users.push(newUser);
  console.log(users);
  res.status(201).json(newUser);
});

// Авторизація користувача
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Аунтифікація користувача
app.post('/auth/:name', (req, res) => {
  const authUser = users.find(user => user.username === req.params.name);
  console.log(authUser);
  res.status(200).json(authUser)
})

// Додавання товару
app.post('/pharmacies/:id/addProduct', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const pharmacy = pharmacies.find(pharmacy => pharmacy.id === parseInt(id));

  if (!pharmacy) {
    return res.status(404).json({ error: 'Аптека не знайдена' });
  }

  const newProduct = { name, description, price };
  pharmacy.goods.push(newProduct);

  res.json({ message: 'Товар успішно додано до аптеки', pharmacy });
});

// Видалення товару
app.delete('/pharmacies/:id/goods/:name', (req, res) => {
  const pharmacyId = parseInt(req.params.id);
  const itemName = req.params.name;

  const pharmacy = pharmacies.find(pharmacy => pharmacy.id === pharmacyId);

  if (!pharmacy) {
    return res.status(404).send('Аптеку не знайдено');
  }

  const itemIndex = pharmacy.goods.findIndex(item => item.name === itemName);

  if (itemIndex === -1) {
    return res.status(404).send('Товар не знайдено в цій аптеці');
  }

  pharmacy.goods.splice(itemIndex, 1);

  return res.status(200).json(pharmacy.goods);
});

// Редагування товару
app.put('/pharmacies/:id/goods/:name', (req, res) => {
  const { id, name } = req.params;
  const { newName, description, price } = req.body;

  const pharmacy = pharmacies.find(pharmacy => pharmacy.id === parseInt(id));
  if (!pharmacy) {
    return res.status(404).json({ message: 'Аптека не знайдена' });
  }
  
  const goods = pharmacy.goods.find(item => item.name === name);
  if (!goods) {
    return res.status(404).json({ message: 'Товар не знайдено' });
  }

  // Виконання редагування товару
  goods.name = newName || goods.name;
  goods.description = description || goods.description;
  goods.price = price || goods.price;

  return res.status(200).json({ message: 'Товар успішно відредаговано', goods });
});

// Роут для додавання нової аптеки
app.post('/addPharmacies', (req, res) => {
  const newPharmacy = req.body; 
  pharmacies.push(newPharmacy);

  res.json(pharmacies);
});

app.delete('/deletePharmacies/:id', (req, res) => {
  const pharmacyId = parseInt(req.params.id);
  pharmacies = pharmacies.filter(pharmacy => pharmacy.id !== pharmacyId);
  res.json({ message: 'Аптеку успішно видалено' });
});

app.put('/updatePharmacies/:id', (req, res) => {
  const pharmacyId = parseInt(req.params.id);
  const { name, street } = req.body;

  console.log(pharmacyId);

  const pharmacyIndex = pharmacies.findIndex(pharmacy => pharmacy.id === pharmacyId);
  if (pharmacyIndex !== -1) {
    pharmacies[pharmacyIndex] = {...pharmacies[pharmacyIndex],
      name,
      street,
    };
    res.json({ message: 'Аптеку успішно відредаговано', pharmacy: pharmacies[pharmacyIndex] });
  } else {
    res.status(404).json({ message: 'Аптеку не знайдено' });
  }
});

// Початок серверу
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});