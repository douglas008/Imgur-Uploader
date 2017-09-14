import { StyleSheet, Platform } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  btnMenu: {
    height: 60,
    width: 60,
    alignSelf: 'flex-start'
  },
  // position: absolute allows for right: 10 but means we must add paddingTop
  btnTopRight: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    position: 'absolute',
    right: 10
  },
  rightImage: {
    height: 30,
    width: 30,
  },
  title: {
    color: Colors.navHeaderText,
    marginLeft: Metrics.marginLarge,
    fontSize: 18,
    fontFamily: 'Roboto-Medium'
  }
});
