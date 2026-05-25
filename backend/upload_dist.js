const SftpClient = require('ssh2-sftp-client');
const { Client } = require('ssh2');

const config = {
    host: '212.227.146.174',
    port: 22,
    username: 'root',
    password: 'bLh9Mfj4kraagyT',
    readyTimeout: 99999
};

const localDistDir = 'C:\\xampp\\htdocs\\foodmap\\frontend\\dist';
const remoteDistDir = '/var/www/foodmap/frontend';

async function run() {
    const sftp = new SftpClient();
    try {
        console.log('Conectando SFTP...');
        await sftp.connect(config);
        
        console.log('Subiendo dist...');
        await sftp.uploadDir(localDistDir, remoteDistDir);
        console.log('Subida completa.');
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        sftp.end();
    }
    
    // Y ahora corremos el reemplazo de localhost
    const conn = new Client();
    conn.on('ready', () => {
        console.log('Ejecutando fix localhost...');
        const cmd = 'sed -i "s|http://localhost:4000|http://212.227.146.174:4000|g" /var/www/foodmap/frontend/assets/*.js && sed -i "s|http://localhost:5173|http://212.227.146.174:8080|g" /var/www/foodmap/frontend/assets/*.js';
        conn.exec(cmd, (err, stream) => {
            stream.on('close', () => {
                console.log('Listo.');
                conn.end();
            });
        });
    }).connect(config);
}

run();
