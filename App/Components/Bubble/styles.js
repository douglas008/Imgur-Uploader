import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

const leftStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start'
  },
  wrapper: {
    borderRadius: 20,
    backgroundColor: Colors.bubbleLeftBackground,
    marginRight: 60,
    marginLeft: Metrics.margin.medium,
    minHeight: 20,
    justifyContent: 'flex-end'
  },
  containerToNext: {
    borderBottomLeftRadius: 3
  },
  containerToPrevious: {
    borderTopLeftRadius: 3
  }
});

const rightStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end'
  },
  wrapper: {
    borderRadius: 20,
    backgroundColor: Colors.bubbleRightBackground,
    marginLeft: 60,
    marginRight: Metrics.margin.medium,
    minHeight: 20,
    justifyContent: 'flex-end'
  },
  containerToNext: {
    borderBottomRightRadius: 3
  },
  containerToPrevious: {
    borderTopRightRadius: 3
  }
});

const questionStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    borderRadius: 20,
    backgroundColor: Colors.accent,
    minHeight: 20,
    marginLeft: Metrics.margin.medium,
    marginRight: Metrics.margin.medium,
    justifyContent: 'center'
  },
  containerToNext: {
    borderBottomRightRadius: 3
  },
  containerToPrevious: {
    borderTopRightRadius: 3
  }
});

const inputStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.white,
    minHeight: 20,
    marginLeft: Metrics.margin.xl,
    marginRight: Metrics.margin.xl
  },
  containerToNext: {
    borderBottomRightRadius: 3
  },
  containerToPrevious: {
    borderTopRightRadius: 3
  }
});

export default {
  left: leftStyle,
  right: rightStyle,
  question: questionStyle,
  questionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: inputStyle,
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: Metrics.margin.medium
  }
};
