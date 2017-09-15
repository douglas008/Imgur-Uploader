import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    label: {
        marginBottom: 10
    },
    image: {
        width: 300,
        height: 200
    },
    cardItem: {
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.transparent,
    },
    card: {
        backgroundColor: Colors.backgroundColor,
        borderColor: Colors.accent,
    },
    bottomSpace: {
        backgroundColor: Colors.backgroundColor,
        height: 20
    }
});
