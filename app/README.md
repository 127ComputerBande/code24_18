# ReactNativeSkeleton

## Usage

* Copy all files except the git files to your project folder
* run ```npm install``` in the remote directory of your project
* Rename your App with react-native-rename (https://www.npmjs.com/package/react-native-rename)
* Run ```brew update``` and ```brew install graphicsmagick``` in your console
* Replace the appIcon.png in ```app/assets/images/``` and run ```gulp build```

## IDE improvements

* To enable syntax highlighting for fastlane-related files (ruby) in Php- or WebStorm you can install this TextMate plugin: https://github.com/textmate/ruby.tmbundle

## Recommended settings

### Shell

#### React Native Debugger

Add the following line to your bashrc/zshrc file:  
```export REACT_DEBUGGER="open 'rndebugger://set-debugger-loc?port=8081'"```  
to open the React Native Debugger instead of Chrome