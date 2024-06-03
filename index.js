const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { recommendSimilarMeals } = require('./recommendations');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const meals = [];
app.use(cors());

// CSV dosyasının doğru yolunu belirleyin
const csvFilePath = path.join(__dirname, 'meals-1708525333.csv');

// CSV dosyasını okuma ve veriyi işleme
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    meals.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    transformData(meals);
  })
  .on('error', (err) => {
    console.error('Error reading the CSV file:', err);
  });

// Veriyi dönüştürme fonksiyonu
function transformData(meals) {
  meals.forEach(meal => {
    if (typeof meal.categoryIds === 'string') {
      meal.categoryIds = JSON.parse(meal.categoryIds);
    }
    if (typeof meal.ingredients === 'string') {
      meal.ingredients = JSON.parse(meal.ingredients);
    }
    if (typeof meal.steps === 'string') {
      meal.steps = JSON.parse(meal.steps);
    }
    meal.ingredients = normalizeIngredients(meal.ingredients);
    meal.isGlutenFree = meal.isGlutenFree === 'true';
    meal.isLactoseFree = meal.isLactoseFree === 'true';
    meal.isVegan = meal.isVegan === 'true';
    meal.isVegetarian = meal.isVegetarian === 'true';
    meal.duration = parseInt(meal.duration, 10);
    if (meal.affordability === 'affordable') {
      meal.affordability = 1;
    } else if (meal.affordability === 'luxurious') {
      meal.affordability = 3;
    } else {
      meal.affordability = 2;
    }
    if (meal.complexity === 'simple') {
      meal.complexity = 1;
    } else if (meal.complexity === 'challenging') {
      meal.complexity = 3;
    } else {
      meal.complexity = 2;
    }
  });
}

function normalizeIngredients(ingredients) {
  return ingredients.map(ingredient => ingredient.toLowerCase().replace(/[^a-z\s]/gi, '').trim());
}

// API endpoint oluşturma
app.get('/recommendations/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  console.log('Request Title:', title); // Bu satırı ekleyin
  const favoriteMeal = meals.find(meal => meal.title.toLowerCase() === title);
  console.log('Favorite Meal:', favoriteMeal);
  if (!favoriteMeal) {
    return res.status(404).send('Meal not found');
  }
  const recommendations = recommendSimilarMeals(favoriteMeal, meals);
  res.json(recommendations);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

