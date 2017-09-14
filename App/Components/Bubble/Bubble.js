import React from 'react';
import {
  Alert,
  Clipboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import MessageText from '.././MessageText';
import MessageImage from '.././MessageImage';
import MessageInput from '.././MessageInput';
import MessageQuestion from '.././MessageQuestion';
import MessageEllipsis from '.././MessageEllipsis';
import styles from './styles';
import { Colors } from '../../Themes';

const propTypes = {
  onLongPress: PropTypes.func,
  touchableProps: PropTypes.object,
  onQuestionPress: PropTypes.func,
  renderMessageImage: PropTypes.func,
  renderMessageInput: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderMessageQuestion: PropTypes.func,
  renderMessageEllipsis: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right', 'question', 'input']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  wrapperStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  messageTextStyle: PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style
  }),
  containerToNextStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  ellipsisTextStyle: Text.propTypes.style,
  questionTextStyle: Text.propTypes.style,
  inputTextValue: PropTypes.any,
  inputTextSecureTextEntry: PropTypes.bool,
  inputTextPlaceholder: PropTypes.string,
  inputTextAutoCorrect: PropTypes.bool,
  inputTextAutoCapitalize: PropTypes.string,
  inputTextOnChangeText: PropTypes.func,
  inputTextOnSubmit: PropTypes.func,
  inputTextContainerStyle: ViewPropTypes.style,
  inputTextTextInputStyle: Text.propTypes.style,
  inputTextSelectionColor: PropTypes.string,
  inputTextUnderlineColor: PropTypes.string
};

