import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Metrics.radius.medium,
    borderColor: Colors.cardBorder,
    borderBottomWidth: 0,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radius.medium,
    elevation: 1,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.cardBackground
  }
});
