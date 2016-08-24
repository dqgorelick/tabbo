var port = chrome.extension.connect({name: "popup"});

$("#keybinds").click(function() {
    port.postMessage("keybinds");
});

$("#instructions").click(function() {
    port.postMessage("instructions");
});

$("#pop").click(function() {
    port.postMessage("pop");
});

$("#send").click(function() {
    port.postMessage("send");
});

$("#join").click(function() {
    port.postMessage("join");
});

var bonusClicked = 0;
$("#bonus").click(function() {
    bonusClicked+=1;
    if (bonusClicked === 1) {
        $("#bonus").html("stop it");
    } else if (bonusClicked === 2) {
        $("#bonus").html("I'm warning you");
    } else if (bonusClicked === 3) {
        $("#bonus").html("last warning...");
    }
    if (bonusClicked > 3) {
        $("#bonus").html("explode!!");
        port.postMessage("explode");
    }
});
