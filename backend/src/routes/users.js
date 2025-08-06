const express = require('express');
const dbSingleton = require('../../dbSingleton.js');
const { authenticateToken } = require('../middleware/auth.js');

const router = express.Router();
const db = dbSingleton.getConnection();

// Get user profile by ID
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    // Basic security check: a user can only request their own profile
    if (req.user.user_id.toString() !== id) {
        return res.status(403).json({ message: 'Forbidden: You can only view your own profile.' });
    }

    const sql = `SELECT user_id, username, email, role, created_at FROM users WHERE user_id = ?`;
    try {
        const [rows] = await db.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Database error', details: err.message });
    }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    // Basic security check: a user can only update their own profile
    if (req.user.user_id.toString() !== id) {
        return res.status(403).json({ message: 'Forbidden: You can only update your own profile.' });
    }
    
    const sql = `UPDATE users SET username = ? WHERE user_id = ?`;
    try {
        const [result] = await db.query(sql, [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Database error', details: err.message });
    }
});

module.exports = router; 