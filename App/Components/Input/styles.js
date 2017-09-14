import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  input: {
    flex: 2,
    marginLeft: Metrics.margin.medium,
    marginRight: Metrics.margin.medium,
    color: Colors.inputText,
    paddingRight: Metrics.margin.small,
    paddingLeft: Metrics.margin.Small,
    fontSize: Fonts.size.input,
    lineHeight: 23
  },

  label: {
    fontSize: Fonts.size.input,
    paddingLeft: Metrics.margin.xl,
    flex: 1
  },

  container: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
