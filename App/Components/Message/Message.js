import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { select } from '../../Redux/MessagesRedux';
import Bubble from '../Bubble';
import styles from './styles';
import { Colors, Images } from '../../Themes';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  renderBubble: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right', 'question', 'input']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
    question: ViewPropTypes.style,
    input: ViewPropTypes.style
  })
};

const defaultProps = {
  navigation: {},
  renderBubble: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  validation: 'any'
};

class Message extends React.Component {
  constructor (props) {
    super(props);
    this.messageSelected = this.messageSelected.bind(this);
  }

  // componentWillUnmount () {
  //   this.props = {
  //     navigation: {},
  //     renderBubble: null,
  //     position: 'left',
  //     currentMessage: {},
  //     nextMessage: {},
  //     previousMessage: {},
  //     containerStyle: {}
  //   };
  // }

  getInnerComponentProps () {
    return this.props;
  }

  messageSelected () {
    const { url } = this.props.currentMessage;

    this.props.selectMessage(this.props.currentMessage);
    console.log('Selected: %s', JSON.stringify(this.props.currentMessage));

    if (url) {
      const screenProps = { url };
      console.log('Go To Web: %s', url);
      this.props.navigation.navigate('Web', screenProps);
    }
  }

  isSameMessageType (currentMessage = {}, diffMessage = {}) {
    return !!(diffMessage.type &&
      currentMessage.type &&
      diffMessage.type === currentMessage.type);
  }

  renderBubble () {
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return (
      <Bubble
        wrapperStyle={styles.wrapper}
        questionTextStyle={{ color: Colors.messageQuestionText }}
        ellipsisTextStyle={{ color: Colors.primary }}
        messageTextStyle={styles.messageText}
        onQuestionPress={this.props.onQuestionPress}
        inputTextSecureTextEntry={false}
        inputTextPlaceholder={this.props.inputTextPlaceholder}
        inputTextAutoCorrect={false}
        inputTextAutoCapitalize={'words'}
        inputTextValue={this.props.inputTextValue}
        inputTextOnChangeText={this.props.onInputTextChanged}
        inputTextOnSubmit={this.props.onInputTextSubmit}
        inputTextTextInputStyle={{ color: Colors.inputText, fontSize: 10 }}
        inputTextSelectionColor={Colors.accent}
        inputTextUnderlineColor={Colors.accent}
        {...bubbleProps}
      />
    );
  }

  renderUrl () {
    if (this.props.currentMessage.url) {
      const displayUrl = this.props.currentMessage.url.replace(
        /(^\w+:|^)\/\//,
        ''
      );
      return (
        <View>
          <Text style={styles.url}>
            {displayUrl}
          </Text>
        </View>
      );
    }
  }

  renderChevron () {
    if (this.props.currentMessage.url) {
      return (
        <TouchableOpacity onPress={this.messageSelected}>
          <View style={styles.btnChevronContainer}>
            <Image style={styles.btnChevron} source={Images.chevronRight} />
          </View>
        </TouchableOpacity>
      );
    }
  }

  render () {
    return (
      <View>
        <View
          style={[
            styles[this.props.position].container,
            {
              paddingTop: this.props.currentMessage.index === 0 ? 10 : 0,
              marginBottom: this.isSameMessageType(
                this.props.currentMessage,
                this.props.nextMessage
              ) || this.props.currentMessage.url
                ? 4
                : 10
            },
            this.props.containerStyle[this.props.position]
          ]}
        >
          {this.renderBubble()}
          {this.renderChevron()}
        </View>
        {this.renderUrl()}
      </View>
    );
  }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

const mapStateToProps = state => {
  const messages = state.messagesReducer.messages;
  return {
    listData: messages,
    message: messages.message
  };
};

const mapDispatchToProps = dispatch => ({
  selectMessage: () =>
    dispatch(select())
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
