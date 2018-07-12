
var wordList = ["reindeer", "santa claus", "rudolf", "stocking", "nutcracker", "ornaments", "elves", "candy cane", "presents"]



var currentwordArray = []



var currentWord, currentwordIndex, blankWord, userInput;



var winCount = 0



var loseCount = 0



var guessCounter = 15

var regexExpression = new RegExp('^[a-zA-Z]*$');

if (regexExpression =="a") {
    console.log("a")
}

if (regexExpression =="b") {
    console.log("b")
}

var query = $("#startmenu")

function CreateblankWord() {

    blankWord = ""

    currentwordIndex = Math.floor(Math.random() * wordList.length);

    currentWord = wordList[currentwordIndex];

    wordList.splice(currentwordIndex, 1)

    for (var x = 0; x < 1 + currentWord.length; x++) {

        if (currentWord.charAt(x) !== " ") {



            blankWord = blankWord + "_";



        }



        else blankWord = blankWord + " ";







    }



    console.log(blankWord);



    return blankWord;



}



$(document).ready(function () {

    $(".start").click(function () {

        CreateblankWord();

        $("#startmenu").hide();
        $("#game").show();

    });



    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]



    var usedAlphabet = []

    document.onkeyup = function buttonPress(event) {

        // $(document).ready(function(){

        // $("button").click(function() {

        // $("#container").hide();

        // });

        // });

        if (query.is(':visible') === false) {



            if (blankWord === undefined || blankWord === "") {



                blankWord = CreateblankWord();



            }



            var userInput = event.key;



            // test to see if key pressed is a lowercase, previous entry or if it's a letter that hasn't been pressed



            if (usedAlphabet.includes(userInput)) {



                alert("previously used letter");



            }



            else if (alphabet.includes(userInput)) {



                var index = alphabet.indexOf(userInput);



                guessCounter = guessCounter - 1



                alphabet.splice(index, 1);



                usedAlphabet.push(userInput);



                console.log(alphabet);



                if (currentWord.includes(userInput)) {



                    var currentwordArr = currentWord.split("");



                    var blankwordArr = blankWord.split("");



                    blankWord = ""



                    for (i = 0; i < currentWord.length; i++) {



                        if (currentWord[i] === userInput) {

                            blankWord = blankWord + userInput

                        }



                        else blankWord = blankWord + blankwordArr[i]



                    }



                }



            }



            else if (!usedAlphabet.includes(userInput)) {



                alert("lowercase letters only");



            }



            if (!blankWord.includes("_") && (blankWord !== "")) {



                alert("You Win!!!!!!!!!")



                winCount = winCount + 1



                guessCounter = 15



                currentWord = undefined



                currentwordIndex = undefined



                blankWord = CreateblankWord()





                usedAlphabet = []



                alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

            }



            if (guessCounter === 0) {



                alert("you lost!")


            }
            var html = "Your current word is" + blankWord + "<br> Your current guesses left are" + guessCounter + " <br> Current guessed letters" + usedAlphabet
            console.log(html);

            document.getElementById("game").innerHTML = html;
        }
    }

});
