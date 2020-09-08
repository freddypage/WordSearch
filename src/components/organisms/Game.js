import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Button, ActivityIndicator, Modal, ScrollView } from 'react-native';
import Board from 'organisms/Board';
import {styles} from 'styles/style';
import WordDisplay from 'atoms/WordDisplay';
import WordBank from 'molecules/WordBank';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

class Game extends Component {

    board;

    componentDidMount()
    {
        this.loadBoard();
    }

    instructText = "Find all the words to complete the game. Gestures not implemented so touch the letters individually to form words. Good Luck!"+'\n'+'\n'+" - Frederick Lepage";

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            modalVisible:false,
            modalText: this.instructText
        }
    }

    componentDidUpdate(prev)
    {
        if(prev.reset !== this.props.reset && this.props.reset)
        {
            this.makeNewGame()
        }

        if(prev.isDone != this.props.isDone && this.props.isDone)
        {
            console.log('GAME WON')
            this.setState({modalVisible:true})
            this.setState({modalText:'You Won! Press New Game to start again.'})
        }
    }

    loadBoard()
    {
        this.setState({isLoading:true})
        console.log('\n'+'ALERT: **  -- loading initial game --  **'+'\n')
        //create new board
        this.board = (<Board/>)
        this.setState({isLoading:false})
    }
    
    iteration = 0

    makeNewGame()
    {
        this.setState({isLoading:true})
        console.log('\n'+'ALERT: **  -- loading new game --  **'+'\n')
        //create new board
        this.iteration++;
        this.board = React.cloneElement(this.board, {iteration:this.iteration})
        this.setState({isLoading:false})
    }

    render() {
        const {modalVisible, modalText} = this.state
      return (
        <View style={[styles.container, styles.centered]}>
            <Text style={[styles.header]}>Word Search</Text>
            <View style={{flexDirection:"row", justifyContent:"space-around", flex:1}}>
                <View style={{marginRight:30}}><Button title="new game" onPress={() => 
                    {
                        console.log('pressed new game');
                        this.props.dispatch({type:'NEW_GAME'})
                    }}
                    color={"#ff855c"}>
                </Button>
                </View>
                <TouchableHighlight onPress={() => this.setState({modalVisible:true, modalText:this.instructText})} >
                    <FontAwesomeIcon icon={faInfoCircle} size={30} style={{color:'#ff5c5c'}}/>
                </TouchableHighlight>

            </View>

            <Modal
            animationType="slide"
            transparent={true}
            style={styles.modal}
            visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textStyle}>{modalText}</Text>

                        <Button title={"Hide"} onPress={() => this.setState({modalVisible:false})}></Button>
                    </View>
                </View>
            </Modal>
            
            <WordBank/>
            
            <WordDisplay selection=""></WordDisplay>
            {this.state.isLoading ? <ActivityIndicator/> : this.board}
            
            <StatusBar style="auto" />
        </View>
        );
      }
}

function mapStateToProps(state) {
    return {
        reset: state.reset,
        isDone: state.isDone
    }
}

export default connect(mapStateToProps)(Game);