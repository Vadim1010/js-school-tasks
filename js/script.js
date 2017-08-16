var games = {
    pause: false,
    points: 0,
    time: 60,
    users: [],


};

function User(name, pointer) {
    this.name = name;
    this.pointer = pointer
}


(function () {
    var start = document.getElementsByClassName('start')[0],
        field = document.getElementsByClassName('game__field')[0],
        points = document.getElementsByClassName('points__result')[0],
        newGames = document.getElementsByClassName('new-games')[0];

    start.addEventListener('click', function (e) {
        if(e.target.value === 'start') {
            e.target.value = 'pause';
            startGame();
            games.pause = true;
        } else if (e.target.value === 'pause'){
            e.target.value = 'start';
            clearInterval(games.timer);
            clearInterval(games.repite);
            games.pause = false;
        }
    })

    field.addEventListener('click', function (e) {
        if(e.target.localName === 'span') {
            if(games.pause) {
                e.target.parentNode.removeChild(e.target);
                games.points += 1
                points.innerHTML = games.points;
            } else {
                alert('Pause');
            }

        }
    });

    newGames.addEventListener('click', newGame);

})()

function startGame() {
    games.timer = window.setInterval(timer, 1000)

    games.repite = window.setInterval(createDiv, 500);
}

function timer() {
    var time = document.getElementsByClassName('time__result')[0];
    time.innerHTML = games.time

    if(time.innerHTML > 0) {
        games.time -= 1;
    } else {
        saveResalt(games.points);
        
        newGame();
    }
}

function saveResalt (value) {
    var result = prompt('Your score: '+ value);

    if (result !== null) {
        games.users.push(new User(result, value));

        showTheWinner(result, value);
    }
}

function showTheWinner (name, value) {
    var ul = document.getElementsByClassName('result__list')[0],
        li = document.createElement('li');

    li.innerHTML = name + ': ' + value + ' pointers';
    ul.appendChild(li);
}

function newGame() {
    var  field = document.getElementsByClassName('game__field')[0],
        points = document.getElementsByClassName('points__result')[0],
        start = document.getElementsByClassName('start')[0],
        time = document.getElementsByClassName('time__result')[0];

   if(field.childNodes.length > 0) {
       clearInterval(games.repite);
       clearInterval(games.timer);

       field.childNodes[0].parentNode.removeChild( field.childNodes[0]);

       newGame();
   } else {
       start.value = 'start';
       games.pause = false;
       games.points = 0;
       games.time = 60;
       points.innerHTML = games.points;
       time.innerHTML = '01:00';
   }
}


function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createDiv() {
    var field = document.getElementsByClassName('game__field')[0],
        div = document.createElement('span'),
        rgb ='rgb('+ getRandomInt(0, 255) +','+ getRandomInt(0, 255) +','+ getRandomInt(0, 255) +')',
        size = getRandomInt(50, 150),
        maxWidth = window.innerWidth - (window.innerWidth /100 * 18.7) - size,
        maxheight = 600 - size,
        positionX = getRandomInt(0, maxWidth),
        positionY = getRandomInt(0, maxheight);

    div.style.display = 'block';
    div.style.background = rgb;
    div.style.height = size + 'px';
    div.style.width = size + 'px';
    div.style.position = 'absolute';
    div.style.left = positionX + 'px';
    div.style.top = positionY + 'px';

    field.appendChild(div);
}