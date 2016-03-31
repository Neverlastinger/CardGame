var Deck = function() {

	var cards = [];

	var init = function() {
		shuffle(this.cards);
		console.log(this.cards);
	}.bind(this);

	this.draw = function(count) {
		return this.cards.splice(0, count);
	}

	// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	var shuffle = function(array) {

		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		}

		return array;
	}

	init();

}

Deck.prototype.cards = (function() {

	var cardNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
	var cardSuits = ['spades', 'hearts', 'diamonds', 'clubs'];

	var result = [];

	cardNumbers.forEach(function(number) {
		cardSuits.forEach(function(suit) {
			result.push({
				number: number,
				suit: suit
			});
		})
	});

	return result;
})();
