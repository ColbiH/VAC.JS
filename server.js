const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));
//Hosting the LaTeX.wasm folder allows for iFrame connection to the LaTeX wasm compiler
//This was done early in the project as the scope of migrating the LaTeX.wasm and getting the JS to be friendly with react wasn't in the scope of what the group could accomplish
//Now it has been put in the backlog, but without a major overhaul the only downside is not supporting images. As images have to be defined in the html page of the LaTeX compiler
app.use('/LaTeX.wasm', express.static(path.join(__dirname, 'public', 'LaTeX.wasm')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
