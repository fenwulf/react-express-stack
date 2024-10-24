const db = require('../db');

exports.getSongs = (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const pageSize = parseInt(req.query.pageSize) || 25;

  // Get the total count of songs
  const countQuery = 'SELECT COUNT(*) AS total FROM Song';
  db.get(countQuery, [], (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const totalCount = countResult.total || 0;

    // Get paginated records
    const query = 'SELECT * FROM Song LIMIT ? OFFSET ?';
    db.all(query, [pageSize, start], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Return both paginated records and total count
      res.json({
        data: rows,
        totalCount,
      });
    });
  });
};

exports.getAlbums = (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const pageSize = parseInt(req.query.pageSize) || 25;

  // Query to get the total count of albums
  const countQuery = 'SELECT COUNT(*) AS total FROM Album';
  db.get(countQuery, [], (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const totalCount = countResult.total || 0;

    // Query to get the paginated albums
    const query = 'SELECT * FROM Album LIMIT ? OFFSET ?';
    db.all(query, [pageSize, start], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Return both paginated data and total count
      res.json({
        data: rows,
        totalCount,
      });
    });
  });
};

exports.getArtists = (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Query to get the total count of artists
  const countQuery = 'SELECT COUNT(*) AS total FROM Artist';
  db.get(countQuery, [], (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const totalCount = countResult.total || 0;

    // Query to get the paginated artists
    const query = 'SELECT * FROM Artist LIMIT ? OFFSET ?';
    db.all(query, [pageSize, start], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Return both paginated data and total count
      res.json({
        data: rows,
        totalCount,
      });
    });
  });
};
