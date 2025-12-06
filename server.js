
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const prescriptionsRouter = require('./src/routes/prescriptionsRouter');
const usersRouter = require('./src/routes/usersRouter');

app.get('/', (req, res) => {
    res.send('bem vindo ao sistema de lembretes');
});

app.use('/prescriptions', prescriptionsRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running ${PORT}`);
});



module.exports = app;
