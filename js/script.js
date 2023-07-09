let btnJogarNovamente = document.querySelector('.jogar-novamente')
let btns = document.querySelectorAll('button.btn-jogar')
let peca = 'x'

function trocarPeca(p) {
    if (p === 'x') {
        peca = 'o'
    } else {
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
    btns.forEach((b) => {
        b.disabled = true
    })
}

function empate() {
    btns.forEach((b) => {
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
    let valoresTabuleiro = []
    let nEmpate = 0
    for (let i = 0; i < 9; i++) {
        valoresTabuleiro.push(btns[i].children[0].innerText)
    }
    // empate
    for (i = 0; i < 9; i++) {
        if (valoresTabuleiro[i] !== '') {
            nEmpate++
        }
    }
    // checar linhas 1, 2 e 3
    for (i = 0; i < 9; i += 3) {
        if (valoresTabuleiro[i] !== '' && valoresTabuleiro[i] === valoresTabuleiro[i + 1] && valoresTabuleiro[i] === valoresTabuleiro[i + 2]) {
            for (let id = i; id <= i + 2; id++) {
                fimDeJogo(btns[id], `em verificação de linhas ${i}`)
            }
            marcarPlacar(btns[i].children[0].innerText, `em verificação de linhas ${i}`)
            nEmpate=0
            break
        }
    }
    // checar colunas 1, 2 e 3
    for (i = 0; i < 3; i++) {
        if (valoresTabuleiro[i] !== '' && valoresTabuleiro[i] === valoresTabuleiro[i + 3] && valoresTabuleiro[i] === valoresTabuleiro[i + 6]) {
            for (id = i; id <= i + 6; id += 3) {
                fimDeJogo(btns[id], `em verificação de colunas ${i}`)
            }
            marcarPlacar(btns[i].children[0].innerText, `em verificação de colunas ${i}`)
            nEmpate=0
            break
        }
    }
    // checando diagonal 0-4-8
    if ((valoresTabuleiro[0] !== '' && valoresTabuleiro[0] === valoresTabuleiro[4] && valoresTabuleiro[0] === valoresTabuleiro[8])) {
        for (id = 0; id < 9; id += 4) {
            fimDeJogo(btns[id], `em verificação de diagonal 0`)
        }
        marcarPlacar(btns[0].children[0].innerText,`em verificação de diagonal 0`)
        nEmpate=0
    }
    // checando diagonal 2-4-6
    if ((valoresTabuleiro[2] !== '' && valoresTabuleiro[2] === valoresTabuleiro[4] && valoresTabuleiro[2] === valoresTabuleiro[6])) {
        for (id = 2; id < 8; id += 2) {
            fimDeJogo(btns[id], `em verificação de diagonal 2`)
        }
        marcarPlacar(btns[2].children[0].innerText,`em verificação de diagonal 2`)
        nEmpate=0
    }
    if (nEmpate === 9) {
        empate()
    }
}


btnJogarNovamente.addEventListener('click', function () {
    btns.forEach((b) => {
        b.classList.remove('marcado')
        b.disabled = false
        b.children[0].innerText = ''
        peca = 'x'
    })
})

btns.forEach((btn) => {
    btn.addEventListener('click', function () {
        marcar(btn)
    })
})