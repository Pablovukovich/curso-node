import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: '4000', 
    password: '',
    database: 'chatdb'
}

async function connectDB() {
    try {
        const connection = await mysql.createConnection(config);
        console.log('✅ Conectado a la base de datos');
        return connection;
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        throw error;
    }
}

export default connectDB;

