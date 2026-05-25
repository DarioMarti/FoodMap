const SftpClient = require('ssh2-sftp-client');

const config = {
    host: '212.227.146.174',
    port: 22,
    username: 'root',
    password: 'bLh9Mfj4kraagyT',
    readyTimeout: 99999
};

async function run() {
    const sftp = new SftpClient();
    try {
        console.log('Conectando SFTP para subir backend...');
        await sftp.connect(config);
        
        console.log('Subiendo comprobar_sesion.php...');
        await sftp.fastPut('C:\\\\xampp\\\\htdocs\\\\foodmap\\\\backend\\\\modelos\\\\sesion\\\\comprobar_sesion.php', '/var/www/foodmap/backend/modelos/sesion/comprobar_sesion.php');
        
        console.log('Subiendo obtener_sesion.php...');
        await sftp.fastPut('C:\\\\xampp\\\\htdocs\\\\foodmap\\\\backend\\\\modelos\\\\sesion\\\\obtener_sesion.php', '/var/www/foodmap/backend/modelos/sesion/obtener_sesion.php');
        
        console.log('Subida de backend completa.');
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        sftp.end();
    }
}

run();
