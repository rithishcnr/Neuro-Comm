const express = require('express');
const router = express.Router();
const Command = require('../models/Command');

router.post('/', async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  try {
    const newCommand = new Command({ command });
    await newCommand.save();
    res.status(201).json({ message: 'Command saved successfully' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Failed to save command' });
  }
});

router.get('/', async (req, res) => {
  try {
    const commands = await Command.find().sort({ timestamp: -1 }).limit(20);
    res.json(commands);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch commands' });
  }
});

module.exports = router;
