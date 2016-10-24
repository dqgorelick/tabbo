var toSendId = window.location.hash.slice(1);
chrome.windows.getAll({populate:true},function(windows){
    chrome.windows.getCurrent(function(currentWindow) {
        var count = 1;
        windows.forEach(function(eachWindow) {
            if (windows.length === 1) {
                $("#open-windows").append("<h1>No other open windows.</h1>")
            } else if(eachWindow.id !== currentWindow.id) {
                chrome.tabs.captureVisibleTab(eachWindow.id, {quality: 50}, function (image) {
                    Mousetrap.bind(count.toString(), function () {
                        selectWindow(eachWindow, toSendId)
                    });
                    $("#open-windows").append(function() {
                        var element;
                        eachWindow.tabs.forEach(function(tab) {
                            if (tab.active) {
                                element = $(
                                    "<div class='screenshot' style='background-image:url(" + image + ")''>" +
                                        "<div class='title-bar'>" +
                                            "<img src='" + tab.favIconUrl + "'/>" +
                                            "<div class='screen-title'>" + tab.title + "</div>" +
                                        "</div>" +
                                        "<div class='screen-index'>" + count + "</div>" +
                                        "<div class='tab-count'>" +
                                            eachWindow.tabs.length + (eachWindow.tabs.length === 1 ? " tab" : " tabs") +
                                        "</div>" +
                                    "</div>"
                                );
                                count++;
                            }
                        })
                        element.on('click', function() {
                            selectWindow(eachWindow, toSendId);
                        });
                        return element;
                    });
                });
            }
        });
        chrome.tabs.get(parseInt(toSendId), function(tab){
            document.title = "SENDING TAB";
            var sendingTitle = false;
            setInterval(function() {
                if(sendingTitle) {
                    document.title = "SENDING TAB";
                } else {
                    document.title = '"' + tab.title + '"';
                }
                sendingTitle = !sendingTitle;
            }, 1250);
            $("#current-tab").html(function() {
                return $(
                "<div class='title-bar'>" +
                    "<img src='" + tab.favIconUrl + "'/>" +
                    "<div class='screen-title'>" + tab.title + "</div>" +
                "</div>");
            })
        })
    });
});

Mousetrap.bind("escape", function() {
    chrome.tabs.getSelected(function(tab){
        chrome.tabs.remove(tab.id);
    });
});

$("#cancel").click(function() {
    chrome.tabs.getSelected(function(tab){
        chrome.tabs.remove(tab.id);
    });
})

function selectWindow(eachWindow, toSendId) {
    chrome.tabs.getSelected(function(tab){
        chrome.tabs.remove(tab.id);
    });
    sendTab(eachWindow.id, parseInt(toSendId));
}

function sendTab(windowId, tabId) {
    chrome.tabs.move(tabId, {windowId: windowId, index: -1});
}

var port = chrome.extension.connect({name: "tabbo in we go!"});

$("#keybinds").click(function() {
    port.postMessage("keybinds");
})

