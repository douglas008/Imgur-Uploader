// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    height: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: Metrics.margin.medium,
    paddingTop: Metrics.margin.small,
    paddingBottom: Metrics.margin.small
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.greyEF,
    position: 'relative'
  },

  text: {
    fontSize: Fonts.size.medium,
    color: Colors.greyAE,
    fontFamily: Fonts.type.robotoRegular,
    marginLeft: Metrics.margin.medium,
    marginRight: Metrics.margin.medium
  }
});
