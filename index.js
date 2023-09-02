const { agregarPost, getPosts, getPost, like, eliminarPost} = require('./consultas')
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')

app.use(express.json())

app.disable('x-powered-by');

app.listen(3000, console.log('Servidor encendido en el Puerto 3000'))
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/posts", async (req, res) => {
    try {
    const posts = await getPosts()
    res.json(posts)
    } catch(error) {
      console.error(`
      Se produjo un error -> Error (${error.code}): ${error.message}
    `);
    res.status(500).send('Error en Servidor');
  }
})

app.post("/posts", async (req, res) => {
    try {
    const { titulo, url, descripcion } = req.body
    const resultado = await agregarPost(titulo, url, descripcion)
    res.json(resultado)
    console.log('Post agregado correctamente')
    } catch(error) {
      console.error(`Se produjo un error -> Error (${error.code}): ${error.message}
      `);
      res.status(500).send('Error en Servidor');
    }
})

/////////////////////////////////////////////////////////////

app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await getPost(id);
    res.json(resultado);
  } catch (error) {
    console.error(`
     Se produjo un error -> Error (${error.code}): ${error.message}
    `);
    res.status(500).send('Error en Servidor');
  }
});


app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params;
  try {
    await like(id);
    res.send(`Se agrego un like`);
  } catch (error) {
    console.error(`
    Se produjo un error -> Error (${error.code}): ${error.message}
    `);
    res.status(500).send('Error en Servidor');
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarPost(id);
    return res.send('Se elimino post');
  } catch (error) {
    console.error(`
    Se produjo un error -> Error (${error.code}): ${error.message}
    `);
    res.status(500).send('Error en Servidor');
  }
});
