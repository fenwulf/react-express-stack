const db = require('../db');

exports.getSongs = (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const pageSize = parseInt(req.query.pageSize) || 25;

  const query = 'SELECT * FROM Song LIMIT ? OFFSET ?';

  db.all(query, [pageSize, start], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
};

exports.getAlbums = (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const pageSize = parseInt(req.query.pageSize) || 25;

  const query = 'SELECT * FROM Album LIMIT ? OFFSET ?';

  db.all(query, [pageSize, start], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
};

exports.getArtists = (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const query = 'SELECT * FROM Artist LIMIT ? OFFSET ?';

  db.all(query, [pageSize, start], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
};
