const storyText = document.getElementById(`text`);
const checkButtons = document.getElementById(`check-buttons`);

let currentState = {}

//start game
function startGame(){
    currentState = {}
    showStoryText(1)
}

//show story text
function showStoryText(textNode){

}

//select the option
function optionSelect(option){

}

//text options variety
const textNodes = [
    {
        id: 1,
        text: "You wake up in a dark room, you don't remeber much but you know you were brought here by force.",
        options: [{
            //option 1
            text: "Turn on the lights and go out of the door.",
            setCurrentState: { lightsOn: true },
            //go to another id
            nextText: 2
        },{
            //option 2
            text: "Leave the lights off and stay inside the room."
        }
        ]
    }, {
        //nextText
        id: 2
    }
]

startGame()