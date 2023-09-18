// configurando servidor
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const axios = require('axios');

// renderizando index.html
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

const imagePath = '/templates/kytos-logov2.png';

app.get('/imagem', (req, res) => {
    res.sendFile(__dirname + imagePath + 'kytos-logov2.png');
});
// definindo rota padrao e porta
app.use('/',router);
app.listen(process.env.port || 3000, () => {
console.log('Sistema funcionando')
});

// chamadas kytos
app.get('/rota-kytos', async (req, res) => {
    try {
        const response = await axios.get('0.00.0:8181');
        res.send(response.data);
    } catch (error) {
        console.error('Erro ao conectar ao kytos:', error);
        res.status(500).send('Erro ao conectar ao kytos.');
    }
});

