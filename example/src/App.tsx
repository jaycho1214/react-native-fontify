import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import RNFS from 'react-native-fs';
import { hasFont, registerFontFromFile } from 'react-native-fontify';

export default function App() {
  const [postScriptName, setPostScriptName] = React.useState<string | null>(
    null
  );
  const [downloading, setDownloading] = React.useState<boolean>(false);

  const refresh = React.useCallback(() => {
    setPostScriptName(null);
    hasFont('Pixelify Sans').then((value) => {
      setPostScriptName(value ? 'PixelifySans-Regular' : null);
    });
  }, []);

  const download = React.useCallback(() => {
    setDownloading(true);
    const { promise } = RNFS.downloadFile({
      fromUrl:
        'https://github.com/eifetx/Pixelify-Sans/raw/main/fonts/variable/PixelifySans%5Bwght%5D.ttf',
      toFile: RNFS.CachesDirectoryPath + '/PixelifySans.ttf',
    });
    promise.then(() => {
      setDownloading(false);
    });
  }, []);

  const register = React.useCallback(() => {
    registerFontFromFile(
      RNFS.CachesDirectoryPath + '/PixelifySans.ttf',
      'Pixelify Sans'
    ).then((name) => {
      setPostScriptName(name);
    });
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Text key={Math.random()} style={styles.text}>
        Pixelify Sans
      </Text>
      <Text>Has Pixelify Sans Font: {postScriptName ? 'Yes' : 'No'}</Text>
      <Text>Post Script Name: {String(postScriptName)}</Text>
      <Button title="Refresh" onPress={refresh} />
      {downloading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Download" onPress={download} />
      )}
      <Button title="Register" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  text: {
    fontFamily: 'Pixelify Sans',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
