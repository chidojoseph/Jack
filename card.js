var Suit = {
    Spades: 'Spades',
    Hearts: 'Hearts',
    Clubs: 'Clubs',
    Diamonds: 'Diamonds'
}

var Rank = {
    Two: '2',
    Three: '3',
    Four: '4',
    Five: '5',
    Six: '6',
    Seven: '7',
    Eight: '8',
    Nine: '9',
    Ten: '10',
    Jack: 'Jack',
    Queen: 'Queen',
    King: 'King',
    Ace: 'Ace',
}

var SetType = {
    Set52: 52,
    Set36: 36,
    Set32: 32,
    Set24: 24
}

var SuitSet = [
    Suit.Spades,
    Suit.Hearts,
    Suit.Clubs,
    Suit.Diamonds,
];

var RankSet_52 = [
    Rank.Two,
    Rank.Three,
    Rank.Four,
    Rank.Five,
    Rank.Six,
    Rank.Seven,
    Rank.Eight,
    Rank.Nine,
    Rank.Ten,
    Rank.Jack,
    Rank.Queen,
    Rank.King,
    Rank.Ace,
];

var RankSet_36 = [
    Rank.Six,
    Rank.Seven,
    Rank.Eight,
    Rank.Nine,
    Rank.Ten,
    Rank.Jack,
    Rank.Queen,
    Rank.King,
    Rank.Ace,
];

var RankSet_32 = [
    Rank.Seven,
    Rank.Eight,
    Rank.Nine,
    Rank.Ten,
    Rank.Jack,
    Rank.Queen,
    Rank.King,
    Rank.Ace,
];

var RankSet_24 = [
    Rank.Nine,
    Rank.Ten,
    Rank.Jack,
    Rank.Queen,
    Rank.King,
    Rank.Ace,
];

function getRandSuit() {
    var r = Math.floor(Math.random()*3);
    switch(r) {
        case 0: return Suit.Spades;
        case 1: return Suit.Hearts;
        case 2: return Suit.Clubs;
        case 3: return Suit.Diamonds;
    }
}

function getRandRank() {
    var r = Math.floor(Math.random()*13);
    switch(r) {
        case 0: return Rank.Two;
        case 1: return Rank.Three;
        case 2: return Rank.Four;
        case 3: return Rank.Five;
        case 4: return Rank.Six;
        case 5: return Rank.Seven;
        case 6: return Rank.Eight;
        case 7: return Rank.Nine;
        case 8: return Rank.Ten;
        case 9: return Rank.Jack;
        case 10: return Rank.Queen;
        case 11: return Rank.King;
        case 12: return Rank.Ace;
    }
}

function RandCard() {
    this.rank = getRandRank();
    this.suit = getRandSuit();
    this.opened = Math.random() >= 0.5;
}

function Card(rank, suit, opened) {
    this.rank = rank;
    this.suit = suit;
    this.opened = opened;

    this.open = function() {
        this.opened = true;
    }

    this.close = function() {
        this.opened = false;
    }
}

function getCardUrl(card) {
    var url;
    if(card.opened) {
        /*url = 'url("cards/colored/' + card.rank + '_' + card.suit + '.svg")';*/
        /*url = 'url("cards/gray/' + card.rank + '_' + card.suit + '.svg")';*/
        url = 'url("cards/vegas/' + card.rank + '_' + card.suit + '.jpg")';
    } else {
        url = 'url("cards/vegas/0.jpg")';
    }
    return url;
}

function CardArray() {
    this.array = [];

    this.render = function(viewId) {
        var view = document.getElementById(viewId);
        while(view.firstChild) {
            view.removeChild(view.firstChild);
        }

        var cardCount = this.array.length;
        for(var i = 0; i<cardCount; ++i) {
            var cardView = document.createElement('div');
            cardView.setAttribute('class', 'card');
            cardView.style.transform = getTransformProp(getDeg(i, cardCount));

            var c = this.array[i];
            cardView.style.backgroundImage = getCardUrl(c);

            view.appendChild(cardView);
        }
    }
}

function Deck(setType, deckCount) {
    this.cards = new CardArray();

    this.shuffle = function() {
        var cards = this.cards.array;
        var j, x, i;
        for (i = cards.length; i; --i) {
            j = Math.floor(Math.random() * i);
            x = cards[i - 1];
            cards[i - 1] = cards[j];
            cards[j] = x;
        }
    }

    var rankSet;
    switch(setType) {
        case SetType.Set52: rankSet = RankSet_52; break;
        case SetType.Set36: rankSet = RankSet_36; break;
        case SetType.Set32: rankSet = RankSet_32; break;
        case SetType.Set24: rankSet = RankSet_24; break; 
    }

    for(var d = 0; d<deckCount; ++d) {
        for (var s = 0; s<SuitSet.length; ++s) {
            for (var r = 0; r<rankSet.length; ++r) {
                var c = new Card(rankSet[r], SuitSet[s], false);
                this.cards.array.push(c);
            }
        }
    }
}
