import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { NetworkContext } from '../../contexts';
import { height, width } from '../../lib/window';
import { COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    width,
    height,
    backgroundColor: COLOR.WHITE,
    opacity: 0.5,
  },
  container: {
    position: 'absolute',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function NetworkPanel() {
  const { networkState } = React.useContext(NetworkContext);
  const isCommunicating = React.useMemo(() => networkState > 0, [networkState]);
  if (!isCommunicating) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.dropdown} />
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLOR.MAIN_LIGHT} />
      </SafeAreaView>
    </>
  );
}
