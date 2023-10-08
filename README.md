# react-native-fontify

Dynamically load fonts in React Native! Elevate your UI with on-the-fly typography.

## Installation

```sh
npm install react-native-fontify
```

### iOS

```sh
npx pod-install ios
```

## Methods

```js
import { hasFont, registerFontFromFile } from 'react-native-fontify';
```

### `hasFont()`

Check if a font exists in the system.

```js
const result = await hasFont('Poppins'); // Check if the Poppins font exists in the system.
```

### `registerFontFromFile()`

Register a font file in the system.

```js
import RNFS from 'react-native-fs'; // Use the `react-native-fs` library to download and access the system's cache directory.

const [updated, setUpdated] = useState(false);

// iOS
const postScriptName = await registerFontFromFile(
  RNFS.CachesDirectoryPath + '/Poppins.ttf'
); // Load the Poppins font from the cache directory. This returns the postscript name of the font.

// Android
const postScriptName = await registerFontFromFile(
  RNFS.CachesDirectoryPath + '/Poppins.ttf',
  'Poppins', //Specify family name to be registered
); // Load the Poppins font from the cache directory. This returns the postscript name of the font.

const result = await hasFont(postScriptName); // True
setUpdated(true); // Make sure to update the state after registration.
```

If the font has already been registered, it returns the postScriptName.

Don't forget to update all `<Text />` or `<TextInput />` components to apply the new font.

## Error Code

| Code                          | Description                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| ERR_FILE_NOT_FOUND            | If the font has not been found on the given path                                    |
| ERR_FONT_LOAD                 | Error while loading a font file                                                     |
| ERR_FONT_REGISTRATION_UNKNOWN | Unknown error (check errorMessage for description)                                  |
| ERR_FONT_REGISTRATION         | Error while registering the font in the system (check errorMessage for description) |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
