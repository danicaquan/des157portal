(function(){
    'use strict';
    console.log('running js');

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementsByClassName('gamearea')
    const playerScore = document.getElementById('playerscore');
    const cpuScore = document.getElementById('cpuscore');
    const actionArea = document.getElementById('actions');
    const announcement =document.getElementById('announcement')
    const infoBtn = document.getElementById('openinfo');
    const playerArea = document.getElementById('player')
    const cpuArea = document.getElementById('cpu');

    const diceRollSound = new Audio('audio/diceRoll.mp3');
    diceRollSound.volume = 0.2;
    

    infoBtn.addEventListener('click', function(){
        document.querySelector('#gameinfo').style.display= 'block';     
    });

    document.addEventListener("keydown", function(event){
        const key = event.key;
        if(key === "Escape"){
            document.querySelector('#gameinfo').style.display= 'none';
        }
    })

    const gameData = {
        dice: ['1die.png','2die.png', '3die.png', '4die.png', '5die.png', '6die.png'],
        players: ['Player 1', 'the House'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30
    }

    startGame.addEventListener('click', function(){
        document.querySelector('#scoreboard').style.display = 'flex';
        gameData.index = Math.round(Math.random());
        gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.innerHTML += '<button id="quit">Quit?</button>';
        gameControl.className = 'controlquit';
        document.querySelector('h1').style.display= 'none'; 
        
        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });
        //console.log(gameData.index);
        //console.log('set up the turn');
        setUpTurn();
    });

    function setUpTurn(){
        announcement.innerHTML = `<p>Rolling the dice for ${gameData.players[gameData.index]}</p>`;
        

        if (gameData.index == 0){
        playerArea.className='activeplayer';
        cpuArea.className='nonactiveplayer'
        actionArea.innerHTML = '<button id="roll">Roll The Dice</button>';
        document.getElementById('roll').addEventListener('click', function(){
            //console.log('roll the dice!');
            throwDice();
        });
        }
        else if (gameData.index == 1){

        cpuArea.className='activeplayer';
        playerArea.className='nonactiveplayer';
                if (gameData.score[gameData.index] < gameData.gameEnd){
                    setTimeout(throwDice, 1000);;
                }
                else {
                    checkWinningCondition();
                }
            }
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game[gameData.index].innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        diceRollSound.play();
        if (gameData.index==0){
        game[0].innerHTML += `<img src="images/${gameData.dice[gameData.roll1-1]}">`;
        game[0].innerHTML += `<img src="images/${gameData.dice[gameData.roll2-1]}">`;
        }
        if (gameData.index==1){
            game[1].innerHTML += `<img src="images/${gameData.dice[gameData.roll1-1]}">`;
            game[1].innerHTML += `<img src="images/${gameData.dice[gameData.roll2-1]}">`;
            }
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if (gameData.rollSum == 2){
            announcement.innerHTML += `<p>Oh snap! ${gameData.players[gameData.index]} rolled Snake Eyes!</p>`;
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2000);
            showCurrentScore();
        }
        else if (gameData.roll1 == 1 || gameData.roll2 == 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            announcement.innerHTML += `Sorry, one of your rolls was a 1. Switching to ${gameData.players[gameData.index]}`;
            setTimeout(setUpTurn, 2000);
        }

        else {
            if (gameData.index == 0) {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
        }
            if (gameData.index == 1) {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            setTimeout(setUpTurn, 2000);
            }
        }
            checkWinningCondition();

        }

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd){
            announcement.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';

            document.querySelector('#gamecontrol h2').innerHTML = 'The game has concluded';
            document.getElementById('quit').innerHTML = "Start a New Game?"

            showCurrentScore();
        }
        else {
            showCurrentScore();
        }
    };

    function showCurrentScore(){
        playerScore.innerHTML = `<p>Your score is currently <strong>${gameData.score[0]}</strong>`; 
        cpuScore.innerHTML = `The House's score is <strong>${gameData.score[1]}</strong></p>`;
    };

})();