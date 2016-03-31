(function() {

	var init = function() {

		view.initDeck();

		var deck = new Deck();

		view.setInitialConfiguration(deck.draw(5));

	}

	init();

})();
