
const pool = require('../dataBase/db')

const getLembretes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tb_prescriptions');
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tb_prescriptions' })
    }
}

const createLembrete = async (req, res) => {
    const {name, hours, recurrence, takenow, user_id} = req.body;
    try {
        const result = await pool.query('INSERT INTO tb_prescriptions (name, hours, recurrence, takenow, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, hours, recurrence, takenow, user_id])
            res.status(200).json(result.rows[0])
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar lembrete' })
        }
    }

const updateLembrete = async (req, res) => {
    const {id} = req.params
    const {name, hours, recurrence, takenow, user_id} = req.body
    try {
        const result = await pool.query('UPDATE tb_prescriptions SET name = $1, hours = $2, recurrence = $3, takenow = $4, user_id = $5 WHERE id = $6 RETURNING *',
            [name, hours, recurrence, takenow, user_id, id])
            res.status(200).json(result.rows[0])
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar lembrete' })
        }
    }

const deleteLembrete = async (req, res) => {
    const {id} = req.params
    try {
        const result = await pool.query('DELETE FROM tb_prescriptions WHERE id = $1 RETURNING *', 
            [id])
            res.status(200).json ({ message: 'Lembrete deletado com sucesso'})
        } catch (err) {
            res.status(500).json({ error: ' Erro ao deletar o lembrete'})
        }
    }

module.exports = {getLembretes, createLembrete, updateLembrete, deleteLembrete}
