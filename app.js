/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores , roundscore , activePlayer , gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//1. Random number:
		var dice = Math.floor(Math.random() * 6) +1;
		
		//2. Display the result:
		var dicedom = document.querySelector('.dice');
		dicedom.style.display = 'block';
		dicedom.src = 'dice-' + dice + '.png';
		
		//3. Update the roundscore if the rolled number is not one:
		if (dice !== 1) {
			// Add score 
			roundscore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundscore;
		} else {
			// nextplayer:
			nextplayer();
		}
	}	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundscore;
		
		// update the UI:
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		// chcek if the player won the game:
		if (scores[activePlayer] >=100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
			gamePlaying = false;
		} else {
			// nextplayer
			nextplayer();
		}
	}
});

function nextplayer() {
	// next player:
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundscore = 0;
		
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		document.querySelector('.dice').style.display = 'none';
}
	
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	roundscore = 0;
	activePlayer = 0;
	gamePlaying = true;
	
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

}
