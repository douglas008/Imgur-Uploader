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
import { Images, Colors } from '../../Themes';
import { uploadImage } from '../../Redux/Actions';
import Snackbar from '../../Components/Snackbar';
import styles from './styles'

const propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string
};

const defaultProps = {
  loading: false,
  error: null,
  showSnackbar: false,
};

class ImageUploadScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: Images.addImagePlaceholder
    };
  }

  openImagePicker() {
    if (!this.props.loading) {
      ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true
      }).then(image => {
        console.log(image);
        this.setState({ ...this.state, image: { uri: image.path } });
      }).catch(error => {
        console.log(error);
      });
    }
  }

  openCamera() {
    if (!this.props.loading) {
      ImagePicker.openCamera({
        width: 1080,
        height: 1080,
        cropping: true
      }).then(image => {
        console.log(image);
        this.setState({ ...this.state, image: { uri: image.path } });
      });
      console.log("camera pressed");
    }
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
    if (!this.props.loading) {
      this.props.uploadImage(this.state.image);
    }
  }

  renderSpinner() {
    if (this.props.loading) {
      this.props.showSnackbar = true;
      return <Spinner />
    }
    return <View />
  }

  renderSnackbar() {
    if (this.props.showSnackbar && !this.props.loading) {
      // reset show snackbar value
      this.props.showSnackbar = false;
      if (this.props.error) {
        return (
          <Snackbar
            timeout={1000}
            actionText={"Upload"}
            messageText={"Image uploaded failed"}
            backgroundColor={Colors.error}
            visible={true} />
        );
      }
      return (
        <Snackbar
          timeout={1000}
          actionText={"Upload"}
          messageText={"Image uploaded successfully"}
          backgroundColor={Colors.accent}
          visible={true} />
      );
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <NavHeader
          title={'SELECT IMAGE'}
          navigation={this.props.navigation}
          style={styles.navHeader}
          rightImage={Images.menuIcons.addPhoto}
          rightImagePress={() => this.openCamera()}
        />
        {this.renderSpinner()}
        {this.renderSnackbar()}
        <ScrollView style={styles.container}>
          <View>
            {this.renderImage()}
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


export default connect(mapStateToProps, { uploadImage })(ImageUploadScreen);

