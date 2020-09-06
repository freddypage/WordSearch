import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {styles} from 'styles/style';
import {connect} from 'react-redux';

class BankEntry extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            hasLineThrough:false
        })
    } 


    componentDidUpdate(prev)
    {
        if(prev.latest_find!=this.props.latest_find && this.props.latest_find == this.props.word)
        {
            this.setState({hasLineThrough:true})
        }
    }


    render() {
        const {hasLineThrough} = this.state;

        return(
            <View style={[styles.bankEntry]}>
                    <Text style={this.state.hasLineThrough ? bankLoc.lineThrough : bankLoc.plain }>{this.props.word}</Text>
            </View>
        );
    } 
}


function mapStateToProps(state) {
    return {
      latest_find: state.latest_find
    };
  }

const bankLoc = StyleSheet.create({
    lineThrough: {
        color: "#aeff5c",
        fontWeight:"bold",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
        
    },
    plain: {
        
    }
})

export default connect(mapStateToProps)(BankEntry);