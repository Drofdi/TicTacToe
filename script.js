"use strict";

let gameDivs = document.querySelectorAll('.game_div')
let winnerDiv = document.querySelector('.winner')
let restartButton = document.querySelector('.restart')
let current = document.querySelector('.currentMove')


startGame(gameDivs)

restartButton.addEventListener('click', reload)

function startGame(gameDivs){
    let i = 0

    for(let gameDiv of gameDivs){
        gameDiv.addEventListener('click', function swithElems(){
            if (victory(gameDivs)){
                this.innerHTML = ''
            } else if (i % 2 !== 0){
                this.innerHTML = '0'
                winnerDiv.innerHTML = 'Текущий ход: Х'
            } else if (i % 2 === 0){
                this.innerHTML = 'X'
                winnerDiv.innerHTML = 'Текущий ход: 0'
            }
            gameDiv.removeEventListener('click',swithElems)

            let lastMove
            if (this.innerHTML != ''){
                lastMove = this.innerHTML
            } else if (i % 2 === 0) {
                lastMove = 'X'
            } else {
                lastMove = '0'
            }

            if(victory(gameDivs)){
                return winnerDiv.innerHTML = `Победитель: ${lastMove}!`
            }

            if(isDraw(gameDivs)){
                return  winnerDiv.innerHTML = 'Ничья'
            }
            i++
        })
    }
}

function reload(){
    location.reload()
}

function victory(gameDivs){
    let winCombinations = [
		[0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
		[3, 4, 5],
		[6, 7, 8],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
	];
    for(let comb of winCombinations){
        if (gameDivs[comb[0]].innerHTML === gameDivs[comb[1]].innerHTML &&
            gameDivs[comb[1]].innerHTML === gameDivs[comb[2]].innerHTML &&
            gameDivs[comb[0]].innerHTML != '') {
            gameDivs[comb[0]].classList.add('winLine')
            gameDivs[comb[1]].classList.add('winLine')
            gameDivs[comb[2]].classList.add('winLine')
            return true
        }
    }
 return false
}

function isDraw(gameDivs){
    for(let div of gameDivs){
        if (div.innerHTML == ''){
            return false
        }
    }
    return true
}
