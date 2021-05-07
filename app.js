const express = require('express');
const helmet = require('helmet');

const config = require('./config/config');
const app = express();
app.use(helmet());
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(config.USERS_ROUTE, require('./routes/api/users'));

module.exports = app;
