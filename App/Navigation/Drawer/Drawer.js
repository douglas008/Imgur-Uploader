import { DrawerNavigator } from 'react-navigation';
import SlideMenu from '../../Components/SlideMenu';
import ViewImagesScreen from '../../Screens/ViewImagesScreen';
import ImageUploadScreen from '../../Screens/ImageUploadScreen';
import { Colors } from '../../Themes';

const Drawer = DrawerNavigator(
  {
    'My Images': {
      screen: ViewImagesScreen
    },
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
