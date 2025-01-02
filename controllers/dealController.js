const { connectToDatabase, sql } = require('../config/db');

exports.getDeals = async (req, res) => {
    const pool = await connectToDatabase();

    try {
        const result = await pool.request().query('SELECT * FROM deals ORDER BY created_at DESC');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch deals' });
    }
};

exports.addDeal = async (req, res) => {
    const { title, description, link } = req.body;
    const pool = await connectToDatabase();

    try {
        await pool.request()
            .input('title', sql.NVarChar, title)
            .input('description', sql.NVarChar, description)
            .input('link', sql.NVarChar, link)
            .input('user_id', sql.Int, req.user.id)
            .query('INSERT INTO deals (title, description, link, user_id) VALUES (@title, @description, @link, @user_id)');
        res.status(201).json({ message: 'Deal added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add deal' });
    }
};
