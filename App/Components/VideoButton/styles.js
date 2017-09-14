import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: Colors.buttonText,
    fontSize: 16,
    fontFamily: Fonts.type.robotoRegular,
    paddingTop: 10,
    paddingBottom: 10
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 200,
    minHeight: 120,
    borderRadius: 13,
    margin: 5,
    resizeMode: 'cover'
  },
  centerCircleButton: {
    position: 'absolute'
  },
  durationText: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    backgroundColor: 'transparent',
    color: Colors.white
  }
});
