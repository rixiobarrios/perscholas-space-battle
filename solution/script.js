const enemyHull = document.querySelector("#enemyHull");
const enemyFirePower =  document.querySelector("#enemyFirePower");
const enemyAccuracy =  document.querySelector("#enemyAccuracy");
const enemyName = document.querySelector("#enemyName");
const enemyImage = document.querySelector("#enemyImage");

const playerHull = document.querySelector("#playerHull");
const playerirePower =  document.querySelector("#playerFirePower");
const playerAccuracy =  document.querySelector("#playerAccuracy");
const playerName = document.querySelector("#playerName");
const playerImage = document.querySelector("#playerImage");

const bullet = document.querySelector(".bullet");





const gameStates = {
    start:'start',
    attack: 'attack',
    takeDamage: 'takeDamage',
    retreat: 'retreat',
    gameOver: 'gameOver',
    gameRestart: 'gameRestart'
};

const pMissMessages = [
    "You are out of Luck!",
    "Calibrating beam turret!",
    "Aim A Little Higher, please!",
    "I'm very unhappy!",
    'You must be joking!',
    'Ludicrous!',
    'Annoying!',
    'Can I win this game, please?',
    'What if I press the backtick key?',
    'At this rate, I will go down in flames',
    'This that the second, or third time?'
]

const shipNames = [
    'USS Schwarzenegger',
    'LWSS Wolf',
    'Destiny',
    'CS Nero',
    'SS Blade',
    'ISS Typhoon',
    'Pyrrhus',
    'Kingfisher',
    'Spectrum',
    'ISS Liberty',
    'Harpy',
    'CS Exploration',
    'BS Templar',
    'HWSS Pursuit',
    'Event Horizon',
    'LWSS Valiant',
    'HWSS Nexus',
    'HWSS Lion',
    'The Promise',
    'Stargazer'
    ];

let message = "";
let popupBoxType = "";
let gameState = gameStates.start;
let defalutPlayerHull = 20;
const alienFleet = [];
const numberOfEnimeis = 6;
let playerSelection = null;
let debug = true;









function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive 
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  

class ship  {
    constructor(name, hull, firePW, acc){
        this.name = name;
        this.hull = hull;
        this.firePW = firePW;
        this.acc = acc
    };
    setHull(value){
        this.hull = value;
    };
    setFirePW(value){
        this.firePW = value;
    };
    setAcc(value){
        this.acc = value;
    };
    getHull (){
        return this.hull;
    };
    getFirePower () {
        return this.firePW;
    };
    getAccuracy (){
        return this.acc;
    };
    takeDamage(value){
        console.log(this.hull);
        console.log("This the damage points " + value);
        this.hull -= value;
        console.log(this.hull);
    }

}

const player = new ship('uss',defalutPlayerHull, 5, .7);

function updatePlayerStatus(){
    playerHull.textContent = "Hull :" +  player.getHull();
    playerirePower.textContent = "Fire Power : " + player.getFirePower();
    playerAccuracy.textContent = "Accuracy : " + player.getAccuracy();
}

function updateEnemyStatus(){
    enemyName.textContent = alienFleet[0].name;
    enemyHull.textContent = "Hull :" + alienFleet[0].getHull();
    enemyFirePower.textContent = "Fire Power : " + alienFleet[0].getFirePower();
    enemyAccuracy.textContent = "Accuracy : " + alienFleet[0].getAccuracy();
}




function gameStart(){
    enemyImage.style.backgroundImage = `url('images/enemy.gif')`;
    while(alienFleet.length > 0) {
        alienFleet.pop();
    }

    player.setHull(defalutPlayerHull);
    for(let i = 0; i < numberOfEnimeis; i++){
        let hull = getRandomNumber(3,6);
        let firePW = getRandomNumber(2,4);
        let acc = getRandomNumber(6,8)/10;
        let name = "enemy-" + (i+1);
        alienFleet.push(new ship(name, hull, firePW, acc));
    }
    updatePlayerStatus();
    updateEnemyStatus();
}

function isEnemyArrayEmpty(){
    if(alienFleet.length === 0){
        message = "You won the game. You killed all the enemies. You are the Best!";
        popupBoxType = 'alert';
        gameState = gameStates.gameRestart;
        return true;
    }else{
        return false;
    }
}

function debugMessage(log){
    if(debug === true){
        console.log(log);
    }
}

function resetCssClassEffects(){
    if(playerImage.classList.contains("hidden")){
        playerImage.classList.remove("hidden");
        playerImage.classList.add("visible");
    }
    if(enemyImage.classList.contains("shake")){
        enemyImage.classList.toggle("shake");
    }
    if(enemyImage.classList.contains("rotateEnemyImage")){
     enemyImage.classList.toggle("rotateEnemyImage")
    }
    if(playerImage.classList.contains("shake")){
        playerImage.classList.toggle("shake");
    }
}



