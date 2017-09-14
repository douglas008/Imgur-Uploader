import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  centerContentContainer: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: Colors.greyEF,
    position: 'relative',
    margin: Metrics.margin.medium,
    paddingTop: Metrics.margin.small,
    paddingBottom: Metrics.margin.small
  },

  headerText: {
    fontSize: Fonts.size.regular,
    color: Colors.grey9A,
    fontFamily: Fonts.type.robotoRegular,
    paddingBottom: Metrics.margin.small
  }
});
