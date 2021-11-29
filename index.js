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
        if(optionShown(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener('click', () => optionSelect(option))
            checkButtons.appendChild(button)
        }
    })
}

//option for the states
function optionShown(option){
    if(option.requiredState == null || option.requiredState(currentState))
    return true
}

//select the option
function optionSelect(option){
    const nextTextId = option.nextText
    if(nextTextId <= 0){
        return startGame()
    }
    currentState = Object.assign(currentState, option.setCurrentState)
    showStoryText(nextTextId)
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
            text: "Leave the lights off and stay inside the room.",
            setCurrentState: {lightsOff: true},
            nextText: 3
        }
        ]
    }, {
        //nextText
        id: 2,
        text: " Go outside and find two scary men looking at you.",
        options: [{
            text: "You try to fight them",
            //change the names
            requiredState: (currentState) => currentState.lightsOn,
            setCurrentState: { lightsOn: false, fight: true},
            nextText: 4
        },{
            text: "Talk to them and ask for directions.",
            requiredState: (currentState) => currentState.lightsOn,
            setCurrentState: {lightsOn: false, askDirections: true},
            nextText: 5
        },{
            text: "Run away",
            nextText: 6
        }]
    },{
        id: 4,
        text: " You lose the fight and you die",
        options: [{
            text: "Try Again",
            nextText: -1
        }]
    },{
        id: 5,
        text: "They tell you that you are at a warehouse, and there is a arcade across the town that you must go to",
        options: [{
            text: "Make your way toward the arcade",
            requiredState: (currentState) => currentState.askDirections,
            setCurrentState: {askDirections: false, towardArcade: true},
            nextText: 7
        },{
            text: "Ask if they can provide you with any map",
            requiredState: (currentState) => currentState.askDirections,
            setCurrentState: {askDirections: false, askMap: true},
            nextText: 8
        },{
            text: "Ask why you need to go to the arcade",
            requiredState: (currentState) => currentState.askDirections,
            setCurrentState: {askDirections: false, askArcade: true},
            nextText: 9
        }]
    },{
        id: 7,
        text: "After wandering for awhile you get lost along the way, then you spot a bright light in the distance",
        options: [{
            text: "Make your way toward the light",
            requiredState: (currentState) => currentState.towardArcade,
            setCurrentState: {towardArcade: false, towardLights: true},
            nextText: 10
        },{
            text: "turn back and walk the opposite direction",
            requiredState: (currentState) => currentState.towardArcade,
            setCurrentState: {towardArcade: false, oppositeLights: true},
            nextText: 11
        }]
    },{
        id: 8,
        text: "You are provided with the map that shows you the way to the arcade",
        options: [{
            text: "Trust the map and follow it",
            requiredState: (currentState) => currentState.askMap,
            setCurrentState: {askMap: false, trustMap: true},
            nextText: 12
        },{
            text: "Maybe those guys are tricking me?",
            requiredState: (currentState) => currentState.askMap,
            setCurrentState: {askMap: false, noTrustMap: true},
            nextText: 13
        },{
            text: "Put the map in your pocket",
            requiredState: (currentState) => currentState.askMap,
            setCurrentState: {askMap: false, pocketMap: true},
            nextText: 14
        }]
    },{
        id: 3,
        text: "You wander what you should do next",
        options: [{
            text: "Turn on the lights",
            requiredState: (currentState) => currentState.lightsOff,
            setCurrentState: {lightsOff: false, turnOnLights: true},
            nextText: 15
        },{
            text: "try to find phone signal",
            requiredState: (currentState) => currentState.lightsOff,
            setCurrentState: {lightsOff: false, phoneSignal: true},
            nextText: 16
        },{
            text: "Use your Phones flashlight",
            requiredState: (currentState) => currentState.lightsOff,
            setCurrentState: {lightsOff: false, useFlashLight: true},
            nextText: 17
        }]
    },{
        id: 15,
        text: "The light is turned on",
        requiredState: (currentState) => currentState.lightsOff,
        setCurrentState: {lightsOff: false, lightsOn: true},
        nextText: 2
    },{
        id: 16,
        text: "You find the phone signal, you call for help",
        requiredState: (currentState) => currentState.phoneSignal,
        setCurrentState: {phoneSignal: false, callHelp: true},
        nextText: 18
    },{
        id: 17,
        text: "When the flashlight turned on, you were attacked by someone and die",
        nextText: -1
    },{
        id: 18,
        requiredState: (currentState) => currentState.callHelp,
        setCurrentState: {callHelp: false, Win: true},
        Text:"Congragulations, You esacped"
    },{
        id: 9,
        text: "You are told going to the aracde is your way to escape",
        options: [{
            text: "Go toward the arcade and play the game there and win",
            requiredState: (currentState) => currentState.askArcade,
            setCurrentState: {askArcade: false, towardArcade: true},
            nextText: 18
        },{
            text: "You think it's a trick and try to run away, but you are caught",
            requiredState: (currentState) => currentState.askArcade,
            setCurrentState: {askArcade: false, runAway: true},
            nextText: -1
        }]
    },{
        id: 10,
        text: "You find an bright city, and inside the city there is the arcade you were promised",
        options:[{
            text: "Go inside and play the only available game and win",
            requiredState: (currentState) => currentState.towardLights,
            setCurrentState: {towardLights: false, playWin: true},
            nextText: 18
        },{
            text: "Go inside and play the only available game and lose",
            requiredState: (currentState) => currentState.towardLights,
            setCurrentState: {towardLights: false, playLose: true},
            nextText: -1
        }]
    },{
        id: 11,
        text: "You were attacked when you turned around",
        options: [{
            text: "You try to fight back, but get overwhelmed",
            requiredState: (currentState) => currentState.oppositeLights,
            setCurrentState: {oppositeLights: false, overwhelmed: true},
            nextText: -1
        },{
            text: "You run away after feeling the blow, but fall",
            requiredState: (currentState) => currentState.oppositeLights,
            setCurrentState: {oppositeLights: false, runFall: true},
            nextText: -1
        }]
    }
]

startGame()