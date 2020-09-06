import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from 'styles/style';
import {connect} from 'react-redux';
import BankEntry from 'atoms/BankEntry';

class WordBank extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    words = []
    counter = 0;

    componentDidUpdate(prev)
    {
        if(this.props.wordBank && prev.wordBank.length!=this.props.wordBank.length&&this.props.wordBank.length>=1)
        {
            var wordBank = this.props.wordBank;
            this.words = wordBank.map((w, index) => {
                return (<BankEntry id={index} key={index} word={w} hasLineThrough={false}/>)
            });
            console.log("WORDBANK: added - "+wordBank.toString());
            this.setState({isLoading:false});
        }
        if(prev.selection!=this.props.selection)
        {
            var wordBank = this.props.wordBank;
            console.log(this.props.selection)
            if(wordBank.includes(this.props.selection))
            {
                console.log("WORDBANK: removed - "+this.props.selection)
                this.props.dispatch({type:'CLEAR_SELECTION',latest_find:this.props.selection});
            }
        }
    }

    render() {
        const {isLoading} = this.state;

        return(
            <View>
                <View>
                    <Text style={[styles.h2, styles.centered]}>Word Bank:</Text>
                </View>
                <View style={[styles.wordBank]}>
                        {isLoading? <ActivityIndicator/> : this.words}
                </View>
            </View>
        );
    } 
}

function mapStateToProps(state) {
    return {
      selection: state.selection,
      wordBank: state.wordBank,
      latest_find: state.latest_find
    };
  }

export default connect(mapStateToProps)(WordBank);