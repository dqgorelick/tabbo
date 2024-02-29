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

1. From the extension's main directory, run `npm run build` OR `./scripts/build.sh`
  1. This will do the transpilation, bundling, and resolving paths via Parcel.
2. You can load this unpacked extension - process will vary per browser so look up loading development extensions.
3. If you wish to pack it into an extension run, run `npm run pack` OR `./scripts/pack.sh`
  1. This will pack it into a single file - it's just a zip file
4. You can load this as an extension :)

The build process here isn't great and bundling all the needed files during the webpack process is somewhere in the roadmap. This process will change dramatically as Webpack may be replaced with another tool.

### Testing
Testing is pretty bare but it exists!

`npm test`

### Linting
There are also linting tools:
- lint extension: `./scripts/lint-package.sh`
- lint typescript code: `./scripts/lint-typescript.sh`

## Creators
Original creators:
- [Dan Gorelick](https://github.com/dqgorelick)
- [Andy Wang](https://github.com/ownzandy)
- [Biggie Emmanuel](https://github.com/bigolu)

Continued Support:
- [Jun Woo Shin](https://github.com/jwoos)
