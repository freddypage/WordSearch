import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    header:{
        fontFamily:"OpenSans-Regular",
        fontSize:30,
        padding:20,
        fontWeight:"bold",
        color:"#ff5c5c",
        textShadowColor: 'rgba(255,174,92, 1)',
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 1,
        letterSpacing: 2,
        width:"100%",
        alignContent:"center",
        textAlign:"center"
    },
    h2:{
        fontFamily:"OpenSans-Regular",
        fontSize:20,
        padding:10,
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
      },
      board: {
          width:Dimensions.get('window').width-20,
          height:Dimensions.get('window').width-20,
          borderColor:'#292929',
          borderWidth:2,
          borderRadius:5,
          display:'flex',
          flexWrap:'wrap',
          flexDirection:'row',
          padding:10,
      },
      character: {
        fontFamily:"OpenSans-Regular",
        fontSize:15,
        width:'10%',
        height:'10%',
        borderRadius:20,
        padding:10,
        display:'flex'
      },
      bankEntry: {
          padding:10,
          height:45,
          justifyContent:"center",
          alignContent:"center",
          overflow:"visible"
      },
      wordBank: {
          width:'100%',
          display:"flex",
          justifyContent:"flex-start",
          flexDirection:"row",
          flexWrap:'wrap',
          alignContent:'flex-start',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderWidth: 1,
          alignSelf:'center',
        borderRadius: 2,
        borderColor: '#ddd',
        elevation:2,
        overflow:"visible",
        marginTop:20,
        marginBottom:20,
        marginLeft:30,
        marginRight: 30
      },
      wordDisplay:
      {
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        marginBottom:10
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        minHeight: Dimensions.get('window').height
    },
    openButton: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        width:145
      },
      textStyle: {
        color: "black",
        textAlign: "left",
        fontFamily:"OpenSans-Regular",
        fontSize:15,
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:20
      },
});

const buttons = StyleSheet.create({
    searchButton: {
        flex: 1,  
        padding:20,
        fontSize:20
    },
});

export { styles, buttons }