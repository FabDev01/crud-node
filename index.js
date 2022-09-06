require('dotenv').config()
const express = require('express') //!config inicial
const app = express()
const mongoose = require('mongoose') 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const personRoutes = require('./routes/PersonRoutes')


//! forma de ler e enviar JSON / middlewares
app.use(
    express.urlencoded({
       extended: true 
    })
)

app.use(express.json())


//! Rotas da API
app.use('/person', personRoutes) 



//? rota inicial / endpoint
app.get('/', (req, res) => { res.json({ message: 'Oi Express!' }) })

//* entregar uma porta
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.zt6blbg.mongodb.net/bancodaapi?retryWrites=true&w=majority`).then(() => {
    console.log('conectado ao mongoDB')

}).catch(err => {
    console.log('erro ao conectar com o mongoDB')
})
app.listen(3000)

