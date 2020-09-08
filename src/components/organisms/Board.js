import React, {Component} from 'react';
import {Dimensions, View, Text, ActivityIndicator, Animated, PanResponder} from 'react-native';
import {styles} from 'styles/style';
import LetterBox from 'atoms/LetterBox';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
//import { styles } from './styles/style';


class Board extends Component {

    base_words = ['Swift', 'Kotlin', 'ObjectiveC', 'Variable', 'Java', 'Mobile']
    arrangements = ['top', 'top-diagonal', 'sideways', 'bottom-diagonal'];
    matrix = [];
    color_matrix = [];
    letters = [];
    dictionary = [
        'amusing','reward','annoying','tiny','spill','befitting','faint','uninterested',
        'known','interrupt','redundant','bustling','thoughtful','aunt','comparison',
        'friend','juice','intern','brother'
    ]

    componentDidMount() {
        this.makeBoard(10,this.getRandomWords(3));
        //console.log(this.matrix)
        this.letters = this.renderLetters();
        this.setState({isLoading:false});
    }

    getRandomWords(numWords)
    {
        if(!numWords || typeof(numWords) !== "number") return []
        var list = [];
        var buffer = 0;
        while(list.length<numWords && buffer<100)
        {
            var randWord = this.dictionary[this.getRandomInt(this.dictionary.length)]
            if(!list.includes(randWord))
            {
                list.push(randWord)
            }
            buffer++;
        }
        console.log(list)
        return list
    }

    componentDidUpdate(prev)
    {
        if(prev.iteration!=this.props.iteration && this.props.iteration > 0)
        {
            this.letters = null
            this.matrix = [];
            this.color_matrix = [];
            this.setState({isLoading:true})
            this.makeBoard(10,this.getRandomWords(5));
            this.letters = this.renderLetters()
            this.setState({isLoading:false})
        }
    }

   

    makeBoard(length, add_words) {
        //min length of board must be largest word in pool
        if(add_words) pool = this.base_words.concat(add_words);

        // make lower case
        pool.forEach(function(element, index, arr) {
            arr[index] = element.toLowerCase();
        });
        //filter words that are too large
        pool = pool.filter(word => word.length < length);

        //initialize matrix
        var matrix;
        
        //arrangeLetters
        console.log('arranging letters: '+pool+'\n')
        var tries = 0;
        var arrangementFound = false

        //try to make a board at least 10 times
        do{
            matrix = this.createEmptyMatrix(length)
            arrangementFound = this.arrangeLetters(matrix, pool)
            console.log('\n'+'try number: '+ (++tries))

        }while(!arrangementFound && tries<10)

        //addtobank
        for(var i = 0; i<pool.length; i++)
        {
            this.addToWordBank(pool[i])
        }

        //fillMatrix
        this.fill(matrix);

        //return matrix
        this.matrix = matrix;
    }

    //optional minimum
    getRandomInt(max, min) 
    {
        if(max<=0) return 0;
        if(min)
        {
            return Math.floor(Math.random()*Math.floor(max-min))+min;
        }
        return Math.floor(Math.random() * Math.floor(max));
    }

    addToWordBank(word)
    {
        this.props.dispatch({type:'ADD_TO_BANK', word:word})
    }

    createEmptyMatrix(length)
    {
        var matrix = [];
        for(var i = 0; i<length; i++)
        {
            matrix[i] = new Array(length);
            this.color_matrix[i] = new Array(length);
        }
        return matrix
    }

    //takes a matrix and a pool of strings and arranges characters in matrix
    arrangeLetters(matrix, pool)
    {
        for(var i = 0; i<pool.length; i++)
        {
            var word = pool[i];
            //console.log(word+' '+arrangement);
            var tries = 0;
            var actualPos = [];

            while((tries<100) && actualPos.length<1)
            {
                var arrangement = this.arrangements[this.getRandomInt(this.arrangements.length)];
                var pos = this.getPosition(matrix.length, word.length, arrangement);
                if(this.tryPos(pos, word, arrangement, matrix))
                {
                    actualPos = pos;
                    console.log(word+' '+pos+' '+arrangement)
                    break;
                }
                tries++;
            }

            if(actualPos.length<1)
            {
                console.log(word+' '+'did not work')
                return false;
            }
        }

        return true
    }

