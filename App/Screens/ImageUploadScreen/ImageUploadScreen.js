import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  Alert
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
import AlertMessage from '../../Components/AlertMessage';
import styles from './styles'

const propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string
};

const defaultProps = {
  loading: false,
  error: null,
};

class ImageUploadScreen extends Component {
  constructor(props) {
    super(props);
    var showSnackbar = false;
    this.state = {
      image: Images.addImagePlaceholder,
      showAlertMessage: false
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
      <View style={styles.imageContainer}>
        <Image source={this.state.image} style={styles.image} />
        {this.renderSpinner()}
      </View>
    );
  }

  doUpload() {
    // check if an images is currently uploading
    if (!this.props.loading) {
      if (this.state.image != Images.addImagePlaceholder) {
        // Show snackbar is true as it needs to show the result of the upload 
        this.showSnackbar = true;
        // Call redux action to do upload
        this.props.uploadImage(this.state.image);
      } else {
        Alert.alert(
          'No Image',
          'Please select an image',
          [
            { text: 'Select an image', onPress: () => this.openImagePicker() },
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
          { cancelable: false }
        );
      }
    }
  }

  // Show spinner while uploading
  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner color={Colors.accent} style={styles.spinner} />
      );
    }
    return <View />
  }

  // Show snackbar with upload result
  renderSnackbar() {
    if (this.showSnackbar && !this.props.loading) {
      // reset show snackbar value
      this.showSnackbar = false;
      if (this.props.error) {
        return (
          <Snackbar
            timeout={1500}
            actionText={"Upload"}
            messageText={this.props.error}
            backgroundColor={Colors.error}
            visible={true} />
        );
      }
      return (
        <Snackbar
          timeout={1500}
          actionText={"Upload"}
          messageText={"Image uploaded successfully"}
          backgroundColor={Colors.accent}
          visible={true} />
      );
    }
  }

  // Main render method
  render() {
    return (
      <View style={styles.mainContainer}>
        <NavHeader
          title={'NEW IMAGE'}
          navigation={this.props.navigation}
          style={styles.navHeader}
          rightImage={Images.menuIcons.addPhoto}
          rightImagePress={() => this.openCamera()}
        />
        <ScrollView style={styles.container}>
          <View>
            {this.renderImage()}
            <Button text={"UPLOAD"} onPress={() => this.doUpload()} />
          </View>
        </ScrollView>
        {this.renderSnackbar()}
      </View>
    )
  }
}

// Sets prop defaults and types
ImageUploadScreen.propTypes = propTypes;
ImageUploadScreen.defaultProps = defaultProps;

// Maps global redux state to local props
const mapStateToProps = state => {
  const data = state.imagesReducer;
  console.log('mapStateToProps: data -> ', data);
  return {
    loading: data.loading,
    error: data.error
  };
};

export default connect(mapStateToProps, { uploadImage })(ImageUploadScreen);

