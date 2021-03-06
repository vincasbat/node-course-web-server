const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, nextm) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {console.log('Unable to append to server log.')}
    } )
nextm();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();

});

app.get('/', (req, res) => {
res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Wolcomo to my website'

});
}
);

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle requestas'
    });
}
);

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    

});
}
);

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});