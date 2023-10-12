const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Serve your React app's static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve additional HTML files from the 'LaTeX.wasm' subfolder
app.use('/LaTeX.wasm', express.static(path.join(__dirname, 'public', 'LaTeX.wasm')));

// Serve your React app's HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
