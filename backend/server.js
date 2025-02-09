const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('🚀 Quiz API is running! Use /api/quiz to fetch questions.');
});


app.get('/api/quiz', async (req, res) => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');

    if (!response.data || !Array.isArray(response.data.questions)) {
      throw new Error('Invalid or empty quiz data received from API');
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error fetching quiz data:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz data. Please try again later.',
      error: error.message, 
    });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
