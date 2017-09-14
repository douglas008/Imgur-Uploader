import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  centerContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerText: {
    fontSize: Fonts.size.h5,
    color: Colors.primaryDark,
    fontFamily: Fonts.type.robotoRegular,
    paddingBottom: Metrics.margin.small
  }
});
