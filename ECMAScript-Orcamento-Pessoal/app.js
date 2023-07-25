class Despesas {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null ) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperaTodosRegistros() {

        //array de despesa
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recupera todas as despesas cadastradas em localstorage
        for (let i = 1; i <= id; i++) {

            //recuperas as despesas 
            let despesa = JSON.parse(localStorage.getItem(i))

            //existe a possibilidade de haver indices que foram pulados ou removidos
            //nestes casos nós vamos pular esses indices
            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas

    }

    pesquisar(despesa) {
        console.log(despesa)
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    let despesa = new Despesas(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi Cadastrada com Sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        //dialogo de sucesso
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''


    }else {

        document.getElementById('modal_titulo').innerHTML = 'Erro na Inclusão do Registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na Gravação, Verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        //dialogo de erro
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas() {

    let despesas = Array()

    despesas = bd.recuperaTodosRegistros()

    //seleciona o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    //percorrer o array despesas, listado de forma dinamica
    despesas.forEach(function(d) {
        
        //criando a linha (tr)
        var linha = listaDespesas.insertRow()

        //criar as colunas 
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajusta o tipo
        switch(d.tipo) {
            case '1' : d.tipo = 'alimentação'
                break
            case '2' : d.tipo = 'Educação'
                break
            case '3' : d.tipo = 'lazer'
                break
            case '4' : d.tipo = 'Saúde'
                break
            case '5' : d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        console.log(d)
    })
}

function pesquisarDespesa() {
    
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)

}