
// alert("hello");

function ageinDays(){
  var birthyear = prompt("In which year you were born?");
  var ageInDays_v = (2018 - birthyear) * 365;
  console.log(ageInDays_v)
  var h3 = document.createElement('h3');
  var textAnswer = document.createTextNode('You are ' + ageInDays_v + ' days old');
  h3.setAttribute('id','ageInDays');
  h3.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h3);
}

function reset(){
  document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat generator

function generateCat(){
  var image = document.createElement('img');
  image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  document.getElementById('flex-cat-generator').appendChild(image)

}

// Challenge 3: Rock, paper and scissors gamerps

function rpsGame(myChoice){
  console.log('humanChoice: ', myChoice.id);
  var humanChoice, botChoice;
  humanChoice = myChoice.id;
  botChoice = numberToChoice(randToPrsInt());
  console.log('computer choice: ',botChoice);
  results = decideWinner(humanChoice,botChoice);
  console.log(results);
  message = finalMessage(results[0],results[1]);
  console.log(message);
  rpsFrontEnd(humanChoice,botChoice,message)

}

function randToPrsInt(){
  return Math.floor(Math.random()*3);
}

function numberToChoice(number){
  return ["rock","paper","scissors"][number];
}

function decideWinner(yourChoice, computerChoice){
  var rpsDataBase = {
    "rock":{"scissors":1,"rock":0.5,"paper":0},
    "paper":{"rock":1,"paper":0.5,"scissors":0},
    "scissors":{"paper":1,"scissors":0.5,"rock":0}
  };

  var humanScore = rpsDataBase[yourChoice][computerChoice];
  var computerScore = rpsDataBase[computerChoice][yourChoice];

  return [humanScore,computerScore];
}

function finalMessage(yourScore, computerScore){
  if(yourScore === 0){
    return {'message':'You lost!', 'color':'red'};
  } else if (yourScore === 0.5){
      return {'message':'You tied!', 'color':'orange'};
  } else{
      return {'message':'You win!', 'color':'green'};
    }
}

function rpsFrontEnd(yourChoice,computerChoice,finalMessage){
  var imagesDataBase = {
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src,
  };

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var h3 = document.createElement('h3');
  h3.setAttribute('id','meesageResult');
  var messageText = document.createTextNode(finalMessage['message']);
  h3.appendChild(messageText);

  var messageDiv = document.createElement('div');
  messageDiv.innerHTML = "<h3 style='color: " + finalMessage['color'] + "'> " + finalMessage['message'] + " </h3>"

  var humanImg = document.createElement('img');
  humanImg.width = 150;
  humanImg.height = 150;
  humanImg.src = imagesDataBase[yourChoice];
  humanImg.setAttribute('id',yourChoice);

  var botImg = document.createElement('img');
  botImg.width = 150;
  botImg.height = 150;
  botImg.src = imagesDataBase[computerChoice];
  botImg.setAttribute('id',computerChoice);

  document.getElementById('flex-box-rps-div').appendChild(humanImg);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botImg);
  //document.getElementById('flex-box-rps-div').appendChild(computerChoice);
}

// Challenge 4: Change all buttons

var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copy_allButtons = [];
for(let i = 0; i < all_buttons.length; i++){
  copy_allButtons.push(all_buttons[i].classList[1]);
}

console.log(copy_allButtons)

function buttonColorChange(thingy){
  if (thingy.value == 'red'){
    redButton();
  }
  else if (thingy.value == 'green') {
    greenButton();
  }
  else if (thingy.value == 'reset'){
    resetButton();
  }
  else {
    randomColor();
  }
}

function redButton(){
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function greenButton(){
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function randomColor(){
  var buttonList = ['btn-primary','btn-danger','btn-sucess','btn-warning']
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(buttonList[Math.floor(Math.random()*4)]);
  }
}

function resetButton(){
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copy_allButtons[i]);
  }
}

console.log(all_buttons)

// Challenge 5: Blackjack

