const pool = require('../dataBase/db')

const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tb_users');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

const getUsersbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tb_users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    try {
        // olha se email já existe
        const exists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (exists.rows.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // cria o usuário
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Erro ao criar usuario:', error.message);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM tb_users WHERE email = $1 AND password_hash = $2',
            [email, password]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Email ou senha incorretos' });
        }

        res.status(200).json({
            message: 'Login realizado com sucesso',
            user: result.rows[0]
        });

    } catch (err) {
        console.error('Erro ao fazer login:', err.message);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const result = await pool.query(
            'UPDATE tb_users SET name = $1, email = $2, password_hash = $3 WHERE id = $4 RETURNING *',
            [name, email, password, id]
        );

        res.status(200).json(result.rows[0]);

    } catch (err) {
        console.error('Erro ao atualizar usuário:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM tb_users WHERE id = $1', [id]);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });

    } catch (err) {
        console.error('Erro ao deletar usuário:', err.message);
        res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
};

module.exports = {
    getUsers,
    getUsersbyId,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};