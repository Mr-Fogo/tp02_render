const catalogue = require('./album.json');

const app = require('express')();
const port = 3000;

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(port, () => {
    console.log('Server is running');
    });


app.get('/album', (req, res) => {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);
    if (searchTerm) {
        const filteredCatalogue = catalogue.filter(album => 
            (album.nom && album.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (album.auteur && album.auteur.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        res.json(filteredCatalogue);
    } else {
        res.json(catalogue);
    }
});