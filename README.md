### Tab Management Hotkeys

TODO:
- Create issues pages for each of the bullets
- Make extension work for both hotkeys and mouse
- Tabs:

  - Move tab between open windows
  - Pop tab off to send to a new window
  - Move tab within window
  - Shift tab left and right (when reaching the end it will pop off)
  - Move multiple tabs at once (think long and hard about this one)

- Windows:
  - Think about the new window positions
  - Control window positions

- Keybinds:
  - Have options to set keybinds
  - Show keybinds whenver possible
  - not too much window management

- Extras:
  - Have advanced mode where keybinds and extra HUDs don't show up
  - Show snapshots of what the windows look like
  - Have window screenshots appear
  - REACT EVERYTHING!

```
// this lists all of the windows and all of the tabs
chrome.windows.getAll({populate:true},function(windows){
  windows.forEach(function(window){
    window.tabs.forEach(function(tab){instead
      console.log("window ID", tab.windowId, "Tab ID", tab.id);
    });
  });
});
// this moves a tab between windows (get the ids from the above function)
chrome.tabs.move(1227, {windowId: 1067, index: -1}, function(){console.log("done!")})
```
