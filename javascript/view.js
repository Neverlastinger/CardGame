var view = new function() {

	var animationDuration = 400;

	var elements = {
		deck: document.querySelector('#deck')
	};

	var deckSize = 52;

	this.initDeck = function() {

		for (var i = 0; i < deckSize; i++) {

			var card = createCard();

			var pos = parseInt(i / 2) + 'px';
			card.style.top = pos;
			card.style.left = pos;

			elements.deck.appendChild(card);
		}

	}

	this.setInitialConfiguration = function(cards) {

		moveCards(cards.splice(0, 3), 'dealers');

		setTimeout(function() {
			moveCards(cards, 'players');
		}, animationDuration * 3);
	};

	var moveCards = function(cards, className) {

		cards.forEach(function(card, index) {

			setTimeout((function(card, index) {

				return function() {

					var element = elements.deck.children[deckSize - 1];
					resetCard(element);
					element.classList.add(className);
					element.classList.add(className + (index + 1));
					element.innerHTML = card.number + ' ' + card.suit;

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

}
