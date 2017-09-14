import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import ScalableText from 'react-native-text';
import styles from './styles';
import { Images } from '../../Themes';

const propTypes = {
  navigation: PropTypes.object.isRequired
};

const defaultProps = {
  navigation: {}
};

class SlideMenu extends React.Component {
  constructor (props) {
    super(props);
    console.log('Slide Props: ' + JSON.stringify(this.props));
    this.state = {
      pressed: ''
    };
  }

  icon (index) {
    if (index === 0) {
      return (
        <Image
          source={Images.menuIcons.home}
          style={[
            styles.btnIcon,
            this.props.navigation.state.index === index
              ? styles.btnIconActive
              : {}
          ]}
        />
      );
    } else if (index === 1) {
      return (
        <Image
          source={Images.menuIcons.settings}
          style={[
            styles.btnIcon,
            this.props.navigation.state.index === index
              ? styles.btnIconActive
              : {}
          ]}
        />
      );
    } else if (index === 2) {
      return (
        <Image
          source={Images.menuIcons.settings}
          style={[
            styles.btnIcon,
            this.props.navigation.state.index === index
              ? styles.btnIconActive
              : {}
          ]}
        />
      );
    }
  }

  doNavigation (routeName) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
      ]
    });
    if (routeName === 'Logout') {
      this.props.screenProps.rootNavigation.dispatch(resetAction);
    } else {
      this.props.navigation.navigate(routeName);
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.menuImg} source={Images.hyveLogo} />
        {this.props.navigation.state.routes.map((route, index) => (
          <TouchableHighlight
            onPress={() => (this.doNavigation(route.routeName))}
            onHideUnderlay={() => {
              this.setState({ pressed: '' });
            }}
            onShowUnderlay={() => {
              this.setState({ pressed: route.routeName });
            }}
            style={[
              styles.btn,
              this.state.pressed === route.routeName ? styles.tabPress : {}
            ]}
            key={route.routeName}
          >
            <View style={styles.btnBox}>
              {this.icon(index)}
              <ScalableText
                style={[
                  styles.btnText,
                  this.props.navigation.state.index === index
                    ? styles.btnTextActive
                    : {}
                ]}
              >
                {route.routeName.toUpperCase()}
              </ScalableText>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

SlideMenu.propTypes = propTypes;
SlideMenu.defaultProps = defaultProps;

export default SlideMenu;
