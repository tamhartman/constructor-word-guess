var Letter = function(character) {
    //Letter character
    this.character = character;
    // bool = thisGuessed
    this.guessed = false;

    //return character or placeholder
    this.toString = function() {
        return this.guessed ? this.character : '_';
    }
    //Check for character match
    this.makeGuess = function(newGuess) {
        if(this.character.toLowerCase() === newGuess.toLowerCase()) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;