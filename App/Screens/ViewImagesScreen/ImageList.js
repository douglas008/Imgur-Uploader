import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { requestImages } from '../../Redux/Actions';
import ImageItem from './ImageItem';
//import { Spinner } from '../common';
import styles from './styles';

class ImageList extends Component {

    componentWillMount() {
        this.props.requestImages();
        // console.log('component will mount');
        // console.log(this.props.Images);
    }

    renderListView() {
        // console.log('renderListView');
        // const list = { ImageList: this.props.Images };
        // console.log(list.Images);

        // if (this.props.loading) {
        //     return <Spinner />;
        // }

        // return list.ImageList.map(item =>
        //     <ImageItem key={item.question} item={item} />);

        return (<ImageItem />);
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
    };
};

export default connect(mapStateToProps, { requestImages })(ImageList);
//export default ImageList;
