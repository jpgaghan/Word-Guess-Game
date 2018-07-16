var alphabet = new RegExp('^[a-z]*$');
var currentwordArray = []
var usedwordList = []
var usedAlphabet = []
var query = $("#startmenu")
var currentWord, currentwordIndex, blankWord, guessCounter, guesscounterStore, gametypeIndex, blankwordArr
var winCount = 0
var loseCount = 0
var gameData = [
    {wordList: ["reindeer", "mistletoe", "rudolf", "stocking", "nutcracker", "ornaments", "elves", "candy cane", "presents"],
    backgroundPicture: "assets/images/christmasbackground.jpg",
    completionBar: "",
    winsoundFile: new Audio("assets/sounds/christmaswin.mp3"),
    losesoundFile: new Audio("assets/sounds/christmaslose.wav"),
    backgroundSong:new Audio("assets/sounds/christmasbackground.wav"),
    mistakeSound: new Audio("assets/sounds/error.wav"),
    winPicture: "assets/images/christmaswin.jpg",
    losePicture:"assets/images/christmaslose.jpg", },

{ wordList: ["charlotte", "orlando", "miami", "knoxville", "houston", "colorado", "pensacola", "seattle", "baltimore"],
backgroundPicture: "assets/images/citybackground.jpg",
completionBar: "",
winsoundFile: new Audio("assets/sounds/citywin.mp3"),
losesoundFile: new Audio("assets/sounds/citylose.mp3"),
backgroundSong:new Audio("assets/sounds/citybackground.mp3"),
mistakeSound: new Audio("assets/sounds/error.wav"),
winPicture: "assets/images/citywin.jpg",
losePicture:"assets/images/citylose.jpg", },

{ wordList: ["saturn", "jupiter", "uranus", "neptune", "mercury", "asteroid", "satellite", "astronaut", "rocket"],
backgroundPicture: "assets/images/spacebackground.jpg",
completionBar: "",
winsoundFile: new Audio("assets/sounds/spacewin.mp3"),
losesoundFile: new Audio("assets/sounds/spacelose.mp3"),
backgroundSong: new Audio("assets/sounds/spacebackground.mp3"),
mistakeSound: new Audio("assets/sounds/error.wav"),
winPicture: "assets/images/spacewin.jpg",
losePicture:"assets/images/spacelose.jpg", },

{ wordList: ["quarterback", "penalties", "kicker", "interception", "touchdown", "safety", "linebacker", "kickoff", "fumble"],
backgroundPicture: "assets/images/footballbackground.jpg",
completionBar: "",
winsoundFile: new Audio("assets/sounds/footballwin.mp3"),
losesoundFile: new Audio("assets/sounds/footballlose.mp3"),
backgroundSong:new Audio("assets/sounds/footballbackground.mp3"),
mistakeSound: new Audio("assets/sounds/error.wav"),
winPicture: "assets/images/footballwin.jpg",
losePicture:"assets/images/footballlose.jpg", }

]

