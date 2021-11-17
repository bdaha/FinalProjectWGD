const storyText = document.getElementById(`text`);
const checkButtons = document.getElementById(`check-buttons`);

//current state of the game
let currentState = {}

//start game
function startGame(){
    currentState = {}
    showStoryText(1)
}

//show story text
function showStoryText(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    storyText.innerText = textNode.text
    while(checkButtons.firstChild) {
        checkButtons.removeChild(checkButtons.firstChild)
    }
    textNode.options.forEach(option => {
        if(optionSelect(option)) {

        }
    })
}

//option for the states
function optionShown(option){
    return true
}

//select the option
function optionSelect(option){

}

//text options variety
const textNodes = [
    {
        id: 1,
        text: "You have awaken in a dark room, you don't remeber much but you know you were brought here by force.",
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