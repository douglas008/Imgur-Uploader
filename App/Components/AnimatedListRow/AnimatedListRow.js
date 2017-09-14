import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import animation, { enter, leave, reset } from '../../Lib/Animations';

const propTypes = {
  time: PropTypes.number,
  animation: PropTypes.string,
  animationFunc: PropTypes.func,
  children: PropTypes.element
};

const defaultProps = {
  time: 200,
  animation: 'scale',
  animationFunc: null,
  children: null
};

class AnimatedListRow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      x: null,
      y: null,
      width: null,
      height: null
    };
    this.transitionTime = this.props.time || 200;
    this.measureView = this.measureView.bind(this);
  }

  componentWillMount () {
    this.controlVar = new Animated.Value(0);
  }

  componentDidMount () {
    enter(this.controlVar, this.transitionTime).start();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.remove) {
      this.onRemoving(nextProps.onRemoving);
    } else {
      this.reset();
    }
  }

  onRemoving (callback) {
    leave(this.controlVar, this.transitionTime).start(callback);
  }

  measureView (event) {
    this.setState({
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y,
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    });
  }

  reset () {
    reset(this.controlVar);
  }

  render () {
    const { width, height, x, y } = this.state;
    const animationFuncParams = {
      controlVar: this.controlVar,
      width,
      height,
      x,
      y
    };
    let rowAnimation = animation(this.props.animation, animationFuncParams);
    if (this.props.animationFunc) {
      rowAnimation = this.props.animationFunc(animationFuncParams);
    }

    return (
      <Animated.View
        onLayout={event => this.measureView(event)}
        style={rowAnimation}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

AnimatedListRow.propTypes = propTypes;
AnimatedListRow.defaultProps = defaultProps;

export default AnimatedListRow;
