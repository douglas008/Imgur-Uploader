import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.slideMenuBackground
  },

  menuImg: {
    position: 'relative',
    marginTop: 20,
    width: null,
    height: 124,
    resizeMode: 'contain',
    tintColor: Colors.iconColor
  },

  btn: {
    paddingHorizontal: Metrics.marginXLarge,
    paddingVertical: Metrics.marginXLarge,
    borderBottomWidth: 1,
    borderColor: Colors.slideMenuBorder
  },

  btnBox: {
    flexDirection: 'row'
  },

  btnIcon: {
    height: 16,
    width: 16,
    tintColor: Colors.white
  },

  btnIconActive: {
    height: 16,
    width: 16,
    tintColor: Colors.accent
  },

  btnText: {
    paddingLeft: Metrics.marginXLarge,
    color: Colors.slideMenuText,
    fontSize: 16,
    lineHeight: 17,
    fontFamily: 'Roboto-Regular'
  },

  btnTextActive: {
    color: Colors.accent
  },
  tabPress: {
    backgroundColor: Colors.slideMenuActiveTint
  }
});
