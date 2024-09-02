import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file.
dotenv.config();

const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to serve static files (CSS)
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.render('index', { mealData: null });
});

// Route to get meal data
app.get('/meals', async (req, res) => {
  const calories = req.query.calories || 2000;
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/mealplanner/generate`,
      {
        params: {
          apiKey: apiKey,
          timeFrame: 'day',
          targetCalories: calories,
        },
      }
    );
    const mealData = response.data;
    res.render('index', { mealData });
  } catch (error) {
    console.error('Error fetching meal data:', error);
    res.render('index', { mealData: null });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
