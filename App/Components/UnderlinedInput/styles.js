import { Colors, Metrics } from '../../Themes';

export default {
  underlinedInput: {
    flex: 1,
    color: Colors.inputText,
    paddingRight: Metrics.marginSmall,
    paddingLeft: Metrics.marginSmall,
    fontSize: 14,
    lineHeight: 20
  },

  iosContainer: {
    height: 40,
    flex: 1,
    marginLeft: Metrics.marginMedium,
    marginRight: Metrics.marginMedium,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent
  },

  androidContainer: {
    height: 40,
    flex: 1,
    marginLeft: Metrics.marginMedium,
    marginRight: Metrics.marginMedium,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
