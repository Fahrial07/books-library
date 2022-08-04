const express = require('express');
const routes = require('./routes/index.route');

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

//connected routes
app.use(routes);

app.listen( port, () => {
    console.log(`Server is running on port ${port}`);
});

