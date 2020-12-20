/*
FERMATA.JS WAS CREATED BY DANIEL DEANDA AND IS HOSTED AT https://danieldeanda.tech/fermata
COPYRIGHT 2017-2021 BY DANIEL DEANDA
USE OF THIS PLAYER IS PERMITTED UNDER THE CREATIVE COMMONS ATTRIBUTION 4.0 INTERNATIONAL LICENSE
FOR LARGER PROJECTS, PLEASE CONTACT THE CREATOR FOR MORE INFORMATION - hello@danieldeanda.tech
*/

/*
USAGE DIRECTIONS:
    1. INSERT THIS FILE IN THE HEAD OF THE DESIRED HTML FILE(S)
    2. ADJUST ANY SETTINGS NECESSARY LATER IN THE HEAD USING (A) <SCRIPT> TAG(S) OR BELOW USING THE OBJECT fermataSettings
    3. CALL THE FUNCTION newFermata() IN THE BODY, WHERE YOU WANT THE PLAYER, USING THE FOLLOWING PARAMETERS (ALL STRINGS):
        i. THE ID WITH WHICH YOU WOULD LIKE TO REFER TO THE PLAYER AS A WHOLE
        ii. THE SOURCE OF THE SONG TO BE PLAYED
        iii. THE TITLE OF THE SONG
        iv. ADDITIONAL DATA TO GO IN A SECOND LINE, E.G. ARTIST(S), ALBUM TITLE, ETC.
*/

//SETUP VARS
var active = false;
var players = {};

//SETTINGS (MAY BE CHANGED HERE OR EXTERNALLY)
var fermataSettings = {
    font: "Muli",
    titleColor: "#888888",
    textColor: "#888888",
    bgColor: "#222222",
    pastBarColor: "#111111",
    positionBarColor: "#888888",
    fullBarColor: "#444444",
    buttonsColor: "#444444",
    buttonShapesColor: "#888888",
    margin: "2px",
    displayDuration: true,
};

//OTHER CONSTANTS (FOR ELEMENT CREATION)
var nothingEndings = [
    "title",
    "data",
    "fullbar",
    "curbar",
    "pastbar"
]

var resetEndings = [
    "rewind",
    "rewindline",
    "rewindtriangle"
];

var toggleEndings = [
    "playbutton",
    "playshape",
    "pauseline1",
    "pauseline2"
];

var muteEndings = [
    "volume",
    "volumebox",
    "volumetriangle",
    "volumeoff"
];

var divEndings = nothingEndings.concat(resetEndings).concat(toggleEndings).concat(muteEndings);
divEndings.push("ref");

//ALLOW CLICK TO DETERMINE SONG POSITION
document.onclick = function (e) {
    for (var x in players) {
        var mX = e.pageX - players[x].fullbar.getBoundingClientRect().left;
        var mY = e.pageY - players[x].fullbar.getBoundingClientRect().top;
        
        //ALLOW FOR SOME SLIGHT MISCLICKING (W = 200, H = 15)
        if (mY > -5 && mY < 20) {
            if (mX >= -5 && mX < 0) {
                mX = 0;
            } else if (mX <= 205 && mX > 200) {
                mX = 200;
            }
            if (mX >= 0 && mX <= 200) {
                players[x].song.currentTime = (mX/200)*players[x].song.duration; 
            }
        }
    }
}