let blackjackGame = {
  'you':{'scorespan':'#your-blackjack-result', 'div':'#yourBox', 'score':0},
  'dealer':{'scorespan':'#dealer-blackjack-result', 'div':'#dealerBox', 'score':0},
  'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
  'wins':0,
  'losses':0,
  'draws':0,
  'standBtnOn':false,
  'dealBtnOn': false
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const CARDS = blackjackGame['cards'];
const hitSound = new Audio('static/sounds/swish.m4a');
const cashSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
//document.querySelector('#blackjack-stand-button').addEventListener('clicki', blackjackStand);

function blackjackHit(){
  if(blackjackGame['standBtnOn']===false){
    showCard(YOU);
    showScore(YOU);
  }
}

function showCard(activePlayer){
  if(activePlayer['score'] <=21){
    let cardImage = document.createElement('img');
    let cardPicked = CARDS[Math.floor(Math.random()*13)];
    cardImage.src = 'static/images/'+cardPicked+'.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    scoring(activePlayer,cardPicked);
  }
}

function blackjackDeal(){
  if(blackjackGame['dealBtnOn'] === true){
    let yourCards = document.querySelector('#yourBox').querySelectorAll('img');
    for(i=0; i<yourCards.length; i++){
      yourCards[i].remove();
    }

    let dealerCards = document.querySelector('#dealerBox').querySelectorAll('img');
    for(i=0; i<dealerCards.length; i++){
      dealerCards[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector(YOU['scorespan']).textContent = '0';
    document.querySelector(YOU['scorespan']).style.color = 'white';
    document.querySelector(DEALER['scorespan']).textContent = '0';
    document.querySelector(DEALER['scorespan']).style.color = 'white';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = "black";

    document.querySelector('#wins').textContent = blackjackGame['wins'];
    document.querySelector('#losses').textContent = blackjackGame['losses'];
    document.querySelector('#draws').textContent = blackjackGame['draws'];
  }
  blackjackGame['standBtnOn'] = false;
  blackjackGame['dealBtnOn'] = false;
}

function scoring(activePlayer,cardPicked){
  if(cardPicked === 'A'){
    if(activePlayer['score'] + blackjackGame['cardMap'][cardPicked][1] <= 21){
      activePlayer['score'] += blackjackGame['cardMap'][cardPicked][1];
    } else {
      activePlayer['score'] += blackjackGame['cardMap'][cardPicked][0];
    }
  } else{
  activePlayer['score'] += blackjackGame['cardMap'][cardPicked];
  }
  console.log(activePlayer['score']);
}

function showScore(activePlayer){
  if(activePlayer['score'] > 21){
    document.querySelector(activePlayer['scorespan']).textContent='BUST!!';
    document.querySelector(activePlayer['scorespan']).style.color='red';
  } else{
  document.querySelector(activePlayer['scorespan']).textContent=activePlayer['score'];
  }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
  blackjackGame['standBtnOn'] = true;
  while (DEALER['score'] < 16){
    showCard(DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  computeWinner();
  blackjackGame['dealBtnOn'] = true;
  }

function computeWinner() {
  let winner;
  let textResult = document.querySelector('#blackjack-result');

  if(YOU['score'] <= 21){
    if(YOU['score'] < DEALER['score'] && DEALER['score'] <= 21){
      winner=DEALER;
      textResult.textContent ='You loose!!';
      textResult.style.color = 'red'
    } else if(YOU['score'] > DEALER['score']|| DEALER['score'] > 21){
      winner=YOU;
      textResult.textContent='You win!!';
      textResult.style.color = 'green';
    } else{
      textResult.textContent='You draw!!';
      textResult.style.color = 'grey';
      console.log('tu score:',YOU['score']);
    }
  } else{
      if(DEALER['score'] <= 21){
        textResult.textContent='You loose!!';
        textResult.style.color = 'red';
        winner = DEALER;
      } else {
        textResult.textContent='You drew!!';
        textResult.style.color = 'grey';
    }
  }

  if(winner === YOU){
    cashSound.play();
  }
  if(winner === DEALER){
    lostSound.play();
  }

  showTableWins(winner)

  return winner
}
  function showTableWins(winner){
    if(winner === YOU){
      blackjackGame['wins']++;
    } else if(winner === DEALER){
      blackjackGame['losses']++;
    } else {
      blackjackGame['draws']++;
    }
  }
