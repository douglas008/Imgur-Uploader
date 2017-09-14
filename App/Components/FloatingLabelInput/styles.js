import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginLeft: Metrics.margin.medium,
    marginRight: Metrics.margin.medium
  },

  label: {
    backgroundColor: 'transparent',
    color: Colors.greyAE
  },

  textInput: {
    alignSelf: 'center',
    bottom: 0,
    left: 0,
    top: Metrics.margin.medium,
    paddingTop: Metrics.margin.large,
    paddingLeft: 0,
    color: Colors.primaryDark,
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.robotoRegular
  },

  underline: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.accent
  }
});
