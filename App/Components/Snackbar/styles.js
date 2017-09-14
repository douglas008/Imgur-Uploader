import { StyleSheet } from 'react-native';
import { Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 14,
    paddingBottom: 14
  },

  messageText: {
    fontSize: Fonts.size.medium,
    flex: 1
  },

  actionText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.robotoRegular
  }
});
