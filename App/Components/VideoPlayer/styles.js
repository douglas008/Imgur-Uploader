import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  sliderContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 5,
    paddingBottom: 5
  },
  slider: {
    flex: 1,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 15
  },
  currentTime: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    backgroundColor: 'transparent'
  },
  currentTimeText: {
    fontSize: 12,
    color: Colors.grey66
  },
  backImage: {
    height: 50,
    width: 50
  },
  topBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50
  }
});
