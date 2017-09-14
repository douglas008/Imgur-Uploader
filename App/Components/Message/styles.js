import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

const leftStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 0
  }
});

const rightStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 10
  }
});

const questionStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0
  }
});

const inputStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0
  }
});

const wrapperStyle = StyleSheet.create({
  left: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 60,
    marginLeft: 10,
    minHeight: 20,
    justifyContent: 'flex-end'
  },

  right: {
    borderRadius: 20,
    backgroundColor: '#E5EAEB',
    marginLeft: 60,
    marginRight: 10,
    minHeight: 20,
    justifyContent: 'flex-end'
  },

  question: {
    borderRadius: 20,
    backgroundColor: Colors.accent,
    minHeight: 20,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 20,
    backgroundColor: Colors.accent,
    minHeight: 20,
    justifyContent: 'flex-start'
  }
});

const textStyle = {
  fontSize: 14,
  lineHeight: 20,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 20,
  marginRight: 20,
  fontFamily: Fonts.type.robotoRegular
};

const messageTextStyle = {
  left: {
    color: '#36373E',
    ...textStyle
  },

  right: {
    color: '#AAB0B1',
    ...textStyle
  }
};

export default {
  left: leftStyle,
  right: rightStyle,
  question: questionStyle,
  input: inputStyle,
  wrapper: wrapperStyle,
  messageText: messageTextStyle,

  url: {
    color: Colors.greyAE,
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 10,
    marginLeft: 36,
    marginRight: 60,
    fontFamily: Fonts.type.robotoRegular
  },

  btnChevronContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },

  btnChevron: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 16,
    width: 16,
    marginRight: 16,
    resizeMode: 'contain',
    tintColor: Colors.accent
  }
};
