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
    btn.classList.add('marcado')
    btn.disabled = true
    btn.children[0].innerText = peca
    trocarPeca(peca)
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