var funcObject = {


generateWord: function() {
                blankWord = ""
                if (gameData[gametypeIndex].wordList.length === 0) {
                    gameData[gametypeIndex].wordList=usedwordList
                    usedwordList = []
                }
                currentwordIndex = Math.floor(Math.random() * gameData[gametypeIndex].wordList.length);
                currentWord = gameData[gametypeIndex].wordList[currentwordIndex];
                usedwordList.push(currentWord)
                gameData[gametypeIndex].wordList.splice(currentwordIndex, 1)

                for (var x = 0; x < currentWord.length; x++) {
                    if (currentWord.charAt(x) !== " ") {
                        blankWord = blankWord + "_";
                    }
                    
                    else blankWord = blankWord + "  ";
                }
                blankwordArr = blankWord.split("");
                return blankWord
            },

validkeyTest: function() {
                if (blankWord === undefined || blankWord === "") {
                    this.generateWord()
                }
                
                if ($("#win").is(':visible') || $("#lose").is(':visible')) {
                    $("#win").hide(); 
                    $(".win").hide();                 
                    $("#lose").hide();
                    $(".lose").hide();                   
                    $("#game").show();
                    $(".game").show();
                    gameData[gametypeIndex].winsoundFile.pause();
                    gameData[gametypeIndex].backgroundSong.loop = true;
                    gameData[gametypeIndex].backgroundSong.play();
                }
                // test to see if key pressed is a lowercase, previous entry or if it's a letter that hasn't been pressed
                if (usedAlphabet.includes(userInput)) {
                    alert("previously used letter");
                    gameData[gametypeIndex].mistakeSound.play();
                }
                
                else if (userInput.match(alphabet) == userInput) {
                    usedAlphabet.push(userInput);
                    this.guessMatch()
                }
                else {
                    gameData[gametypeIndex].mistakeSound.play();
                    }
                    
},      

renderHtml :function() {
                wordSeen = blankwordArr.join(" ");                     
                var html = "Your current word is " + wordSeen + "<br> Your current guesses left are " + guessCounter + " <br> Current guessed letters " + usedAlphabet + "<br> Win Count: " + winCount + "<br> Lose Count: " + loseCount
                document.getElementById("gamestatus").innerHTML = html
            if (gameData[gametypeIndex].backgroundSong.loop = false) {
                gameData[gametypeIndex].backgroundSong.loop = true;
                gameData[gametypeIndex].backgroundSong.play();
            }

},

winLose :function () {
            if (!blankWord.includes("_") && (blankWord !== "")) {
                winCount++;
                guessCounter = guesscounterStore
                currentWord = ""
                currentwordIndex = ""
                blankWord = this.generateWord()
                usedAlphabet = []
                gameData[gametypeIndex].backgroundSong.loop = false;
                gameData[gametypeIndex].backgroundSong.pause();
                gameData[gametypeIndex].winsoundFile.currentTime = 0
                gameData[gametypeIndex].winsoundFile.play();
                $(".win").html('<img class = "bg" src="' + gameData[gametypeIndex].winPicture + '"alt="backgroundimage">');
                $(".game").hide();
                $("#game").hide();
                $(".win").show();
                $("#win").show();
            }
            if (guessCounter === 0) {
                alert("you lost!")
                loseCount++;
                guessCounter = guesscounterStore
                currentWord = ""
                currentwordIndex = ""
                blankWord = this.generateWord()
                usedAlphabet = []
                gameData[gametypeIndex].backgroundSong.loop = false;
                gameData[gametypeIndex].backgroundSong.pause();
                gameData[gametypeIndex].losesoundFile.currentTime = 0
                gameData[gametypeIndex].losesoundFile.play();
                $(".lose").html('<img class = "bg" src="' + gameData[gametypeIndex].losePicture + '"alt="backgroundimage">');
                $("#game").hide();
                $(".game").hide();
                $("#lose").show();
                $(".lose").show();
            }
            this.renderHtml()
        },



guessMatch: function() {
    if (currentWord.includes(userInput)) {
        var currentwordArr = currentWord.split("");
        blankWord = ""
            for (i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === userInput) {
                    blankWord = blankWord + userInput
                }
                else blankWord = blankWord + blankwordArr[i]
            }
            blankwordArr = blankWord.split("");       
        }
    else {guessCounter--}
        this.winLose()             
},

guessCounter: function(id) {
        if (id.includes("1")) {
            guessCounter=5
            }
        else if (id.includes("2")) {
            guessCounter=8
        }
        else {guessCounter=10}
        guesscounterStore=guessCounter
}
        
}




$(document).ready(function () {
    $(".start").click(function () {
        gametypeIndex = parseInt(this.id[5]);
        $("#startmenu").hide(); 
        document.getElementById("navbar").remove();
        $("#difficultyparent").show();
        });
    });

$(document).ready(function () {
    $(".diffSelector").click(function () {
        funcObject.guessCounter(this.id);
        funcObject.generateWord();
        funcObject.renderHtml();
        $("#difficultyparent").hide();
        $(".game").html('<img class = "bg" src="' + gameData[gametypeIndex].backgroundPicture + '"alt="backgroundimage">');
        $("body").removeClass("body");
        $(".game").show()
        $("#game").show();
        gameData[gametypeIndex].backgroundSong.loop = true;
        gameData[gametypeIndex].backgroundSong.play();
    }); 
});


 var userInput = document.onkeyup = function(event) {
    
    if ($("#lose").is(':visible') || ($("#win").is(':visible'))) {
        userInput = event.key;
            if (userInput === "Enter") {
            funcObject.validkeyTest();
            }
            else alert("Only valid key is enter right now")
    }

    else if (!$("#startmenu").is(':visible') && (!$("#difficultyparent").is(':visible'))) {
        userInput = event.key;
        funcObject.validkeyTest();
    }
            
    }

$(document).ready(function () {
    $("#reset").click(function () {
        location.reload();
    });
});

$(document).ready(function () {
    $("#resetl").click(function () {
        location.reload();
    });
});

$(document).ready(function () {
    $("#resetw").click(function () {
        location.reload();
    });
});
