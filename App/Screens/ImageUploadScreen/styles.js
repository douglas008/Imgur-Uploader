import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  image: {
    flex: 1,
    height: 300,
    width: Metrics.screenWidth,
  },
  label: {
    marginBottom: 10
  }
})
