import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: Colors.buttonText,
    fontSize: 16,
    paddingTop: 10,
    fontFamily: Fonts.type.robotoRegular,
    paddingBottom: 10
  },

  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.accent,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.accent,
    marginLeft: 5,
    marginRight: 5
  }
});
