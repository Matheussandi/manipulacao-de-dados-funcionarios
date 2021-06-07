const { request, response } = require("express")
const express = require("express")
const uuid = require('uuid')
const func = express()
func.use(express.json())

// middleware
const verificaId = (req, res, next) => {
    const { id } = req.params
    const idFilter = funcionarios.find(funcio => funcio.id === id)
    if (!idFilter) {
        return res
                .status(400)
                .json({ Error: 'Id inexistente'})
    }
    console.log(idFilter)
    return next()
}

const veficaCadastro = (req, res, next) => {
    const { nome, funcao, departamento, email, telefone } = req.body
    if (!nome || !funcao || !departamento || !email || !telefone) {
        return res
                .status(400)
                .json({ Error: 'Não existe um dos campos'})
    }
    return next()
}

let funcionarios = []

// Adiciona funcionário
func.post('/funcionarios', veficaCadastro, (req, res) => {
    const { nome, funcao, departamento, email, telefone } = req.body
    const dadosFuncionarios = {
        id: uuid.v4(),
        nome,
        funcao,
        departamento,
        email,
        telefone
    }
    funcionarios = [...funcionarios, dadosFuncionarios]
    return res
            .status(200)
            .json(dadosFuncionarios)
})

// Lista todos funcionários
func.get('/funcionarios', (req, res) => {
    return res 
            .status(200)
            .json(funcionarios)
})

// Lista funcionário pelo id
func.get('/funcionarios/:id', verificaId, (req, res) => {
    const { id } = req.params
    const idFilter = funcionarios.filter(funcio => funcio.id === id)
    return res 
            .status(200)
            .json(idFilter)
})

// Exclui funcionário
func.delete('/funcionarios/:id', verificaId, (req, res) => {
    const { id } = req.params
    let i = funcionarios.findIndex(funcio => funcio.id === id)
    console.log(i)
    console.log(funcionarios[i])
    funcionarios.splice(i, 1)
    return res
            .status(200)
            .json({message: 'Funcionário excluído com sucesso'})
})

// Altera funcionário
func.put('/funcionarios/:id', verificaId, veficaCadastro, (req, res) => {
    const { nome, funcao, departamento, email, telefone } = req.body
    const { id } = req.params
    let i = funcionarios.findIndex(funcio => funcio.id === id)
    const dadosFuncionarios = {
        id,
        nome,
        funcao,
        departamento,
        email,
        telefone
    }
    funcionarios.splice(i, 1, dadosFuncionarios)
    return res
            .status(200)
            .json(dadosFuncionarios)
})


func.listen(3333, () => {
    console.log('Rodando !!!')
})