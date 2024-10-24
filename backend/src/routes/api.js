const express = require('express');
const router = express.Router();
const { getSongs, getAlbums, getArtists } = require('../controllers/itemController');

router.get('/songs', getSongs);
router.get('/albums', getAlbums);
router.get('/artists', getArtists);

module.exports = router;
