const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 10
let totalHits = 0
let score = 0
let score2 = 0
let perCentMiss = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click', event => {
    totalHits++
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    } else if (!event.target.classList.contains('circle')) {
        score2++
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    perCentMiss = Math.round(score2 * 100 / totalHits)
    perCentHit = Math.round(score * 100 / totalHits)
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h2 class="primary-h2" class=""><div class="primary-div">Результат: </div>
<div>Попаданий: <span class="primary">${score}</span></div>
<div>Процент попаданий: <span class="primary">${perCentHit}%</span></div>
<div>Процент промаха: <span class="primary">${perCentMiss}%</span></div>
<div>Всего выстрелов: <span class="primary">${totalHits}</span></div>
</h2>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    setColor(circle)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

}

function getRandomColor() {
    return `hsla(${Math.random() * 360}, 100%, 50%, 1)`

}