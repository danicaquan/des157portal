(function(){
    'use strict';
    console.log('running js');

    (function(d) {
        var config = {
          kitId: 'acj2zyu',
          scriptTimeout: 3000,
          async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);

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
    const quitBtn = document.getElementById('quit');
    const dialogueBox = document.getElementById('dialoguebox');
    const dialogueBoxText = document.getElementById('dialogueboxtext');
    const diceRollSound = new Audio('audio/diceRoll.mp3');
    const hitSound = new Audio('audio/hit.mp3');
    const loseSound = new Audio('audio/lose.mp3');
    const winSound = new Audio('audio/win.mp3');
    const btnClick = new Audio('audio/click.mp3');
    const startClick = new Audio('audio/startClick.mp3');
    diceRollSound.volume = 0.2;
    hitSound.volume = 0.2;
    loseSound.volume = 0.2;
    winSound.volume = 0.2;
    btnClick.volume = 0.1;
    startClick.volume = 0.1;
    

    const gameData = {
        dice: ['1die.png','2die.png', '3die.png', '4die.png', '5die.png', '6die.png'],
        players: ['Mori', 'TwinkleToes'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: [0, 0],
        index: 1,
        health: [30, 20]
    }

    const dialogue = [
        '<h3>Mori</h3> <p>> For the last time Kender, stop trying to steal from me or I will chop off your hands<p>',
        '<h3>TwinkleToes SoftTread</h3> <p>> Whatever could you mean? I was not stealing!<p>',
        '<h3>Mori</h3> <p>> Yes, you were! I caught you red-handed with your grubby paws in my bag! Taking my rope! I need all 50 feet of that!<p>',
        '<h3>TwinkleToes SoftTread</h3> <p>> No, no. You misunderstand me. I was merely trying to hold onto your rope to keep it safe for you! That is what friends do for one another, and you are one of my best friends!<p>',
        '<h3>Mori</h3> <p>> For the last time: WE. ARE. NOT. FRIENDS. Ayre, please help me out!<p>',
        '<h3>Ayre</h3> <p>> ...<p>',
        '<h3>Ayre</h3> <p>> How about...<p>'
    ]

    dialogueBox.className='show';

    let currentText = 0;
    dialogueBoxText.innerHTML=`${dialogue[currentText]}`

    function nextText(){
        currentText++;

        if (currentText > dialogue.length-1) {
            dialogueBox.className='hide';
            document.querySelector('#startscreen h1').style.opacity= '100%';
        }
        else {
        dialogueBoxText.innerHTML = `${dialogue[currentText]}`;
    }
    };
    window.addEventListener('click', nextText)

    document.querySelector('#skipbutton').addEventListener('click', function(){
        btnClick.play();
        dialogueBox.className='hide';
            document.querySelector('#startscreen h1').style.opacity= '100%';
    });
    
    quitBtn.addEventListener('click', function(){
        btnClick.play();
        location.reload();
    });
    rulesBtn.addEventListener('click', function(){
        startClick.play();
        document.querySelector('#overlay').className= 'show';     
    });
    closeBtn.addEventListener('click', function(){
        btnClick.play();
        document.querySelector('#overlay').className= 'hide';     
    });

    document.addEventListener("keydown", function(event){
        const key = event.key;
        if(key === "Escape"){
            btnClick.play();
            document.querySelector('#gameinfo').style.display= 'none';
        }
    })


    startBtn.addEventListener('click', function(){
        startClick.play();
        document.getElementById('startscreenimg').src='images/rules-start.png';
        document.querySelector('#startscreen h1').innerHTML= 'Would you like for me to explain the rules?';
        document.getElementById('buttonsection').innerHTML = '<button id=openrules>Yes</button><button id=startgame>No</button>';
        document.getElementById('startgame').addEventListener('click', function(){
            btnClick.play();
            beginGame();
        });
        document.getElementById('openrules').addEventListener('click', function(){
         btnClick.play();
         document.querySelector('#overlay').className= 'show'; 
         
    closeBtn.addEventListener('click', function(){
        btnClick.play();
        document.querySelector('#overlay').className= 'hide';  
        beginGame();   
    });
        });


    });

    function beginGame(){
        startScreen.className = 'hide';
        gameScreen.className = 'show';
        mori.className = 'mori-active';
        twinkle.className = 'twinkle-active';

        document.getElementById('controlmenu').classList='show'
        startTurn();
    }

    function startTurn() {
        console.log()
        game[0].innerHTML = ``;
        gameData.rollSum[0] = 0;
        gameData.rollSum[1] = 0;
        throwDice();
        actionArea.innerHTML = '<button id="attack">Attack &#9876;</button><button id="block">Block &#128737</button>';
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
        announcement.innerHTML += `<h2>> Mori loses ${(gameData.rollSum[1]-gameData.rollSum[0])} health!</h2>`;
        if (gameData.health[0]<0) {
            gameData.health[0]=0
        }
        hitSound.play();
        injuredMori();
        }

        else {
            announcement.innerHTML += `<h2>> No one loses health!</h2>`;
        }
        
        
        const playerHealthPercentage = (gameData.health[0]*100)/30;
        const cpuHealthPercentage = (gameData.health[1]*100)/20;
        playerHealth.style.width = `${playerHealthPercentage}%`;
        cpuHealth.style.width = `${cpuHealthPercentage}%`;
        playerHealth.innerHTML = `<p>${gameData.health[0]}/30</p>`;
        cpuHealth.innerHTML = `<p>${gameData.health[1]}/20</p>`;
        checkWinningCondition();
    }

    function attack(){

        if (gameData.rollSum[0] > gameData.rollSum[1]){
            gameData.health[1]= gameData.health[1] - (gameData.rollSum[0]-gameData.rollSum[1])
            announcement.innerHTML += `<h2>> Twinkle loses ${gameData.rollSum[0]-gameData.rollSum[1]} health!</h2>`
            if (gameData.health[1]<0) {
                gameData.health[1]=0
            }

            hitSound.play();
            injuredTwinkle();
        }

        else if (gameData.rollSum[0] < gameData.rollSum[1]){
            gameData.health[0]= gameData.health[0] -  (gameData.rollSum[1]);
            announcement.innerHTML += `<h2>> Mori loses ${gameData.rollSum[1]} health!</h2>`;
            if (gameData.health[0]<0) {
                gameData.health[0]=0
            }

            hitSound.play();
            injuredMori();
        }

        else {
            announcement.innerHTML += "<h2>> It's a draw!</h2>"
        }


        
        const playerHealthPercentage = (gameData.health[0]*100)/30;
        const cpuHealthPercentage = (gameData.health[1]*100)/20;
        playerHealth.style.width = `${playerHealthPercentage}%`;
        cpuHealth.style.width = `${cpuHealthPercentage}%`;
        playerHealth.innerHTML = `<p>${gameData.health[0]}/30</p>`;
        cpuHealth.innerHTML = `<p>${gameData.health[1]}/20</p>`;
        checkWinningCondition();
    }

    function throwDice(){
        diceRollSound.play();
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum[gameData.index] = gameData.roll1 + gameData.roll2;

        if (gameData.index==0){
        game[0].innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}">`;
        game[0].innerHTML += `<img src="images/${gameData.dice[gameData.roll2-1]}">`;
        announcement.innerHTML += `<h2>> Mori rolls a ${gameData.rollSum[0]}</h2>`;
        }

        else if (gameData.index==1){
            game[1].innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}">`;
            game[1].innerHTML += `<img src="images/${gameData.dice[gameData.roll2-1]}">`;
            announcement.innerHTML = `<h2>> Twinkle rolls a ${gameData.rollSum[1]}</h2>`;
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
            loseSound.play();
            announcement.innerHTML = `<h2>Mori loses!</h2> <button id="resetgame">Play Again?</button>`;
            actionArea.innerHTML = '';
            game[1].innerHTML = '';
            document.getElementById('resetgame').addEventListener('click',function(){
                btnClick.play();
                location.reload();
            });

    }
        else if (gameData.health[1] == 0){
            winSound.play();
            announcement.innerHTML = `<h2>TwinkleToe loses!</h2><button id="resetgame">Play Again?</button>`;
            actionArea.innerHTML = '';
            game[1].innerHTML = '';
            //Confetti script is not mine! It would take too long to figure it out myself so I used an online resource.
            startConfetti();
            setTimeout(stopConfetti, 2500);
            document.getElementById('resetgame').addEventListener('click',function(){
                btnClick.play();
                location.reload();
            });
        }
        
        else {
            setTimeout(startTurn, 2500);
        }
        
    };

})();