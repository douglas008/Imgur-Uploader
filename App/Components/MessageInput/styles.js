import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  text: {
    color: Colors.inputText,
    fontSize: 14,
    fontFamily: Fonts.type.robotoRegular
  },

  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  messageInputContainer: {
    width: '90%',
    backgroundColor: Colors.transparent
  },

  fabImage: {
    height: 20,
    width: 20,
    borderRadius: 0,
    tintColor: '#FFF'
  },

  fabButton: {
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: '#222',
    borderColor: '#222'
  }
});
