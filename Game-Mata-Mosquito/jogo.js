
var altura = 0
var largura = 0

function ajustaTamanhoPalcoJogo(){

     altura = window.innerHeight
     largura = window.innerWidth

    //console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

function posicaoRondomica() {

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    // Cria o Elemento HTML

    var mosca = document.createElement('img')
    mosca.src = '../Game-Mata-Mosquito/imagens/mosca.png'
    mosca.className = tamanhoAleatorio()
    mosca.style.left = posicaoX + 'px'
    mosca.style.top = posicaoY + 'px'
    mosca.style.position = 'absolute'

    document.body.appendChild(mosca)

}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)
    
    switch(classe) {
        case 0:
            return 'mosca'
        
        case 1:
            return 'mosca1'

        case 2:
            return 'mosca2'
    }
}