//MAIN SETUP FUNCTION
var newFermata = function (id,src,title,data) {
    
    //SET UPDATE FUNCTION TO RUN
    active = true;
    
    //WRITE STYLES FOR THIS PLAYER TO PAGE
    document.write("<link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css?family=Muli'><style>#" + id + " {position: relative;background-color: " + fermataSettings.bgColor + ";color: " + fermataSettings.textColor + ";width: 400px;height: 165px;border-radius: 25px;font-family: " + fermataSettings.font + ", sans-serif;text-align: center;margin: " + fermataSettings.margin + ";}#" + id + "title {position: absolute;left: 25px;top: 18px;font-size: 32px;color: " + fermataSettings.titleColor + ";}#" + id + "data {top: 60px;position: absolute;font-size: 15px;left: 25px;}#" + id + "playbutton {position: absolute;left: 280px;top: calc(110px - 17.5px);background-color: " + fermataSettings.buttonsColor + ";width: 50px;height: 50px;border-radius: 50px;}#" + id + "playshape {position: absolute;top: 104px;left: 295px;width: 0; height: 0; border-top: 14.434px solid transparent;border-bottom: 14.434px solid transparent;border-left: 25px solid " + fermataSettings.buttonShapesColor + ";}#" + id + "rewind, #" + id + "volume {position: absolute;top: calc(110px - 7.5px);background-color: " + fermataSettings.buttonsColor + ";width: 30px;height: 30px;border-radius: 30px;}#" + id + "rewind {left: 240px;}#" + id + "rewindline {position: absolute;top: 111px;left: 249px;width: 2px; height: 13px;background-color: " + fermataSettings.buttonShapesColor + ";}#" + id + "rewindtriangle {position: absolute;top: 111px;left: 249px;width: 0; height: 0; border-top: 7.5px solid transparent;border-bottom: 7.5px solid transparent;border-right: 13px solid " + fermataSettings.buttonShapesColor + ";}#" + id + "pauseline1, #" + id + "pauseline2 {display: none;position: absolute;top: 106px;width: 6px; height: 25px;background-color: " + fermataSettings.buttonShapesColor + ";}#" + id + "pauseline1 {left: 295px;}#" + id + "pauseline2 {left: 309px;}#" + id + "volume {left: 340px;}#" + id + "fullbar {position: absolute;top: 110px;left: 25px;background-color: " + fermataSettings.fullBarColor + ";width: 200px;height: 15px;}#" + id + "curbar {position: absolute;top: 100px;left: calc(25px - 5px);width: 10px;height: 35px;background-color: " + fermataSettings.positionBarColor + ";z-index: 2;}#" + id + "pastbar {position: absolute;top: 110px;left: 25px;background-color: " + fermataSettings.pastBarColor + ";width: 0;height: 15px;z-index: 1;}#" + id + "volumebox {position: absolute;top: 114px;left: 347px;width: 6px; height: 8px;background-color: " + fermataSettings.buttonShapesColor + ";}#" + id + "volumetriangle {position: absolute;top: 109px;left: 347px;width: 0; height: 0; border-top: 9px solid transparent;border-bottom: 9px solid transparent;border-right: 13px solid " + fermataSettings.buttonShapesColor + ";}#" + id + "volumeoff {display: none;position: absolute;top: 102.5px;left: 352.5px;width: 3px; height: 28px;background-color: " + fermataSettings.buttonShapesColor + ";-moz-transform: rotate(-45deg);-webkit-transform: rotate(-45deg);transform: rotate(-45deg);border: 1px solid " + fermataSettings.buttonsColor + ";}#" + id + "ref {position: absolute;left: 92px;top: 135px;color: " + fermataSettings.textColor + ";font-size: 10px;text-decoration: none;</style>");
    
    //APPEND A PLAYER TO THE LIST
    players[id] = {
        "player": document.createElement("div"),
        "title": null,
        "data": null,
        "pastbar": null,
        "curbar": null,
        "fullbar": null,
        "playshape": null,
        "pauseline1": null,
        "pauseline2": null,
        "volumeoff": null,
        "song": new Audio(src),
        toggle: function () { //PLAYS AND PAUSES MUSIC
            var nowObject = players[this.parentElement.id]
            if (nowObject["song"].paused) {
                nowObject["song"].play();
                nowObject["pauseline1"].style.display = "block";
                nowObject["pauseline2"].style.display = "block";
                nowObject["playshape"].style.borderLeftStyle = "none";
            } else {
                nowObject["song"].pause();
                nowObject["pauseline1"].style.display = "none";
                nowObject["pauseline2"].style.display = "none";
                nowObject["playshape"].style.borderLeftStyle = "solid";
            }
        },
        reset: function () { //RESETS SONG TO 0:00
            players[this.parentElement.id]["song"].currentTime = 0;
        },
        mute: function () { //MUTES PLAYER
            var nowObject = players[this.parentElement.id];
            if (nowObject["song"].volume === 0) {
                nowObject["song"].volume = 1;
                nowObject["volumeoff"].style.display = "none";
            } else {
                nowObject["song"].volume = 0;
                nowObject["volumeoff"].style.display = "block";
            }
        }
    }
    players[id]["player"].id = id;
    
    //CREATE CHILDREN OF PLAYER DIV AND FILL CONTENTS OF PLAYER VAR
    for (var i = 0; i < divEndings.length; i++) {
        var now = document.createElement("div");
        now.id = id + divEndings[i];
        if (resetEndings.includes(divEndings[i])) {
            now.onclick = players[id].reset;
        } else if (toggleEndings.includes(divEndings[i])) {
            now.onclick = players[id].toggle;
        } else if (muteEndings.includes(divEndings[i])) {
            now.onclick = players[id].mute;
        }
        players[id]["player"].appendChild(now);
        if (nothingEndings.includes(divEndings[i]) || (toggleEndings.includes(divEndings[i]) && !(divEndings[i] === "")) || divEndings[i] === "volumeoff") {
            players[id][divEndings[i]] = now;
        }
        
    }
    
    //CREATE AND POPULATE LINK TO FERMATA.JS PAGE
    var ref = document.createElement("a");
    ref.id = id + "ref";
    ref.setAttribute('href', "https://danieldeanda.tech/fermata");
    ref.innerHTML = "Fermata Player";
    players[id]["player"].appendChild(ref);
    
    //SET PLAYER DETAILS
    players[id]["title"].innerHTML = title;
    players[id]["data"].innerHTML = data;
    if (fermataSettings.displayDuration) {
        players[id]["origdata"] = data;
    }
    
    //SEND PLAYER TO HTML
    var script = document.scripts[document.scripts.length - 1];
    script.parentElement.insertBefore(players[id]["player"], script);
    
}

//UPDATE PLAYERS
var update = function () {
    if (active) {
        for (var x in players) {
            //CALCULATE PERCENT DONE; UPDATE BARS
            var percent = players[x]["song"].currentTime/players[x]["song"].duration;
            players[x]["pastbar"].style.width = 200*percent + "px";
            players[x]["curbar"].style.left = ((200*percent)+25-5) + "px";
            
            //IF 100%, REPLACE PAUSE WITH PLAY (WILL RESTART SONG)
            if (percent === 1) {
                players[x]["pauseline1"].style.display = "none";
                players[x]["pauseline2"].style.display = "none";
                players[x]["playshape"].style.borderLeftStyle = "solid";
            }
            
            //IF DISPLAYING TIME (CREATED ORIGDATA), DO SO
            if (players[x]["origdata"]) {
                var totalSeconds = Math.round(players[x]["song"].duration)%60;
                var totalMinutes = Math.floor(Math.round(players[x]["song"].duration)/60);
                
                //ADD A ZERO TO MAKE TIME LOOK NATURAL
                if (totalSeconds < 10) {
                    totalSeconds = "0" + totalSeconds;
                }

                players[x]["data"].innerHTML = players[x]["origdata"] + " (" + totalMinutes + ":" + totalSeconds + ")";
            }
        }
    }
}

//SET UPDATE LOOP TO RUN
setInterval(update,25);