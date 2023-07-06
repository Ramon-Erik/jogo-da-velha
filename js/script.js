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

function examinarTabuleiro() {
    let valoresTabuleiro = []
    for (let i = 0; i < 9; i++) {
        valoresTabuleiro.push(btns[i].children[0].innerText)
    }
    // checar linhas 1, 2 e 3
    for (let i = 0; i < 9; i+=3) {
        if (valoresTabuleiro[i] !== '' && valoresTabuleiro[i] === valoresTabuleiro[i+1] && valoresTabuleiro[i] === valoresTabuleiro[i+2]) {
            console.log(`Examinando linha ${i}: ${valoresTabuleiro[i]} - ${valoresTabuleiro[i+1]} - ${valoresTabuleiro[i+2]}`)
            for (let id = i; id <= i+2; id++) {
                btns[id].classList.add('marcado')
            }
            break
        }
    }
    // checar colunas 1, 2 e 3
    for (let i = 0; i < 3; i++) {
        if (valoresTabuleiro[i] !== '' &&
        valoresTabuleiro[i] === valoresTabuleiro[i+3] &&
        valoresTabuleiro[i] === valoresTabuleiro[i+6]) {
            console.log(`Examinando coluna ${i}: ${valoresTabuleiro[i]} - ${valoresTabuleiro[i+3]} - ${valoresTabuleiro[i+6]}`)
            for (let id = i; id <= i+6; id+=3) {
                btns[id].classList.add('marcado')
            }
            break
        }
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