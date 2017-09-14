import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import ScalableText from 'react-native-text';
import styles from './styles';
import { Images } from '../../Themes';
import CircleImageButton from '../../Components/CircleImageButton';
import { Colors } from '../../Themes';

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
        <View style={styles.btnTopRight}>
          <Image onPress={this.props.rightImagePress} style={styles.rightImage} source={this.props.rightImage} />
        </View>
      );
    }
    return (<View />)
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