function nextFrame() {
    resetCssClassEffects();
    if(gameState !== gameStates.gameOver){

        debugMessage("Current game state " + gameState);
        switch(gameState){
            case gameStates.start:
                debugMessage("I am in game start");
                gameStart();
                let shipName = shipNames[Math.floor(Math.random()*shipNames.length)];
                playerName.textContent = shipName;
                alert("You are the captain of the " + shipName);
                alert("You are flying your ship into a uknown territory.");
                alert("Chief Officer:\nCaptain...Captain... We detected a destress signal...");
                alert("Chief Officer:\nWe were able to decode it, it says: 'Help...I am being attcked by 6 alien ships, this is a cargo ship with many civilians.'");
                popupBoxType = 'alert';
                message = "Captain:\nLock in the coordinates...We are going to battle.";
                gameState = gameStates.attack;
                break;
            case gameStates.attack:
                debugMessage("I am in game attack");
                popupBoxType = 'alert';
                if (Math.random() < player.getAccuracy()) { 
                    enemyImage.classList.toggle("shake");
                    message = `You have attacked an alien ship! You did ${player.getFirePower()} points in damage`;
                    alienFleet[0].takeDamage(player.getFirePower());
                    alienFleet[0].textContent = "Hull : " + alienFleet[0].getHull();
                    
                    updateEnemyStatus();
                    if(alienFleet[0].getHull() <= 0){
                        enemyImage.style.backgroundImage = `url('')`;
                        enemyImage.classList.toggle("rotateEnemyImage");
                        alienFleet[0].setHull(0);
                        message = "You have destroyed an alien ship. Do you want to retreat?";
                        popupBoxType = 'prompt';
                        updateEnemyStatus();
                        alienFleet.splice(0,1);
                        if(isEnemyArrayEmpty()){
                            console.log(popupBoxType);
                            break;
                        }
                        
                    }else{
                        message = "You have attacked an alien ship.";
                    }
                }else{
                    message = 'You have missed!\n' + pMissMessages[Math.floor(Math.random()*pMissMessages.length)];
                }
                gameState = gameStates.takeDamage;
                break;
            case gameStates.takeDamage:
                debugMessage("I am in take Damage");
                if(isEnemyArrayEmpty()){
                    break;
                }
                //updateEnemyStatus();
                if (Math.random() < alienFleet[0].getAccuracy()) { 
                    playerImage.classList.toggle("shake");
                    message = `You have been hit! You took ${alienFleet[0].getFirePower()} points in damage`;
                    player.takeDamage(alienFleet[0].getFirePower());
                    playerHull.textContent = "Hull : " + player.getHull();
                }else{
                    message = 'Enemy has missed! You are Lucky!';
                }
                
                if(player.getHull() <= 0){
                    player.setHull(0);
                    updatePlayerStatus();
                    if(playerImage.classList.contains("visible")){
                        playerImage.classList.remove("visible");
                        playerImage.classList.add("hidden");
                    }
                    message = "Your Ship has been destroyed. Game Over! hahaha!";
                    popupBoxType = 'alert';
                    playerImage.classList.add("hidden");
                    gameState = gameStates.gameRestart;
                    break;
                }
                popupBoxType = 'alert';
                gameState = gameStates.attack;
                console.log(gameState);
                break;
            case gameStates.retreat:
                debugMessage("I am in retreat");
                message = "Your Ship is leaving the game. Game Over!";
                popupBoxType = 'alert';
                gameState = gameStates.gameRestart;
                break;
            case gameStates.gameRestart:
                debugMessage("I am in gameRestart");
                message = "Do you want to play again."
                popupBoxType = 'prompt'; 
                break;
            default:
                debugMessage("I am in default");
                break;
        }
        if (popupBoxType === 'prompt'){
            playerSelection = confirm(message);
            if(playerSelection === true){
                if(gameState === gameStates.takeDamage){
                    gameState = gameStates.retreat;
                }else{
                    gameState = gameStates.start;
                }   
            }else{
                if(gameState !== gameStates.takeDamage){
                    gameState = gameStates.gameOver;
                    alert("Reload the page to play again!");
                }else{
                    enemyImage.style.backgroundImage = `url('images/enemy.gif')`;
                    updateEnemyStatus();                   
                }
            }
        } else if (popupBoxType ===  'confirm'){
            confirm(message);
        } else {
            alert(message);
        }

        if(gameState === gameStates.attack){
            bullet.style.backgroundImage = `url('images/pbullet.gif?a=${Math.random()}')`;
        }else if(gameState === gameStates.takeDamage){
            bullet.style.backgroundImage = `url('images/ebullet.gif?a=${Math.random()}')`;
        }

        setTimeout(nextFrame, 1000);
    }
}

// Start the loop
setTimeout(nextFrame, 0);