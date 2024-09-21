import React from 'react';
import { StyleSheet, View } from 'react-native';
import Test from './src/components/Test';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Test type="tsx" name="Aki" date={21}/>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
