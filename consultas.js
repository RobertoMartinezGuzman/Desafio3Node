require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    allowExitOnIdle: true
})

const agregarPost = async (titulo, url, descripcion) => {
    
    try {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, 0)"
    const values = [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
    } catch (error) {
        throw { code: error.code, message: error.message}
    }
}

const getPosts = async () => {
    try {
    const { rows } = await pool.query("SELECT * from posts");
    console.log(rows);
    return rows;
    } catch (error) {
        throw { code: error.code, message: error.message}
    }
}

//////////////

const getPost = async (id) => {
    try {
      const consulta = 'SELECT * FROM posts WHERE id = $1';
      const { rows } = await pool.query(consulta, [id]);
      console.log(`
        Registro  id ${id} obtenido correctamente
          `);
      return rows;
    } catch (error) {
      throw { code: error.code, message: error.message };
    }
  };
  
  const like = async (id) => {
    try {
      const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id = $1';
      await pool.query(consulta, [id]);
      console.log(`
    Se ha agrego un like a id ${id}
            `);
    } catch (error) {
      throw { code: error.code, message: error.message };
    }
  };
  
  const eliminarPost = async (id) => {
    try {
      const consulta = 'DELETE FROM posts WHERE id = $1';
      await pool.query(consulta, [id]);
      console.log(`
        Se ha eliminado correctamente el registro id ${id}
                `);
    } catch (error) {
      throw { code: error.code, message: error.message };
    }
  };
  
module.exports = { agregarPost, getPosts, getPost, like, eliminarPost }
