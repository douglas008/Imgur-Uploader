import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import ScalableText from 'react-native-text';
import styles from './styles';
import { Images, Colors } from '../../Themes';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  rightImagePress: PropTypes.func
};

const defaultProps = {
  navigation: {},
  title: '',
  rightImage: null,
  rightImagePress: () => console.log('Right Image Pressed')
};

class NavHeader extends React.Component {

  renderRightImageButton() {
    if (this.props.rightImage) {
      return (
        <TouchableHighlight onPress={() => this.props.rightImagePress()} style={styles.btnTopRight}>
          <Image style={styles.rightImage} source={this.props.rightImage} />
        </TouchableHighlight>
      );
    }
    return (<View />);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
          <Image style={styles.btnMenu} source={Images.menuIcons.menu} />
        </TouchableHighlight>
        <ScalableText style={styles.title}>{this.props.title}</ScalableText>
        {this.renderRightImageButton()}
      </View>
    );
  }
}

NavHeader.propTypes = propTypes;
NavHeader.defaultProps = defaultProps;

export default NavHeader;
