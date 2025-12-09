const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const codeMap = {
    'K9X7B2': 'id_cards/Nischal_Basyal.png',
    'M4Q2Z8': 'id_cards/Sambridha_Shrestha.png',
    'R8P1L6': 'id_cards/Mahima_Pathak.png',
    'J6T9E3': 'id_cards/Ishita_Panta.png',
    'B5V4Y9': 'id_cards/Mallika_Rana.png',
    'Q2H7K8': 'id_cards/Dr._Avipsha_Pokhrel.png',
    'X3M8C5': 'id_cards/Sujal_Pandey.png',
    'Z1N4F7': 'id_cards/Priyasha_Devkota.png',
    'U7E3W2': 'id_cards/Jyotishree_Malla.png',
    'A8R6P4': 'id_cards/Prajil_Basnet.png',
    'T5L1X9': 'id_cards/Sairus_Adhikari.png',
    'H2V9D3': 'id_cards/Ashma_Pandey.png',
    'C6Q8M1': 'id_cards/Sauhard_Dahal.png',
    'F9J5R2': 'id_cards/Awani_Nepal.png',
    'W3Y7B8': 'id_cards/Binit_Gurung.png',
    'P2K9T6': 'id_cards/Pavani_Limbu.png',
    'E4S8H5': 'id_cards/Anuska_Acharya.png',
    'P5434G': 'id_cards/Pratik_Gurung.png'
};

// Validate code and return secure image endpoint
app.post('/validate', (req, res) => {
    const { code } = req.body;
    if (!code || code.length !== 6) {
        return res.status(400).json({ success: false, message: 'Invalid code! try again.' });
    }

    if (!codeMap[code]) {
        return res.status(404).json({ success: false, message: 'Invalid code! try again.' });
    }

    return res.json({
        success: true,
        imageUrl: `/id/${code}`
    });
});

// Serve image only if code is valid
app.get('/id/:code', (req, res) => {
    const { code } = req.params;
    const imagePath = codeMap[code];
    if (!imagePath) {
        return res.status(404).send('Image not found');
    }
    res.sendFile(path.join(__dirname, imagePath));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