const defaultProps = {
  touchableProps: {},
  onLongPress: null,
  onQuestionPress: null,
  renderMessageImage: null,
  renderMessageInput: null,
  renderMessageText: null,
  renderMessageQuestion: null,
  renderMessageEllipsis: null,
  position: 'left',
  currentMessage: {
    value: null,
    type: null,
    image: null
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  messageTextStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
  ellipsisTextStyle: { color: Colors.primary },
  questionTextStyle: { color: Colors.messageQuestionText },
  inputTextValue: '',
  inputTextSecureTextEntry: false,
  inputTextPlaceholder: 'underlined input',
  inputTextAutoCorrect: false,
  inputTextAutoCapitalize: 'sentences', // enum('none', 'sentences', 'words', 'characters')
  inputTextOnChangeText: () => console.log('Input Text Changed'),
  inputTextOnSubmit: () => console.log('Input Text Submitted'),
  inputTextContainerStyle: {},
  inputTextTextInputStyle: { color: Colors.inputText },
  inputTextSelectionColor: Colors.accent,
  inputTextUnderlineColor: Colors.accent
};

class Bubble extends React.Component {
  constructor (props) {
    super(props);

    this.onLongPress = this.onLongPress.bind(this);
  }

  onLongPress () {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage);
    } else if (this.props.currentMessage.value) {
      Alert.alert(
        'Copy Text',
        `Do you want to copy the text to your clipboard: ${this.props.currentMessage.value}`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Copy',
            onPress: () => {
              console.log('Copy Pressed');
              Clipboard.setString(this.props.currentMessage.value);
            }
          }
        ],
        { cancelable: true }
      );
    }
  }

  isSameMessageType (currentMessage = {}, diffMessage = {}) {
    return !!(diffMessage.type &&
      currentMessage.type &&
      diffMessage.type === currentMessage.type);
  }

  handleBubbleToNext () {
    if (
      this.isSameMessageType(this.props.currentMessage, this.props.nextMessage)
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToNext,
        this.props.containerToNextStyle[this.props.position]
      ]);
    }
    return null;
  }

  handleBubbleToPrevious () {
    if (
      this.isSameMessageType(
        this.props.currentMessage,
        this.props.previousMessage
      )
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToPrevious,
        this.props.containerToPreviousStyle[this.props.position]
      ]);
    }
    return null;
  }

  renderMessageText () {
    if (this.props.currentMessage.value) {
      const { ...messageTextProps } = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return (
        <MessageText
          textStyle={this.props.messageTextStyle}
          {...messageTextProps}
        />
      );
    }
    return null;
  }

  renderMessageImage () {
    if (this.props.currentMessage.image) {
      const { ...messageImageProps } = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <MessageImage {...messageImageProps} />;
    }
    return null;
  }

  renderQuestion (messageQuestionProps, partItem) {
    console.log(partItem);
    return (
      <View
        style={[
          styles[this.props.position].wrapper,
          this.props.wrapperStyle[this.props.position]
        ]}
      >
        <TouchableOpacity
          onLongPress={this.onLongPress}
          onPress={this.props.onQuestionPress.bind(
            this,
            this.props.currentMessage,
            partItem
          )}
          accessibilityTraits='text'
          {...this.props.touchableProps}
        >
          <View>
            <MessageQuestion
              textStyle={this.props.questionTextStyle}
              item={partItem}
              {...messageQuestionProps}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderMessageQuestions () {
    if (this.props.currentMessage.type === 'question') {
      const { ...messageQuestionProps } = this.props;
      if (this.props.renderMessageQuestion) {
        return this.props.renderMessageQuestion(messageQuestionProps);
      }

      if (this.props.currentMessage.answers) {
        if (this.props.currentMessage.answers.length > 1) {
          return (
            <View style={styles.questionContainer}>
              {this.renderQuestion(
                messageQuestionProps,
                this.props.currentMessage.answers[0]
              )}
              {this.renderQuestion(
                messageQuestionProps,
                this.props.currentMessage.answers[1]
              )}
            </View>
          );
        }
        return this.renderQuestion(
          messageQuestionProps,
          this.props.currentMessage.answers[0]
        );
      }
    }
    return null;
  }

  renderMessageInput () {
    if (this.props.currentMessage.type === 'input') {
      const { ...messageInputProps } = this.props;
      if (this.props.renderMessageInput) {
        return this.props.renderMessageInput(messageInputProps);
      }
      return (
        <View style={styles.inputContainer}>
          <MessageInput
            errorHint={this.props.currentMessage.errorHint}
            secureTextEntry={this.props.inputTextSecureTextEntry}
            placeholder={this.props.inputTextPlaceholder}
            autoCorrect={this.props.inputTextAutoCorrect}
            autoCapitalize={this.props.inputTextAutoCapitalize}
            value={this.props.inputTextValue}
            onChangeText={this.props.inputTextOnChangeText}
            onSubmit={this.props.inputTextOnSubmit.bind(
              this,
              this.props.currentMessage
            )}
            containerstyle={this.props.inputTextContainerStyle}
            textInputStyle={this.props.inputTextTextInputStyle}
            underlineColor={this.props.inputTextUnderlineColor}
            selectionColor={this.props.inputTextSelectionColor}
            {...messageInputProps}
          />
        </View>
      );
    }
    return null;
  }

  renderMessageEllipsis () {
    if (this.props.currentMessage.type === 'ellipsis') {
      const { ...messageEllipsisProps } = this.props;
      if (this.props.renderMessageEllipsis) {
        return this.props.renderMessageEllipsis(messageEllipsisProps);
      }

      return (
        <MessageEllipsis
          textStyle={this.props.ellipsisTextStyle}
          {...messageEllipsisProps}
        />
      );
    }
    return null;
  }

  render () {
    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle[this.props.position]
        ]}
      >
        <View
          style={[
            styles[this.props.position].wrapper,
            this.props.wrapperStyle[this.props.position],
            this.handleBubbleToNext(),
            this.handleBubbleToPrevious()
          ]}
        >
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
            accessibilityTraits='text'
            {...this.props.touchableProps}
          >
            <View>
              {this.renderMessageImage()}
              {this.renderMessageText()}
              {this.renderMessageEllipsis()}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.renderMessageInput()}
        {this.renderMessageQuestions()}
      </View>
    );
  }
}

Bubble.propTypes = propTypes;
Bubble.defaultProps = defaultProps;

export default Bubble;
