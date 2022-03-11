//Константы
const area = document.getElementById('game-area'),
content = document.getElementById('content'),
modal = document.getElementById('modal-result'),
overlay = document.getElementById('overlay'),
newGame = document.getElementById('new-game'),
scoreX = document.querySelector('.score-x'),
scoreO = document.querySelector('.score-o'),
sound = new Audio(),
soundWin = new Audio(),
soundNobody = new Audio(),
soundStart = new Audio();
sound.src = './assets/sounds/click.mp3'
soundWin.src = './assets/sounds/end.mp3'
soundStart.src ='./assets/sounds/start.mp3'
soundNobody.src = './assets/sounds/nobody.mp3'

//Переменные
let move = 0,
crossMove = 0,
zeroMove = 0,
result = '',
winnerTable = [],
winnersBoard = document.getElementById('winners-board'),
btn = document.querySelector('.btn'),
power = document.querySelector('.power'),
score = document.querySelector('.score-body')
cell = document.querySelector('.cell')

score.style.display = 'none'
area.style.display = 'none'

//Кнопка включения и её приключения
power.addEventListener('click', e => {
     if(e.target.classList.contains('power')) {
        power.classList.toggle('on')
        power.style.backgroundColor = 'green'
        score.style.display = 'flex'
        soundStart.play()
        area.style.display = 'flex'
        power.style.color = 'red'

        if(e.target.classList.contains('on')){
            power.innerText = 'I'
        } else {
            power.innerText = 'O'
            power.style.backgroundColor = 'rgb(250, 205, 6)'
            score.style.display = 'none'
            area.style.display = 'none'
            location.reload();
        }
    }
})


/* ------------------------------------GAME LOGIC--------------------------------------------------------- */

area.addEventListener('click', e => {
    if(e.target.className = 'cell') {
        if(move % 2 === 0) {
            sound.play();
            e.target.innerHTML = 'X'
            crossMove++
            move++
            scoreX.innerHTML = `X: ${crossMove} turn`
            check();
        } else {
            e.target.innerHTML = 'O';
            sound.play();
            zeroMove++
            move++
            scoreO.innerHTML = `O: ${zeroMove} turn`
            check()
        }
        console.log('Крестики совершили свой: ' + crossMove + ' ход')
        console.log('Нолики совершили свой: ' + zeroMove + ' ход')
    }
})

function check() {
    const cells = document.getElementsByClassName('cell');
    const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i in combinations) {
        if(cells[combinations[i][0]].innerHTML == 'X' && cells[combinations[i][1]].innerHTML == 'X' && cells[combinations[i][2]].innerHTML == 'X') {
            result = 'Crosses';
            win(result)
            soundWin.play();
            save()
        } else if (cells[combinations[i][0]].innerHTML == 'O' && cells[combinations[i][1]].innerHTML == 'O' && cells[combinations[i][2]].innerHTML == 'O') {
            result = 'Zeroes';
            win(result)
            soundWin.play();
            save()
        } else if (move == 9 && result !== 'Zeroes' &&  result !== 'Crosses') {
            result = 'Nobodys'
            win(result);
            soundNobody.play()
            save()
        }   
    }
}
/* ------------------------------------------------------------------------------------------------- */

const win = winner => {
    content.innerHTML = `${winner} win in ${move} moves`
    modal.style.setProperty('display', 'block');
    
}

//Сохраняем победителя в localStorage
function save() {
    if(localStorage.getItem('winners') === null) {
        localStorage.setItem('winners', '[]');
    }
    // Соединяем старых победителей с новыми
    let old_winners = JSON.parse(localStorage.getItem('winners'));
   /*  old_winners.length = 10; */
    old_winners.push(result + ' - win');
    //Сохраняем в локал старых победителей + новых
    localStorage.setItem('winners', JSON.stringify(old_winners))
    if(old_winners.length === 10) {
        localStorage.clear();
    }
    
}

//Просмотр 10 победителей
function view() {
    if(localStorage.getItem('winners') != null) {
        winnerTable = JSON.parse(localStorage.getItem('winners'))
        console.log(winnerTable)
        winnerTable.forEach( (element) => (console.log(element)))
        let ol = document.createElement('ol')
        ol.className = 'winner-list'
        winnersBoard.appendChild(ol)
        //Ограничиваем массив победителей
        winnerTable.length = 10;
        for(let i in winnerTable) {
            //Генерируем список
            let li = document.createElement('li')
            //Заполняем список победителями
            ol.appendChild(li).innerHTML = winnerTable[i]
        }
    }  
}

//Удаляем слушатель после одного клика по победителям
btn.addEventListener("click", view, {once: true});

//Перезагружаем страницу для новой игры
newGame.addEventListener('click', () => {
   location.reload()
}) 

/* -----------------------------Dynamic footer generator------------------------------------- */
let footer = document.createElement('footer'),
divGit = document.createElement('div'),
divScince = document.createElement('div'),
divRs = document.createElement('div'),
rsImg = document.createElement('img'),
a = document.createElement('a');

footer.className = 'footer'
document.body.append(footer)
footer.appendChild(divGit)
footer.appendChild(divScince)
footer.appendChild(divRs)
divGit.className = 'git-hub'
divScince.className = 'science'
divRs.className = 'rs-school'
divScince.innerText = '2022'
divGit.innerHTML = '<a href="https://github.com/Siskinbird">myGitHub</a>'
a.href = 'https://rs.school/'
rsImg.className = 'rs-img'
rsImg.alt = 'rs-school'
rsImg.src = './assets/img/rss.svg'
rsImg.style.width = '122px'
rsImg.style.height = '43px'
rsImg.style.fill = '#f7b500'
divRs.appendChild(rsImg)
a.append(rsImg)
divRs.appendChild(a)
/* ---------------------------------------------------------------------------------------- */