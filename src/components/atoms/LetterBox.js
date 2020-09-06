import React, {Component} from 'react';
import {View, Text,TouchableHighlight} from 'react-native';
import {styles} from 'styles/style';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

class LetterBox extends Component {

    colors = ['#5cffff']
    base_background = "#ffffff";

    constructor(props) {
        super(props);
        if(this.props.color)
        {
            this.base_background = this.colors[this.getRandomInt(this.colors.length)];
        }
        this.state = {
            background: this.base_background,
            selected:false,
            key: this.props.id
        }

        this.handlePress = this.handlePress.bind(this);
    }

   
    componentDidUpdate(prev)
    {
        if(prev.selection!=this.props.selection)
        {
            if(prev.selection==this.props.latest_find&&this.state.selected==true)
            {
                this.base_background = '#aeff5c';
                this.setState({selected:false, background:this.base_background});
            }
            else if(this.props.selection.length<1 && this.state.selected==true)
            {
                this.setState({selected:false, background:this.base_background});
            }
        }
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

    handlePress()
    {
        var select = !this.state.selected;
        this.setState({selected:select});
        if(select) 
        {
            //console.log('pressed')
            this.setState({background:'#ff5c5c'});
            this.props.dispatch({type:'ADD_LETTER',letter:this.props.character})
        }
        else{
            this.setState({background:this.base_background});
            this.props.dispatch({type:'REMOVE_LETTER',letter:this.props.character})
        }

        
        
    }


    render() {
        const {background, selected, key} = this.state;
        var inElement = true;
        var locX = 0;
        var locY = 0;
        return(
            <View  
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => false}
            onMoveShouldSetResponderCapture={() => false}
            onResponderGrant={(event) => {
                console.log('CHILD: letter responder granted '+this.state.key);
                locX = event.nativeEvent.locationX;
                locY = event.nativeEvent.locationY;
                this.handlePress()
            }}
            style={[styles.character, styles.centered, {backgroundColor:this.state.background}]}>
                    <Text >{this.props.character}</Text>
            </View>
        );
    } 
}

function mapStateToProps(state) {
    return {
      selection: state.selection,
      latest_find: state.latest_find
    };
  }

export default connect(mapStateToProps)(LetterBox);