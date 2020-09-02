import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
        width:'40%'
    },
    centered: {
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center'
    },
      overview: {
          fontFamily:"OpenSans-Regular",
          fontSize:15,
          padding:5,
          textAlign:"left"
      },
      hyperlink: {
          color:'#6adef7'
      },
      smallText: {
          fontSize:13
      }
});

const buttons = StyleSheet.create({
    searchButton: {
        flex: 1,  
        padding:20,
        fontSize:20
    },
});

export { styles, buttons }