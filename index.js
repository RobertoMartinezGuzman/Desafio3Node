const { agregarPost, getPosts } = require('./consultas')
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')

app.use(express.json())

app.listen(3000, console.log('Servidor encendido en el Puerto 3000'))

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/posts", async (req, res) => {
    const posts = await getPosts()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    const { titulo, url, descripcion } = req.body
    const resultado = await agregarPost(titulo, url, descripcion)
    res.json(resultado)
    console.log('Post agregado correctamente')
    res.send('Post agregado con exito')
})