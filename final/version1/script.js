(function(){
    'use strict';
    console.log('running js');
    const startScreen = document.getElementById('startscreen');
    const startBtn = document.getElementById('start');
    const actionArea = document.getElementById('player');
    const game = document.getElementsByClassName('dicearea');
    const playerHealth = document.getElementById("playerhealthleft");
    const cpuHealth = document.getElementById("cpuhealthleft");
    const gameScreen = document.getElementById('gamearea');
    const announcement = document.getElementById('announcement');
    

    const gameData = {
        dice: ['1die.jpg','2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['Mori', 'TwinkleToes'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: [0, 0],
        index: 1,
        health: [20, 20]
    }


    startBtn.addEventListener('click', function(){
        startScreen.className = 'hide';
        gameScreen.className = 'show';
        startTurn();
    });

    function startTurn() {
        checkWinningCondition();
        console.log()
        game[0].innerHTML = ``;
        gameData.rollSum[0] = 0;
        gameData.rollSum[1] = 0;
        throwDice();
        actionArea.innerHTML = '<button id="attack">Attack</button><button id="block">Block</button>';
        document.getElementById('attack').addEventListener('click', function(){
            throwDice();
            attack();
        });
        document.getElementById('block').addEventListener('click', function(){
            throwDice();
            block();
        });
    }

    function block(){

        if (gameData.rollSum[0] < gameData.rollSum[1]){
        gameData.health[0]= gameData.health[0] - (gameData.rollSum[1]-gameData.rollSum[0])+1
        announcement.innerHTML += `<h2>Mori loses ${(gameData.rollSum[1]-gameData.rollSum[0])-1} health!</h2>`;
        }

        else {
            announcement.innerHTML += `<h2>No one loses health</h2>`;
        }

        playerHealth.style.width = `${(gameData.health[0]*5)}%`;
        cpuHealth.style.width = `${(gameData.health[1]*5)}%`;
        setTimeout(startTurn, 2500);
    }

    function attack(){

        if (gameData.rollSum[0] > gameData.rollSum[1]){
            gameData.health[1]= gameData.health[1] - (gameData.rollSum[0]-gameData.rollSum[1])
            announcement.innerHTML += `<h2>Twinkle loses ${gameData.rollSum[0]-gameData.rollSum[1]} health!</h2>`
        }

        else if (gameData.rollSum[0] < gameData.rollSum[1]){
            gameData.health[0]= gameData.health[0] -  (gameData.rollSum[1]-gameData.rollSum[0]);
            announcement.innerHTML += `<h2>Mori loses ${gameData.rollSum[1]-gameData.rollSum[0]} health!</h2>`;
        }

        else {
            announcement.innerHTML += "<h2>It's a draw!</h2>"
        }

        playerHealth.style.width = `${(gameData.health[0]*5)}%`;
        cpuHealth.style.width = `${(gameData.health[1]*5)}%`;
        setTimeout(startTurn, 2500);
    }

    function throwDice(){

        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum[gameData.index] = gameData.roll1 + gameData.roll2;

        if (gameData.index==0){
        game[0].innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}">`;
        game[0].innerHTML += `<img src="images/${gameData.dice[gameData.roll2-1]}">`;
        announcement.innerHTML += `<h2>Mori rolls a ${gameData.rollSum[0]}</h2>`;
        }

        if (gameData.index==1){
            game[1].innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}">`;
            game[1].innerHTML += `<img src="images/${gameData.dice[gameData.roll2-1]}">`;
            announcement.innerHTML = `<h2>Twinkle rolls a ${gameData.rollSum[1]}</h2>`;
        }

        gameData.rollSum[gameData.index] = gameData.roll1 + gameData.roll2;
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    }

    function checkWinningCondition(){
        if (gameData.health[gameData.index] < 1){
            announcement.innerHTML = `<h2>${gameData.players[gameData.index]} loses!`;
            actionArea.innerHTML = '';
        }
        
        else {
            return;
        }
    };

})();