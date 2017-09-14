import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: Metrics.margin.medium
  },

  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  progressView: {
    flex: 1,
    marginTop: Metrics.margin.xl,
    width: 200
  },

  spinnerContainer: {
    width: 40,
    height: 40
  },

  slider: {
    width: 200,
    height: 15,
    margin: Metrics.margin.small
  },

  leftIcon: {
    width: 35,
    height: 35,
    borderRadius: 0,
    tintColor: Colors.accent
  },

  rightIcon: {
    width: 25,
    height: 25,
    borderRadius: 0,
    tintColor: Colors.accent
  },

  leftButton: {
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: Colors.accent
  },

  leftButtonContainer: { margin: 0 },

  timeText: {
    marginLeft: 50,
    width: 35,
    fontSize: 9,
    color: Colors.grey9A
  }
});
