import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
        width:'100%',
        height:Dimensions.get('window').height
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
          padding:10
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
          height:100,
          width:'100%',
          display:"flex",
          justifyContent:"flex-start",
          flexDirection:"row",
          flexWrap:'wrap',
          alignContent:'flex-start'
      },
      wordDisplay:
      {
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row'
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