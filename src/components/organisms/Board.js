import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from 'styles/style';
//import { styles } from './styles/style';


class Board extends Component {

    componentDidMount() {
        this.setState({isLoading:false});
        return
    }

    base_words = ['Swift', 'Kotlin', 'ObjectiveC', 'Variable', 'Java', 'Mobile']
    arrangements = ['top', 'top-diagonal', 'sideways', 'bottom-diagonal'];

    makeBoard(length, add_words) {
        //min length of board must be largest word in pool
        
        pool = this.base_words.concat(add_words);

        //get max and make lower case
        var max;
        pool.forEach(function(element, index, arr) {
            arr[index] = element.toLowerCase();
            if(max<element.length)
            {
                max = element.length;
            }
        });
        length = Math.max(length, max);

        console.log(pool.toString());

        //create empty matrix
        var matrix = [];
        for(var i = 0; i<length; i++)
        {
            matrix[i] = new Array(length);
        }

        //arrangeLetters
        this.arrangeLetters(matrix, pool)

        //fillMatrix

    }

    getRandomInt(max) 
    {
        return Math.floor(Math.random() * Math.floor(max));
    }

    //takes a matrix and a pool of strings and arranges characters in matrix
    arrangeLetters(matrix, pool)
    {
        for(var i = 0; i<pool.length; i++)
        {
            var arrangement = this.arrangements[this.getRandomInt(this.arrangements.length)];
            console.log(arrangement)
        }
    }

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false
        }
        this.makeBoard(10,['hello']);
    }

    render() {

        const {isLoading, modalVisible} = this.state;

        return(
            
                <View style={styles.centered}>
                    <Text>Hello</Text>             
                </View> 
        );
    }
}

export default Board;