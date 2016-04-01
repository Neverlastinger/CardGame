/**
 * Represents the playing bord. Handles DOM operations. 
 */
var view = new function() {
	
	var animationDuration = 400;
	
	var elements = {
		board: document.querySelector('#board')
	};
	
	var suits = {
		clubs: {
			symbol: '♣',
			color: 'black'
		},
		diamonds: {
			symbol: '♦',
			color: 'red'
		},
		hearts: {
			symbol: '♥',
			color: 'red'
		},
		spades: {
			symbol: '♠',
			color: 'black'
		}
	}
	
	var deckSize = 52;

	/**
	 * Initializes the deck of cards. 
	 */
	this.initDeck = function() {

		for (var i = 0; i < deckSize; i++) {

			var card = createCard();

			var pos = parseInt(i / 2) + 'px';
			card.style.top = pos;
			card.style.left = pos;

			elements.board.appendChild(card);
			
			card.addEventListener('click', onCardClicked);
		}

	}

	/**
	 * Sets the initial configuration of the playing board - 3 cards for the dealer and 2 cards for the player.
	 * 
	 * @param cards: objects, representing the cards to be drawn from the deck
	 */
	this.setInitialConfiguration = function(cards) {

		openCards(cards.splice(0, 3), 'dealers');

		setTimeout(function() {
			openCards(cards, 'players');
		}, animationDuration * 3);
		
		setTimeout(function() {
			elements.board.classList.remove('disabled');
		}, animationDuration * 5);
	};
	
	/**
	 * Draws cards from the deck to the player's area. 
	 * 
	 * @param cards: objects, representing the cards to be drawn from the deck
	 */
	this.drawCards = function(cards) {
		
		elements.board.classList.add('disabled');
		
		var elementsForDestroying = document.querySelectorAll('#board .players:not(.destroyed)');
		
		if (elementsForDestroying.length == 0) {
			
			openCards(cards, 'players');
			
		} else {
			
			Array.prototype.forEach.call(elementsForDestroying, function(element) {
				element.classList.add('destroyed');
			});
			
			setTimeout(function() {
				openCards(cards, 'players');
			}, animationDuration);
		}
		
		setTimeout(function() {
			elements.board.classList.remove('disabled');
		}, 2 * animationDuration);
	};

	var openCards = function(cards, className) {

		cards.forEach(function(card, index) {

			setTimeout((function(card, index) {

				return function() {

					var element = elements.board.children[deckSize];
					resetCard(element);
					element.classList.add(className);
					element.classList.add(className + (index + 1));
					displayCardDetails(element, card);

					deckSize--;
				}

			})(card, index), index * animationDuration);
		});
	}

	var createCard = function() {
		var element = document.createElement('div');
		element.className = 'card';
		return element;
	};

	var resetCard = function(element) {
		element.style.top = '';
		element.style.left = '';
	};
	
	var displayCardDetails = function(element, card) {
		
		['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(function(className) {
			var span = document.createElement('span');
			span.classList.add(className);
			span.innerHTML = card.number;
			element.appendChild(span);
		})
		
		var span = document.createElement('span');
		span.classList.add('suit');
		span.innerHTML = suits[card.suit].symbol;
		element.appendChild(span);
		
		element.classList.add(suits[card.suit].color)
		
	};
	
	var onCardClicked = function() {
		
		if (this.classList.contains('players')) {
			this.classList.add('destroyed');
		}
	}

}
