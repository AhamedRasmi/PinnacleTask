import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductList from './src/screens/ProductList';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    medium: require('./assets/fonts/Inter-Medium.ttf'),
    semibold: require('./assets/fonts/Inter-SemiBold.ttf'),
    extrabold: require('./assets/fonts/Inter-ExtraBold.ttf')
  });

  if (!fontsLoaded) {
    return undefined
  }

  return (
    <View style={styles.container}>
      <ProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
