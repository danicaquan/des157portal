(function(){
    'use strict';
    console.log('running js');

    alert("My project is still quite unfinished, especially in regards to styling, so I get that there will be usability issues that is related to positioning, type, etc. I'm still working on those things and adding more images (for example, I am using the dice from my game on! project but want to draw new ones that will fit this theme better). Regardless, feedback and suggestions are appreaciated. Thanks!")
    const startScreen = document.getElementById('startscreen');
    const startBtn = document.getElementById('start');
    const actionArea = document.getElementById('player');
    const game = document.getElementsByClassName('dicearea');
    const playerHealth = document.getElementById("playerhealthleft");
    const cpuHealth = document.getElementById("cpuhealthleft");
    const gameScreen = document.getElementById('gamearea');
    const announcement = document.getElementById('announcement');
    const mori = document.getElementById('mori');
    const rulesBtn = document.getElementById('rules');
    const twinkle = document.getElementById('twinkle');
    const closeBtn = document.getElementById('closerules');
    

    const gameData = {
        dice: ['1die.png','2die.png', '3die.png', '4die.png', '5die.png', '6die.png'],
        players: ['Mori', 'TwinkleToes'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: [0, 0],
        index: 1,
        health: [20, 20]
    }


    if (gameData.health[gameData.index]<0) {
        gameData.health[gameData.index]=0
    }
    
    document.getElementById('quit').addEventListener('click', function(){
        location.reload();
    });
    rulesBtn.addEventListener('click', function(){
        document.querySelector('#overlay').className= 'show';     
    });
    closeBtn.addEventListener('click', function(){
        document.querySelector('#overlay').className= 'hide';     
    });

    document.addEventListener("keydown", function(event){
        const key = event.key;
        if(key === "Escape"){
            document.querySelector('#gameinfo').style.display= 'none';
        }
    })


    startBtn.addEventListener('click', function(){
        startScreen.className = 'hide';
        gameScreen.className = 'show';
        mori.className = 'mori-active';
        twinkle.className = 'twinkle-active';
        startTurn();
    });

    function startTurn() {
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
        gameData.health[0]= gameData.health[0] - (gameData.rollSum[1]-gameData.rollSum[0])
        announcement.innerHTML += `<h2>Mori loses ${(gameData.rollSum[1]-gameData.rollSum[0])} health!</h2>`;
        if (gameData.health[0]<0) {
            gameData.health[0]=0
        }
        injuredMori();
        }

        else {
            announcement.innerHTML += `<h2>No one loses health</h2>`;
        }
        
        
        const playerHealthPercentage = (gameData.health[0]*100)/20;
        const cpuHealthPercentage = (gameData.health[1]*100)/20;
        playerHealth.style.width = `${playerHealthPercentage}%`;
        cpuHealth.style.width = `${cpuHealthPercentage}%`;
        checkWinningCondition();
    }

    function attack(){

        if (gameData.rollSum[0] > gameData.rollSum[1]){
            gameData.health[1]= gameData.health[1] - (gameData.rollSum[0]-gameData.rollSum[1])
            announcement.innerHTML += `<h2>Twinkle loses ${gameData.rollSum[0]-gameData.rollSum[1]} health!</h2>`
            if (gameData.health[1]<0) {
                gameData.health[1]=0
            }
            injuredTwinkle();
        }

        else if (gameData.rollSum[0] < gameData.rollSum[1]){
            gameData.health[0]= gameData.health[0] -  (gameData.rollSum[1]);
            announcement.innerHTML += `<h2>Mori loses ${gameData.rollSum[1]} health!</h2>`;
            if (gameData.health[0]<0) {
                gameData.health[0]=0
            }
            injuredMori();
        }

        else {
            announcement.innerHTML += "<h2>It's a draw!</h2>"
        }


        
        const playerHealthPercentage = (gameData.health[0]*100)/20;
        const cpuHealthPercentage = (gameData.health[1]*100)/20;
        playerHealth.style.width = `${playerHealthPercentage}%`;
        cpuHealth.style.width = `${cpuHealthPercentage}%`;
        playerHealth.innerHTML = `${gameData.health[0]}/20`;
        cpuHealth.innerHTML = `${gameData.health[1]}/20`;
        checkWinningCondition();
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

        else if (gameData.index==1){
            game[1].innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}">`;
            game[1].innerHTML += `<img src="images/${gameData.dice[gameData.roll2-1]}">`;
            announcement.innerHTML = `<h2>Twinkle rolls a ${gameData.rollSum[1]}</h2>`;
        }
        gameData.rollSum[gameData.index] = gameData.roll1 + gameData.roll2;
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    }

    function injuredMori() {
        mori.src="images/hurt-mori.png";
            mori.classList.add('hurt');
            mori.addEventListener('animationend',function(){
                mori.classList.remove('hurt');
                mori.src="images/mori.png";
            });
    }

    function injuredTwinkle() {
        twinkle.src="images/hurt-twinkle.png";
            twinkle.classList.add('hurt');
            twinkle.addEventListener('animationend',function(){
                twinkle.classList.remove('hurt');
                twinkle.src="images/twinkle.png";
            });
    }

    function checkWinningCondition(){
        if (gameData.health[0] == 0){
            announcement.innerHTML = `<h2>Mori loses!</h2>`;
            actionArea.innerHTML = '';
        }

        else if (gameData.health[1] == 0){
            announcement.innerHTML = `<h2>TwinkleToe loses!</h2>`;
            actionArea.innerHTML = '';
        }
        
        else {
            setTimeout(startTurn, 2500);
        }
    };

})();