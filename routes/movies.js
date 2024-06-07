const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const List = require('../models/List');


router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/list', auth, async (req, res) => {
  const { name, movies, isPublic } = req.body;
  try {
    const newList = new List({ name, movies, isPublic, user: req.user.id });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/list', auth, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
