const router = require('express').Router();
const Person = require('../models/Person')

router.post('/', async (req, res) => {

    //! req.body requisição 

    const {name, salary, approved} = req.body
   

    //? response

    if(name){
        const person = { name, salary, approved }
    
        try {
            //! criando dados
            await Person.create(person)
            
            res.status(201).json({message: 'created successfull'})
    
        } catch (error) {
            res.status(500).json({error: error})
        }
    }else{
        res.status(422).json({error: 'O nome é Obrigatório'})
    }
})

//! Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//! Read - leitura de dados com path params
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const name = req.params.name
    console.log(`requisição { ${name}, ${id} }`)

    try {
        const person = await Person.findOne({_id : id})
        // const person = await Person.find({_id : id, name: name})
        
        !person ? res.status(422).json({message: 'Usuário não encontrado!' }) : res.status(200).json(person) && console.log(`response ${person}`)


    } catch (error) {
        res.status(500).json({error: error})
    }
})

//! update 
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = { name, salary, approved }

    try {

        const updatePerson = await Person.updateOne({_id: id}, person)
        updatePerson.matchedCount === 0 ? res.status(422).json({message: 'Usuário não atualizado!' }) : res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//! delete

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    
    try {
        const person = await Person.findOne({_id : id})
        !person ? res.status(422).json({message: 'Usuário não encontrado!' }) : await person.deleteOne({_id : id}) && res.status(200).json({message: 'Usuário deletado!'})

        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router