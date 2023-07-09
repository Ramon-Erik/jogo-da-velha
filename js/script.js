const btnJogarNovamente = document.querySelector('.jogar-novamente')
const pecasJogadas = document.querySelectorAll('button.btn-jogar')
let peca = 'o'

trocarPeca(peca)

function trocarPeca(p) {
    if (p === 'x') {
        document.querySelector('.btn-x').classList.remove('peca-atual')
        document.querySelector('.btn-o').classList.add('peca-atual')
        peca = 'o'
    } else {
        document.querySelector('.btn-o').classList.remove('peca-atual')
        document.querySelector('.btn-x').classList.add('peca-atual')
        peca = 'x'
    }
}

function marcar(btn) {
    btn.disabled = true
    btn.children[0].innerText = peca
    trocarPeca(peca)
    examinarTabuleiro()
}

function fimDeJogo(btn, c) {
    btn.classList.add('marcado')
    pecasJogadas.forEach((b) => {
        b.disabled = true
    })
}

function empate() {
    pecasJogadas.forEach((b) => {
        b.classList.add('marcado')
        b.disabled = true
    })
}

function marcarPlacar(peca, call) {
    switch (peca) {
        case 'x':
            let placarX = document.querySelector('.placar-x')
            placarX.innerText = Number(placarX.innerText) + 1
            break;
        case 'o':
            let placarO = document.querySelector('.placar-o')
            placarO.innerText = Number(placarO.innerText) + 1
            break;
        default:
            alert('Erro ao somar placar. contate o desenvolvedor.')
            console.log('erro ao incrementar o placar de ' + peca)
            break;
    }
}

function examinarTabuleiro() {
    let pecasNoTabuleiro = []
    // contadores nos loops
    let i = 0
    let id = 0
    let nEmpate = 0
    for (let i = 0; i < 9; i++) {
        pecasNoTabuleiro.push(pecasJogadas[i].children[0].innerText)
    }
    // empate
    for (i = 0; i < 9; i++) {
        if (pecasNoTabuleiro[i] !== '') {
            nEmpate++
        }
    }
    // checar linhas 1, 2 e 3
    for (i = 0; i < 9; i += 3) {
        if (pecasNoTabuleiro[i] !== '' && pecasNoTabuleiro[i] === pecasNoTabuleiro[i + 1] && pecasNoTabuleiro[i] === pecasNoTabuleiro[i + 2]) {
            for (id = i; id <= i + 2; id++) {
                fimDeJogo(pecasJogadas[id], `em verificação de linhas ${i}`)
            }
            marcarPlacar(pecasJogadas[i].children[0].innerText, `em verificação de linhas ${i}`)
            nEmpate=0
            break
        }
    }
    // checar colunas 1, 2 e 3
    for (i = 0; i < 3; i++) {
        if (pecasNoTabuleiro[i] !== '' && pecasNoTabuleiro[i] === pecasNoTabuleiro[i + 3] && pecasNoTabuleiro[i] === pecasNoTabuleiro[i + 6]) {
            for (id = i; id <= i + 6; id += 3) {
                fimDeJogo(pecasJogadas[id], `em verificação de colunas ${i}`)
            }
            marcarPlacar(pecasJogadas[i].children[0].innerText, `em verificação de colunas ${i}`)
            nEmpate=0
            break
        }
    }
    // checando diagonal 0-4-8
    if ((pecasNoTabuleiro[0] !== '' && pecasNoTabuleiro[0] === pecasNoTabuleiro[4] && pecasNoTabuleiro[0] === pecasNoTabuleiro[8])) {
        for (id = 0; id < 9; id += 4) {
            fimDeJogo(pecasJogadas[id], `em verificação de diagonal 0`)
        }
        marcarPlacar(pecasJogadas[0].children[0].innerText,`em verificação de diagonal 0`)
        nEmpate=0
    }
    // checando diagonal 2-4-6
    if ((pecasNoTabuleiro[2] !== '' && pecasNoTabuleiro[2] === pecasNoTabuleiro[4] && pecasNoTabuleiro[2] === pecasNoTabuleiro[6])) {
        for (id = 2; id < 8; id += 2) {
            fimDeJogo(pecasJogadas[id], `em verificação de diagonal 2`)
        }
        marcarPlacar(pecasJogadas[2].children[0].innerText,`em verificação de diagonal 2`)
        nEmpate=0
    }
    if (nEmpate === 9) {
        empate()
    }
}

btnJogarNovamente.addEventListener('click', function () {
    pecasJogadas.forEach((b) => {
        b.classList.remove('marcado')
        b.disabled = false
        b.children[0].innerText = ''
    })
    trocarPeca(peca)
})

pecasJogadas.forEach((btn) => {
    btn.addEventListener('click', function () {
        marcar(btn)
    })
})