    //try position of word
    //returns true if works (and adds to matrix)
    tryPos(pos, word, arrangement, matrix)
    {
        //confusing but x and y should be reversed here..
        var x = pos[0];
        var y = pos[1];
        switch(arrangement)
        {
            case 'top':
                for(var i = 0; i<word.length; i++)
                {
                    if(matrix[y+i ][x]!==undefined && matrix[y+i][x]!=word[i])
                    {
                        return false;
                    }
                }
                for(var i = 0; i<word.length; i++)
                {
                    matrix[y+i][x]=word[i];
                    this.color_matrix[y+i][x]=true;
                }
                break;
            case 'top-diagonal':
                for(var i = 0; i<word.length; i++)
                {
                    if(matrix[x+i][y+i]!==undefined && matrix[x+i][y+i]!=word[i])
                    {
                        return false;
                    }
                }
                for(var i = 0; i<word.length; i++)
                {
                    matrix[x+i][y+i]=word[i];
                    this.color_matrix[x+i][y+i]=true;
                }
                break;
            case 'sideways':
                for(var i = 0; i<word.length; i++)
                {
                    if(matrix[y][x+i]!==undefined && matrix[y][x+i]!=word[i])
                    {
                        return false;
                    }
                }
                for(var i = 0; i<word.length; i++)
                {
                    matrix[y][x+i]=word[i];
                    this.color_matrix[y][x+i]=true;
                    
                }
                break;
            case 'bottom-diagonal':
                
                for(var i = 0; i<word.length; i++)
                {
                    if(matrix[x-i][y+i]!==undefined && matrix[x-i][y+i]!=word[i])
                    {
                        return false;
                    }
                }
                for(var i = 0; i<word.length; i++)
                {
                    matrix[x-i][y+i]=word[i];
                    this.color_matrix[x-i][y+i]=true;
                }
                break;
                
        }
        return true;
    }

    //arrangements = ['top', 'top-diagonal', 'sideways', 'bottom-diagonal'];
    //returns an x-y coordinate
    getPosition(matrixLength, wordLength, arrangement)
    {
        var x = 0;
        var y = 0;
        switch(arrangement)
        {
            case 'top':
                x = this.getRandomInt(matrixLength-1);
                y = this.getRandomInt(matrixLength-wordLength-1);
                break;
            case 'top-diagonal':
                x = this.getRandomInt(matrixLength-wordLength-1);
                y = this.getRandomInt(matrixLength-wordLength-1);
                break;
            case 'sideways':
                x = this.getRandomInt(matrixLength-wordLength-1);
                y = this.getRandomInt(matrixLength-1);
                break;
            case 'bottom-diagonal':
                y = this.getRandomInt(matrixLength-wordLength-1);
                x = this.getRandomInt(matrixLength-1, wordLength-1);
                break;
                
        }

        return [x,y];
    }

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            length:10,
            isNew:false
        }
    }

    renderLetters()
    {
        if(!this.matrix||this.matrix.length<1)
        {
            return;
        }

        const data = [];
        const colors = [];
        for(var i = 0; i<this.matrix.length; i++)
        {
            for(var j = 0; j<this.matrix[0].length; j++)
            {
                data.push(this.matrix[i][j]);
                colors.push(this.color_matrix[i][j]);
            }
        }
        const letters = data.map((l, i) => 
        <LetterBox 
        character={l} 
        key={i}
        id={i} 
        color={colors[i]}
        />)
        return letters;
    }

    fill(matrix) 
    {
        if(!matrix||matrix.length<1)
        {
            return;
        }

        var characters = 'abcdefghijklmnopqrstuvwxyz';

        for(var i = 0; i<matrix.length; i++)
        {
            for(var j = 0; j<matrix[0].length; j++)
            {
                if(matrix[i][j]===undefined) {
                    matrix[i][j] = characters.charAt(this.getRandomInt(characters.length));
                    this.color_matrix[i][j] = false;
                }
            }
        }
    }

    handleGesture = (evt) =>{
            let{nativeEvent} = evt
            //console.log(nativeEvent)
        }

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderRelease: () => console.log('PAN RESPONDER: released'),
        onMoveShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderStart: (evt, gesture) => {console.log('PAN RESPONDER: pan responder start')},
        onPanResponderGrant: (evt, gesture) => {console.log('PAN RESPONDER: pan responder granted')},
        onPanResponderTerminationRequest: (evt, gesture) => {console.log('PAN RESPONDER: termination request'); return true},
        onPanResponderTerminate: (evt) => {console.log('PAN RESPONDER: yeet')}
        // onPanResponderMove: (evt, gestureState) => {console.log(evt);}
        });
        


    render() {

        const {isLoading, modalVisible, length} = this.state;

        return(
            
                <View style={[styles.centered,styles.board]}>
                    {
                        isLoading? <ActivityIndicator/> : (this.letters)
                    }          
                </View> 
        );
    }
}

function mapStateToProps(state) {
    return {
      selection: state.selection
    };
  }

export default connect(mapStateToProps)(Board);