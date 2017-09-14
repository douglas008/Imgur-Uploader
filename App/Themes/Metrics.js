import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Used via e.g. Metrics.baseMargin
const metrics = {
  section: 25,
  doubleSection: 50,

  searchBarHeight: 30,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,

  navBarHeight: Platform.OS === 'ios' ? 64 : 54,

  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,

  margin: {
    tiny: 2,
    small: 5,
    medium: 10,
    large: 16,
    xl: 20
  },

  marginHorizontal: 10,
  marginVertical: 10,
  horizontalLineHeight: 1,
  marginSmall: 5,
  marginMedium: 10,
  marginLarge: 16,
  marginXLarge: 20,
  cornerRadius: 6,

  radius: {
    tiny: 2,
    small: 4,
    medium: 6,
    large: 10,
    xl: 20
  },

  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },

  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
};

export default metrics;
