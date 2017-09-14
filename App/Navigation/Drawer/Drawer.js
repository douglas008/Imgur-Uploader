import { DrawerNavigator } from 'react-navigation';
import SlideMenu from '../../Components/SlideMenu';
// import LoginScreen from '../../Screens/LoginScreen';
import ImageUploadScreen from '../../Screens/ImageUploadScreen';
import { Colors } from '../../Themes';

const Drawer = DrawerNavigator(
  {
    // Logout: {
    //   screen: LoginScreen
    // },
    'New Image': {
      screen: ImageUploadScreen
    }
  },
  {
    contentComponent: SlideMenu,
    drawerPosition: 'left',
    initialRouteName: 'New Image',
    contentOptions: {
      activeTintColor: Colors.accent
    },
    style: {
      backgroundColor: Colors.primary
    }
  }
);

export default Drawer;
