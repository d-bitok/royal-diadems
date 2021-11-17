const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// Upload Link
app.post('/upload', (res, req) => {
    let file = req.files.image;
    let date = new Date();

    // Image Name
    let img_name = date.getDate() + date.getTime() + file.name;

    // Image Upload Path
    let path = 'public/uploads/' + img_name;

    // Create Upload
    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            // Image Upload Path
            res.json(`uploads/${img_name}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('Listening on Port : 3000')
})