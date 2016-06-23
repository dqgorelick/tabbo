(function(){
    $('.test_1').on('click',function() {
        console.log('one clicked!');
        console.log(windows.Window);
    });
    $('.test_2').on('click',function() {
        chrome.tabs.getCurrent(function(tab) {
            console.log("this", this);
            console.log("tab", tab);
        })
    });
    console.log("hello world");

})();
