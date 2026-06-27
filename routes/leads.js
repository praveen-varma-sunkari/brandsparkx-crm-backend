const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all leads
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM leads ORDER BY createdAt DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/leads error:', err);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// POST new lead
router.post('/', async (req, res) => {
  try {
    const { clientName, contactInfo, serviceInterest, budget, location, leadSource, priority, notes } = req.body;
    if (!clientName || !contactInfo) {
      return res.status(400).json({ error: 'clientName and contactInfo are required' });
    }
    const [result] = await db.execute(
      `INSERT INTO leads (clientName, contactInfo, serviceInterest, budget, location, leadSource, priority, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [clientName, contactInfo, serviceInterest||null, budget||null, location||null, leadSource||null, priority||'Warm', notes||null]
    );
    res.status(201).json({ message: 'Lead captured successfully', id: result.insertId });
  } catch (err) {
    console.error('POST /api/leads error:', err);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

// PUT update lead
router.put('/:id/status', async (req, res) => {
  try {
    const { status, owner, priority, notes } = req.body;
    const fields = [], values = [];
    if (status !== undefined)   { fields.push('followUpStatus=?'); values.push(status); }
    if (owner !== undefined)    { fields.push('owner=?');          values.push(owner); }
    if (priority !== undefined) { fields.push('priority=?');       values.push(priority); }
    if (notes !== undefined)    { fields.push('notes=?');          values.push(notes); }
    if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });
    values.push(req.params.id);
    const [result] = await db.execute(`UPDATE leads SET ${fields.join(', ')} WHERE id=?`, values);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead updated' });
  } catch (err) {
    console.error('PUT error:', err);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE lead
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.execute('DELETE FROM leads WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

module.exports = router;
