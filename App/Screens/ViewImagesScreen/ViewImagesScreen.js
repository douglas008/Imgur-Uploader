import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import { connect } from 'react-redux';
import Navigation from '../../Navigation/AppNavigation';
import NavHeader from '../../Components/NavHeader';
import ImageList from './ImageList';

// Styles
import styles from './styles';

class ViewImagesScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <NavHeader
                    title={'MY IMAGES'}
                    navigation={this.props.navigation}
                    style={styles.navHeader}
                />
                <ImageList />
            </View>
        );
    }
}

export default ViewImagesScreen;