import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import UnderlinedInput from '../UnderlinedInput';
import CircleImageButton from '../CircleImageButton';
import styles from './styles';
import { Colors, Images } from '../../Themes';

const propTypes = {
  errorHint: PropTypes.string,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  textInputStyle: Text.propTypes.style,
  selectionColor: PropTypes.string,
  underlineColor: PropTypes.string
};

const defaultProps = {
  errorHint: null,
  value: '',
  iterationCount: 0,
  secureTextEntry: false,
  placeholder: 'underlined input',
  autoCorrect: false,
  autoCapitalize: 'sentences', // enum('none', 'sentences', 'words', 'characters')
  onChangeText: () => console.log('Text Changed'),
  onSubmit: () => console.log('Pressed FAB'),
  containerStyle: {},
  textInputStyle: { color: Colors.inputText },
  selectionColor: Colors.accent,
  underlineColor: Colors.accent
};

class MessageQuestion extends React.Component {
  /* eslint-disable no-useless-constructor */
  constructor (props) {
    super(props);

    this.state = {
      showError: true
    };
  }

  componentWillReceiveProps (nextProps) {
    // if error hint is truthy(contains an error) set show error state to true
    if (nextProps.errorHint) {
      this.setState({ ...this.state, showError: true });
    }
  }

  showInput () {
    // After a time set showError to false to render the input field again.
    setTimeout(() => {
      this.setState({ ...this.state, showError: false });
    }, 2000);
  }

  renderInput () {
    // if error has not been shown and errorHint is not null return error message displaying error hint
    // else return normal input container
    if (this.state.showError && this.props.errorHint) {
      return (
        <Animatable.View onAnimationEnd={this.showInput()} animation='jello' style={styles.messageInputContainer}>
          <Text style={{ color: 'red' }}> {this.props.errorHint} </Text>
        </Animatable.View>
      );
    }
    return (
      <View style={styles.messageInputContainer}>
        <UnderlinedInput
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          placeholderTextColor={Colors.greyAE}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          style={[styles.text, this.props.textInputStyle]}
          underlineColor={this.props.underlineColor}
          selectionColor={this.props.selectionColor}
        />
      </View>
    );
  }

  render () {
    return (
      <View style={styles.messageContainer}>
        {this.renderInput()}
        <CircleImageButton
          containerStyle={{ margin: 5 }}
          imageStyle={styles.fabImage}
          onPress={this.props.onSubmit}
          buttonImage={Images.sendIcon}
          buttonImageUrl={''}
          buttonStyle={styles.fabButton}
        />
      </View>
    );
  }
}

MessageQuestion.propTypes = propTypes;
MessageQuestion.defaultProps = defaultProps;

export default MessageQuestion;
