import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover'
  },

  button: {
    borderWidth: 1,
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.white
  }
});
