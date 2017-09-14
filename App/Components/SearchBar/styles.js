import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.smallMargin,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.baseMargin
  },

  searchInput: {
    flex: 5,
    height: Metrics.searchBarHeight,
    alignSelf: 'center',
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.instructions,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.snow,
    paddingLeft: 30,
    color: Colors.snow,
    flexDirection: 'row'
  },

  searchIcon: {
    left: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    tintColor: Colors.snow,
    backgroundColor: Colors.transparent
  },

  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin,
    marginRight: 50
  },

  buttonLabel: {
    color: Colors.snow,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.regular
  }
});
