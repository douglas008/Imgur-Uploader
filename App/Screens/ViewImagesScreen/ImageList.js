import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestImages } from '../../Redux/Actions';
import ImageItem from './ImageItem';
import Spinner from '../../Components/Spinner';
import styles from './styles';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    images: PropTypes.array
};

const defaultProps = {
    loading: true,
    error: null,
    images: []
};

class ImageList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.requestImages();
    }

    renderListView() {
        console.log('renderListView: this.props.images', this.props.images);

        if (this.props.loading) {
            return <Spinner />;
        }

        if (this.props.images) {
            return this.props.images.map(item =>
                <ImageItem key={item.id} item={item} />);
        }
        return <View />;
    }

    render() {
        console.log(this.props.images);
        return (
            <ScrollView style={styles.container} >
                {this.renderListView()}
            </ScrollView >
        );
    }
}

const mapStateToProps = state => {
    const data = state.imagesReducer;
    console.log('mapStateToProps: images -> ', data);
    return {
        loading: data.loading,
        error: data.error,
        images: data.images.data
    };
};

export default connect(mapStateToProps, { requestImages })(ImageList);
