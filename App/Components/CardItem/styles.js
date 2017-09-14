import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: Metrics.margin.small,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: Colors.cardBorder,
    position: 'relative'
  }
});
