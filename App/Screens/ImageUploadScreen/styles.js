import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    height: 300,
    width: Metrics.screenWidth,
    marginBottom: 20
  },
  label: {
    marginBottom: 10
  },
  spinner: {
    position: 'absolute',
    flex: 1
  }
})
