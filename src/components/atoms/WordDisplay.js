import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from 'styles/style';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements'

class WordDisplay extends Component {


    constructor(props) {
        super(props);
        this.state = {
            show:false
        }
    }

    componentDidUpdate(prevProp)
    {
        if(prevProp.selection!=this.props.selection && this.props.selection.length>0 )
        {
            if(this.state.show == false)
            {
                this.setState({show:true});
            }
        }
        else if (prevProp.selection!=this.props.selection){
            if(this.state.show == true)
            {
                this.setState({show:false})
            }
        }
    }


    render() {
        const {show} = this.state;

        return(
             this.state.show &&
            (<View style={[styles.centered, styles.wordDisplay]}>
                    <Text style={[styles.h2, {fontStyle:"italic"}]}>"  {this.props.selection}  "</Text>
                    <Button
                    activeOpacity={0.6}
                    title="Clear"
                    color="#ff5c5c"
                    underlayColor="#DDDDDD"
                    onPress={() => {this.props.dispatch({type:"CLEAR_SELECTION"})}}>Clear</Button>
            </View>)
            
        );
    } 
}

function mapStateToProps(state) {
    return {
      selection: state.selection
    };
  }

export default connect(mapStateToProps)(WordDisplay);