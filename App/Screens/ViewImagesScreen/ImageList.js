import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
//import { requestImages } from '../../actions';
import ImageItem from './ImageItem';
//import { Spinner } from '../common';
import styles from './styles';

class ImageList extends Component {

    componentWillMount() {
        // this.props.requestImages();
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
        return (
            <ScrollView style={styles.container} >
                {this.renderListView()}
            </ScrollView >
        );
    }
}

// const mapStateToProps = state => {
//     const { Images, loading, error } = state.ImageData;
//     return {
//         Images,
//         loading,
//         error
//     };
// };

//export default connect(mapStateToProps, { requestImages })(ImageList);
export default ImageList;
