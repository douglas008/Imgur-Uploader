import React from 'react';
import { ListView, View, ScrollView } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'md5';
import shallowequal from 'shallowequal';
import Message from '../Message';
import MessagesActions from '../../Redux/MessagesRedux';
import MessageSpace from '../MessageSpace';
import AnimatedListRow from '../AnimatedListRow';
import styles from './styles';
import { ValidateText } from '../../Utils/TextUtils';

const animationTime = 450;
const processDelayTime = 900;
const scrollDelayTime = 200;

const propTypes = {
  navigation: PropTypes.object.isRequired,
  messages: PropTypes.array,
  responseData: PropTypes.array,
  renderMessage: PropTypes.func,
  listViewProps: PropTypes.object,
  time: PropTypes.number,
  animation: PropTypes.string,
  animationFunc: PropTypes.func,
  listData: PropTypes.array
};

const defaultProps = {
  navigation: null,
  messages: [],
  responseData: [], // array of key value objects which holds all user responses
  renderMessage: null,
  listViewProps: {},
  time: animationTime,
  animation: 'scale',
  animationFunc: null,
  listData: []
};

class MessageList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      refreshing: false,
      rowToDelete: null,
      dataSource: null,
      newInput: ''
    };

    // 'this' must be bound to the method because it is parsed to the listview component
    // and therefor must have context of where it can be found when called.
    this.onEndReached = this.onEndReached.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onQuestionPress = this.onQuestionPress.bind(this);
    this.onInputTextSubmit = this.onInputTextSubmit.bind(this);
    this.onAfterRemovingElement = this.onAfterRemovingElement.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renderScrollComponent = this.renderScrollComponent.bind(this);
    this.lastResponse = {};
    this.scrolledToEnd = false;
    this.initiateDataSource();
  }

  componentWillMount () {
    // Just before component mounts
  }

  // Component has mounted
  componentDidMount () {
    // Calls redux method loadMessages which reads the json
    // and returns it into this.props.listData(check mapStateToProps)
    this.props.loadMessages();
    this.processMessages(processDelayTime);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.messages === nextProps.messages) {
      return;
    }
    this.updateDataSource({ listData: nextProps.messages });
  }

  // Only updates the component if the next state is different to the current state
  shouldComponentUpdate (nextProps, nextState) {
    if (!shallowequal(this.props, nextProps)) {
      return true;
    }
    if (!shallowequal(this.state, nextState)) {
      return true;
    }
    return false;
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.rowToDelete !== null) {
      this.props.messages = this.props.messages.filter(message => {
        if (message !== nextState.rowToDelete) {
          return message;
        }
        return null;
      });
    }
  }

  componentWillUnmount () {
    TimerMixin.clearTimeout(this.scrollTimer);
    TimerMixin.clearTimeout(this.ellipsisTimer);
    this.clearMessagesState();
  }

  onInputTextSubmit (message) {
    let newMessages = null;
    let errorHint = null;
    // Finds the current message being submitted by message.id changes the type to response
    // map runs a function on each element in the array
    newMessages = this.messages.map(newMessage => {
      if (newMessage.id === message.id) {
        const aMessage = newMessage;
        // if input is not optional or there is some input (newInput is truthy) then run ValidateText on it.
        if (!aMessage.optional || this.state.newInput) {
          errorHint = ValidateText(aMessage.dataType, this.state.newInput);
        }
        if (errorHint == null) {
          aMessage.type = 'response';
          aMessage.errorHint = null;
          aMessage.value = this.state.newInput;
          this.lastResponse = aMessage;
          this.addToResponseData(aMessage.key, aMessage.value);
          return aMessage;
        }
        aMessage.errorHint = errorHint;
        return aMessage;
      }
      return newMessage;
    });

    // if error hint is truthy
    if (errorHint) {
      this.setState({ ...this.state, currentMessage: message });
      this.updateDataSource({ listData: newMessages });
    } else {
    // Publish updates and continue with messages(no error)
      this.setState({ ...this.state, newInput: null, currentMessage: message });
      this.updateDataSource({ listData: newMessages });
      this.processMessages(100);
    }
  }

  onQuestionPress (message, partItem) {
    // Update the array
    const newMessages = this.messages.map(newMessage => {
      if (newMessage.id === message.id) {
        const aMessage = newMessage;
        aMessage.type = 'response';
        aMessage.value = partItem.text;
        aMessage.answerId = partItem.answerId;
        this.addToResponseData(aMessage.id, aMessage.answerId);
        this.lastResponse = aMessage;
        return aMessage;
      }
      return newMessage;
    });

    // Publish updates
    this.updateDataSource({ listData: newMessages });
    this.processMessages(100);
  }

  // Used to remove ellipsis
  onAfterRemovingElement () {
    // resets row to delete back to null and updates the datasource with the new this.messages
    this.setState({
      rowToDelete: null
    });
    this.updateDataSource({ listData: this.messages });
  }

  onEndReached () {
    const index = this.messages.length;
    if (index >= this.props.listData.length) {
      this.stopProcessingMessages();
    } else if (index === 1 && !this.scrolledToEnd) {
      // We only want to scroll to the end once for the first item
      this.scrolledToEnd = true;
      this.scrollToEnd({ animated: false });
    }
  }

  addToResponseData (key, value) {
    // Add key value as an object to responseData array
    console.log('key:', key);
    console.log('value:', value);
    const response = { key, value };
    console.log('response:', response);
    this.props.responseData.push(response);
    console.log('responseData:', this.props.responseData);
  }

  handleTextInputChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
    // If current message is truthy set the error hint to null while the user types
    if (this.state.currentMessage) {
      const newMessages = this.messages.map(newMessage => {
        if (newMessage.id === this.state.currentMessage.id) {
          const aMessage = newMessage;
          aMessage.errorHint = null;
          return aMessage;
        }
        return newMessage;
      });
      this.updateDataSource({ listData: newMessages });
    }
  };

  clearMessagesState () {
    // supposedly resets the current state
    this.props.clearMessages();
    this.props.listData = [{ nothing: null }];
    this.messages = [];
    this.setState({ dataSource: [],
      loading: true,
      refreshing: false,
      rowToDelete: null,
      newInput: '' });
    this.props = this.defaultProps;
  }

  messages: Array<any>;   // holds all the messages currently displayed
  scrolledToEnd: boolean;
  scrollViewRef: any;
  interval: number; // time between message show animations
  lastResponse: any; // The last response of the user
  scrollTimer: any;
  ellipsisTimer: any; // How long the ellipsis should be visible for

  scrollToEnd (options) {
    this.scrollViewRef.scrollToEnd(options);
  }

  scrollToEndWithDelay () {
    this.scrollTimer = TimerMixin.setTimeout(() => {
      this.scrollToEnd({ animated: false });
    }, scrollDelayTime);
  }

  initiateDataSource () {
    // Check listData contains data
    if (!shallowequal(this.props.listData, [])) {
    //  console.log('listData: initialDataSource ', this.props.listData);
      // Calls redux to return listData
      this.props.loadMessages();
      // Create the data source for the list view
      const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.hash !== r2.hash
      });
      const message = this.props.listData[0];
      this.messages = [];
      this.messages.push(message);
      const messagesData = this.prepareMessages(this.messages);
      this.state = {
        loading: true,
        refreshing: false,
        rowToDelete: null,
        dataSource: dataSource.cloneWithRows(messagesData.blob, messagesData.keys)
      };
    }
  }

  // Addeds ellipsis then removes it with a timeout and then adds the new message to this.messages
  addEllipsis (message) {
    // Add an ellipsis object
    const ellipsisMessage = {};
    ellipsisMessage.id = -1;
    ellipsisMessage.type = 'ellipsis';
    this.messages.push(ellipsisMessage);
    this.updateDataSource({ listData: this.messages });
    this.scrollToEndWithDelay();
    this.ellipsisTimer = TimerMixin.setTimeout(() => {
      this.deleteItem(ellipsisMessage);
      // Add the message
      this.messages.push(message);
      this.updateDataSource({ listData: this.messages });
      this.scrollToEndWithDelay();
      this.processMessages(processDelayTime);
    }, 1000);
  }

  // Removes the specified message from this.messages
  deleteItem (message) {
    this.setState({
      rowToDelete: message
    });
    let index = -1;
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id === message.id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      // splice(2,1) means remove 1 item starting at index 2
      this.messages.splice(index, 1);
      this.updateDataSource({ listData: this.messages });
    }
  }

  processMessages (delay) {
    // Checks list data is not an empty array
    if (!shallowequal(this.props.listData, [])) {
      // Start delay timeout
      this.interval = setInterval(() => {
        // index = total length of messages
        const index = this.messages.length;
        // Try will catch any errors and trigger stop processing messages eg.backpressed listdata is reset
        try {
          // Checks if the length of messages is less than listData to prevent out of bounds exception?
          if (index < this.props.listData.length) {
          // Next message to display from listData
            const message = this.props.listData[index];
            if (message != null) {
            // If message.type strict equals 'message'
              if (message.type === 'message') {
              // Replaces eg. {FIRSTNAME} with value associated with the key FIRSTNAME in responseData
                if (message.value.indexOf('{') > -1) {
                  const key = message.value.substring(message.value.lastIndexOf('{') + 1, message.value.lastIndexOf('}'));
                // Check if key is truthy
                  if (key) {
                  // Loop to find correct responseData value by key then replaces the {key} in the message with the value
                    for (let i = 0; i < this.props.responseData.length; i++) {
                      if (this.props.responseData[i].key === key) {
                        console.log(this.props.responseData[i].value);
                        const replaceText = this.props.responseData[i].value;
                        message.value = message.value.replace(/{.*}/, replaceText);
                      }
                    }
                  }
                }
              // Add message to this.messages in addEllipsis
                this.addEllipsis(message);
                this.stopProcessingMessages();
                return;
              }
            // Appends new message to messages array
              this.messages.push(message);
              this.updateDataSource({ listData: this.messages });
              this.scrollToEndWithDelay();

              if (message.type === 'question' || message.type === 'input') {
                this.stopProcessingMessages();
              }
            }
          }
        } catch (err) {
          console.log(err);
          this.stopProcessingMessages();
        }
      }, delay);
    }
  }

  stopProcessingMessages () {
    console.log('stopProcessingMessages');
    clearInterval(this.interval);
  }

  // updates the state datasource which is linked to the listview in the render() method.
  updateDataSource ({ listData }) {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.hash !== r2.hash
    });

    const messagesData = this.prepareMessages(listData);

    // Component rerenders with updated datasource
    this.setState({
      dataSource: dataSource.cloneWithRows(messagesData.blob, messagesData.keys)
    });
  }

  // Returns blob and keys to messageData so that the datasource can be updated
  // const messagesData = this.prepareMessages(listData);
  // Component rerenders with updated datasource
  // this.setState({
  //   dataSource: dataSource.cloneWithRows(messagesData.blob, messagesData.keys)
  // });
  prepareMessages (messages) {
    return {
      // keys = new array of messages.id
      // The map() method creates a new array with the results of calling a function for every array element.
      // m => m.id is es6 for functionName(m){return m.id}; called immediatly
      keys: messages.map(m => m.id),
      // The reduce() method reduces the array to a single value.
      // The reduce() method executes a provided function for each value of the array (from left-to-right).
      // The return value of the function is stored in an accumulator (result/total).
      // Note: reduce() does not execute the function for array elements without values.
      // Syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
      blob: messages.reduce((accumulator, message, index) => {
        // Set previousMessage to messages[index - 1] if its "truthy" or set it to an empty object {}
        // All values are truthy unless they are defined as falsy (i.e., false , 0 , "" , null , undefined , and NaN)
        const previousMessage = messages[index - 1] || {};
        const nextMessage = messages[index + 1] || {};

        // Add next and previous messages to hash to ensure updates
        const toHash =
          JSON.stringify(message) + previousMessage.id + nextMessage.id;

        /* eslint-disable no-param-reassign */
        accumulator[message.id] = {
          ...message,
          previousMessage,
          nextMessage,
          hash: md5(toHash),
          index
        };
        // blob : accumulator
        return accumulator;
      }, {})
    };
  }

  renderScrollComponent (props) {
    return (
      <ScrollView
        {...props}
        ref={component => {
          this.scrollViewRef = component;
          return this.scrollViewRef;
        }}
      />
    );
  }

  // Renders each row(message) in the list view
  renderRow (message) {
    if (!message.id && message.id !== 0) {
      console.warn('`id` is missing for message', JSON.stringify(message));
    }

    if (!message.type) {
      console.warn('`type` is missing for message', JSON.stringify(message));
    }

    // position holds which side of the conversation the message needs to get rendered
    let position = message.type === 'response' ? 'right' : 'left';
    if (message.type && message.type === 'question') {
      position = 'question';
    }

    // The && checks if message type is truthy then checks if it is equal to 'input'
    if (message.type && message.type === 'input') {
      position = 'input';
    }

    const messageProps = {
      ...this.props,
      key: message.id,
      currentMessage: message,
      previousMessage: message.previousMessage,
      nextMessage: message.nextMessage,
      onQuestionPress: this.onQuestionPress,
      onInputTextChanged: this.handleTextInputChange.bind(this, 'newInput'),
      onInputTextSubmit: this.onInputTextSubmit,
      inputTextPlaceholder: message.hint,
      inputTextValue: this.state.newInput,
      position
    };

    return (
      <AnimatedListRow
        time={this.props.time}
        animation={this.props.animation || 'scale'}
        animationFunc={this.props.animationFunc}
        remove={this.props.messages === this.state.rowToDelete}
        onRemoving={this.onAfterRemovingElement}
      >
        <Message navigation={this.props.navigation} {...messageProps} />
      </AnimatedListRow>
    );
  }

  renderFooter () {
    return <MessageSpace />;
  }

  renderListView () {
    // Makes sure we have listData then checks if the datasource has been set,
    // if not -> set it with initiateDataSource() and start processMessages()
    if (!shallowequal(this.props.listData, {})) {
     // console.log('listData render: ', this.props.listData);
      if (this.state.dataSource === null) {
        this.initiateDataSource();
        this.processMessages(processDelayTime);
      }
      return (
        <ListView
          ref='listView'
          enableEmptySections
          automaticallyAdjustContentInsets
          scrollRenderAheadDistance={20}
          initialListSize={20}
          onEndReached={this.onEndReached}
          pageSize={20}
          style={styles.listView}
          {...this.props.listViewProps}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          renderScrollComponent={this.renderScrollComponent}
        />
      );
    }
    return (<View />);
  }

  render () {
    return (
      <View ref='container' style={styles.container}>
        {this.renderListView()}
      </View>
    );
  }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

const mapStateToProps = state => {
  const data = state.messagesReducer.messages;
  console.log('mapStateToProps: messages -> ', data);
  return {
    listData: data
  };
};

const mapDispatchToProps = dispatch => ({
  loadMessages: () =>
    dispatch(MessagesActions.getMessages()),
  clearMessages: () =>
    dispatch(MessagesActions.resetMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
