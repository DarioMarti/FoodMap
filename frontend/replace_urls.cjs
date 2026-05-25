const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Reemplazar la URL base por import.meta.env.VITE_API_URL
            content = content.replace(/(["'`])http:\/\/localhost\/foodmap\/backend([^"'`]*)\1/g, (match, quote, pathAfter) => {
                return 'import.meta.env.VITE_API_URL + ' + quote + pathAfter + quote;
            });

            // Reemplazar la URL base por import.meta.env.VITE_API_URL cuando es RAÍZ sin backend
            content = content.replace(/(["'`])http:\/\/localhost\/foodmap\1/g, 'import.meta.env.VITE_APP_URL');
            content = content.replace(/(["'`])http:\/\/localhost\/foodmap\/\1/g, 'import.meta.env.VITE_APP_URL + "/"');


            // Reemplazar http://localhost:3000
            content = content.replace(/(["'`])http:\/\/localhost:3000\/?\1/g, 'import.meta.env.VITE_SOCKET_URL');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    });
}

processDir(path.join(__dirname, 'src'));
console.log('Done replacing frontend URLs.');
