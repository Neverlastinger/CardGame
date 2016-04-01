/**
 * Initializes the App.
 */
(function() {
	
	var deck = new Deck();
	
	view.initDeck();
	view.setInitialConfiguration(deck.draw(5));
	
	document.querySelector('#hit').addEventListener('click', function() {
		view.drawCards(deck.draw(2));
	});
	
})();
