const pool = require('../dataBase/db')

const getRecurrence = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tb_recurrence');
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar recorrencia' })
    }
}

const createRecurrence = async (req, res) => {
    const {title} = req.body
    try {
        const result = await pool.query('INSERT INTO tb_recurrence (title) VALUES ($1) RETURNING *',
            [title])
            res.status(200).json(result.rows[0])
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar recorrencia' })
        }
    }



module.exports = {getRecurrence, createRecurrence}