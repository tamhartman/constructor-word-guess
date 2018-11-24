var Word = require('./Word.js');

var inquirer = require('inquirer');

var picked;
var pickedWord;
var guesses;
var guessesLeft;
var wordBank = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Eevee", "Psyduck", "Doduo", "Mew", "Mewtwo", "Haunter", "Gengar", "Snorlax"];

function selectedWord (wordBank) {
    var index = Math.floor(Math.random() * wordBank.length);
    return wordBank[index];
}

var prompts = [
    {
        name: 'letterGuessed',
        message: 'Guess a letter',
        validate: function(value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1);
            return valid || 'Pick a letter';
        },
        when: function() {
            return (!picked.allGuessed() && guessesLeft > 0);
        }
    },
    {
        type: 'confirm',
        name: 'playAgain',
        message: 'Try again?',

        when: function() {
            return (picked.allGuessed() || guessesLeft <= 0);
        }
    }
];

// function to reset the game

function reset() {
    pickedWord = selectedWord(wordBank);
    picked = new Word(pickedWord);
    picked.makeGuess(' ');
    guesses = [];
    guessesLeft = 10;
}

function game() {
    if (!picked.allGuessed() && guessesLeft > 0) {
        console.log(picked + '');
    }

    inquirer.prompt(prompts).then(answers => {
        if('playAgain' in answers && !answers.playAgain) {
            console.log('Woot!');
            process.exit();
        }
        if (answers.playAgain) {
            reset();
        }
        if(answers.hasOwnProperty('letterGuessed')) {
            var currentGuess = answers.letterGuessed.toLowerCase();

            if(guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                picked.makeGuess(currentGuess);
                if(pickedWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log('You already tried', currentGuess);
            }
        }

        if(!picked.allGuessed()) {
            if(guessesLeft < 1) {
                console.log('Out of guesses!');
                console.log(pickedWord, 'was correct.');

            } else {
                console.log('Number of Guesses:', guesses.join(' '));
                console.log('Guesses Left:', guessesLeft);
            }
        } else {
            console.log(pickedWord, 'is it!! You got it! Great Job!');
        }

        game();
    });
}

reset();

game();

