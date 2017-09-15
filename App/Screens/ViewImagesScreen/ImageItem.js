import React, { Component } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    Image
} from 'react-native';
//import { connect } from 'react-redux';
import CardItem from '../../Components/CardItem';
import Card from '../../Components/Card';
//import * as actions from '../../actions';
import styles from './styles';

class ImageItem extends Component {

    componentWillUpdate() {
        // just before component mounts
    }

    renderTitleDiscription() {
        return (
            //reference to javascript variable must be wrapped in {}
            <Text style={{ color: 'white' }}>This is some text</Text>
        );
    }

    renderImage() {
        return (
            <CardItem containerStyle={styles.cardItem}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://i.imgur.com/fL8sC0W.jpg' }}
                />
            </CardItem>
        );
    }

    render() {
        return (
            <Card containerStyle={styles.card}>
                <View>
                    {this.renderImage()}
                    {this.renderTitleDiscription()}
                </View>
            </Card>
        );
    }
}


// own props are only the props that are sent to this component 
// const mapStateToProps = (state, ownProps) => {
//     const expanded = state.selectedFaqQuestion === ownProps.item.question;
//     return { expanded };
// };

// bind action creator - when actoin creatator is called 
// it will return an action that gets sent off to all the reducers in this application.
//export default connect(mapStateToProps, actions)(ImageItem);
export default ImageItem;
// actions in connect are automatically dispatched to the redux store
// and returns the data as props to FaqItem
