# Tabbo
Chrome Tab Management Hotkeys!

## What is this??
Tabbo is a hotkeys management tool built specially for Google Chrome. It is built with the intention to be combined with other window management softwares to maximize productivity, and minimize the annoying mouse draggy, sometimes accidentally pop-offing, vanilla chrome UI/UX.

You can modify the hotkeys by navigating to chrome://settings/extensions/configureCommands in your chrome window.

The app features hotkeys for:
- moving tabs left and right
- popping tabs off of the current window
- sending tabs between windows (with custom UI)

We hope you all enjoy,

\- Tabbo team

## Disclaimer
Tabbo has access to the `"<all_urls>"` permission which gives it access to "All of your data". This allows the extension to take advantage of `captureVisibleTab` which allows you to see screenshots of your open windows (reference - https://developer.chrome.com/extensions/tabs). No data is being had.


#### How can I contribute??
If you have any ideas you'd like us to implement, you can make an issue and we can look into making it a reality!

Alternatively, if you'd like to implement it on your own, you are welcome to fork the repo and make a pull request. We will review in as timely a manner as we can.

## Working on the extension
### First Time
If this is your first time working on this then follow this section. Otherwise, you can skip ahead to the next section.

Before you begin, you will need Node.js and NPM installed on your machine.

1. Clone the repository and `cd` into it
2. Run `npm install` to install all the required packages
3. Run `npm install --only=dev` to install the required development packages
    1. This includes tools necessary to build the extension so that you don't have to install them globally and so that we can control the version

That should set you up with all the required pieces.

### Building
Make sure you followed the previous section before you proceed!

1. From the extension's main directory, run `./scripts/build.sh`
    1. This will run webpack to transpile the Typescript and then bundle it into the necessary files
    2. It also copies over any necessary files into `dist/unpacked`
    3. After copying over the files, it will zip them in to packaged version of the extension into `dist/packed`
    4. Finally, it will lint the extension using `addons-linter`

The build process here isn't great and bundling all the needed files during the webpack process is somewhere in the roadmap. This process will change dramatically as Webpack may be replaced with another tool.

## Creators
Original creators:
- [Dan Gorelick](https://github.com/dqgorelick)
- [Andy Wang](https://github.com/ownzandy)
- [Biggie Emmanuel](https://github.com/bigolu)

Continued Support:
- [Jun Woo Shin](https://github.com/jwoos)
