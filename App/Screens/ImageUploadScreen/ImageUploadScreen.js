import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../Components/Button';
import NavHeader from '../../Components/NavHeader';
import FloatingLabelInput from '../../Components/FloatingLabelInput';
import Spinner from '../../Components/Spinner';
import { Images } from '../../Themes';
import { uploadImage } from '../../Redux/Actions';

// Styles
import styles from './styles'

const propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string
};

const defaultProps = {
  loading: false,
  error: null
};

class ImageUploadScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: Images.addImagePlaceholder
    };
  }

  openImagePicker() {
    ImagePicker.openPicker({
      width: 1080,
      height: 1080,
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState({ ...this.state, image: { uri: image.path } });
    });
  }

  openCamera() {
    // ImagePicker.openCamera({
    //   width: 1080,
    //   height: 1080,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    //   this.setState({ ...this.state, image: { uri: image.path } });
    // });
  }

  // opacity on ios and native ripple effect on android
  renderImage() {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={() => this.openImagePicker()}>
          {this.image()}
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.openImagePicker()}>
        {this.image()}
      </TouchableOpacity>
    );
  }

  image() {
    return (
      <Image source={this.state.image} style={styles.image} />
    );
  }

  doUpload() {
    console.log("Upload Tapped");
    this.props.uploadImage(this.state.image);
  }

  renderSpinner() {
    if (this.props.loading) {
      return <Spinner />
    }
    return <View />
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.mainContainer}>
        <NavHeader
          title={'SELECT IMAGE'}
          navigation={this.props.navigation}
          style={styles.navHeader}
          rightImage={Images.menuIcons.addPhoto}
          rightImagePress={this.openCamera()}
        />
        {this.renderSpinner()}
        <ScrollView style={styles.container}>
          <View>
            {this.renderImage()}
            <FloatingLabelInput containerStyle={styles.label} label={"Title"} />
            <FloatingLabelInput containerStyle={styles.label} label={"Discription"} />
            <Button text={"UPLOAD"} onPress={() => this.doUpload()} />
          </View>
        </ScrollView>
      </View>
    )
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


export default connect(mapStateToProps, { uploadImage })(ImageUploadScreen)

