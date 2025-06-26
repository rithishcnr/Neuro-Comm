// At the top of the file (if not already)
const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');

// ... existing routes ...


router.post('/commands', async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  try {
    const newPrediction = new Prediction({
      inputData: {}, 
      prediction: command,
    });

    await newPrediction.save();
    res.status(201).json({ message: 'Command saved successfully' });
  } catch (err) {
    console.error('Error saving command:', err);
    res.status(500).json({ error: 'Failed to save command' });
  }
});
