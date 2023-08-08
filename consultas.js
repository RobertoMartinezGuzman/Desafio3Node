const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'minirob28',
    database: 'likeme',
    port: '5432',
    allowExitOnIdle: true
})

const agregarPost = async (titulo, url, descripcion) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)"
    const values = [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
}

const getPosts = async () => {
    const { rows } = await pool.query("SELECT * from posts");
    console.log(rows);
    return rows;
}

module.exports = { agregarPost, getPosts }