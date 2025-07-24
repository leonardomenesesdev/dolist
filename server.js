import connectDb from './src/config/dbConnect.js';
import app from './src/app.js';

const startServer = async () => {
    const connect = await connectDb();

    connect.on('error', () => console.error('Erro de conexão'));
    connect.once('open', () => console.log('Mongo conectado'));

    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
};

startServer();
