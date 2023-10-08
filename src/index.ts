import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-fontify' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Fontify = NativeModules.RNFontify
  ? NativeModules.RNFontify
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function hasFont(fontName: string): Promise<boolean> {
  return Fontify.hasFont(fontName);
}
export function registerFontFromFile(
  path: string,
  fontName?: string
): Promise<string> {
  if (Platform.OS === 'android' && fontName == null) {
    throw Error('`fontName` must be specified');
  }
  if (Platform.OS === 'android') {
    return Fontify.registerFontFromFile(path, fontName);
  }
  if (Platform.OS === 'ios') {
    return Fontify.registerFontFromFile(path);
  }
  throw Error('Functionality available only on iOS and Android.');
}
