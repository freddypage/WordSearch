import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import Board from 'organisms/Board';
import {useFonts} from 'expo-font';
import { AppLoading } from 'expo';
import {styles} from 'styles/style';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import WordDisplay from 'atoms/WordDisplay';
import BankEntry from 'molecules/WordBank';

export default function App() {

  const initialState = {
    selection:"",
    wordBank: new Array()
  }
  
  const reducer = (state = initialState, action) => {
    //console.log('reducer', state, action);
    switch(action.type) {
      case 'ADD_LETTER':
        return {
          wordBank: [...state.wordBank],
          selection : state.selection + action.letter
        };
      case 'REMOVE_LETTER':
        var str = state.selection
        for(var i = state.selection.length-1; i>=0; i--)
        {
          if(state.selection[i] == action.letter)
          {
            str = str.slice(0,i) + str.slice(i+1,str.length);
            break;
          }
        }
        return {
          wordBank: [...state.wordBank],
          selection: str
        }
      case 'CLEAR_SELECTION':
        console.log(state)
        if(action.latest_find)
        {
          console.log('found word: '+action.latest_find);
          for(var i = 0; i<state.wordBank.length; i++)
          {
            if(state.wordBank[i]==action.latest_find)
            {
              state.wordBank.splice(i,1)
            }
          }
          return {
            latest_find:action.latest_find,
            wordBank: [...state.wordBank],
            selection: ""
          };
        }
        else
        {
          console.log('cleared segment ');
          return {
            wordBank: [...state.wordBank],
            selection: ""
          };
        }
        
      case 'ADD_TO_BANK':
        return {
          wordBank: [...state.wordBank, action.word],
          selection: state.selection
        }
      default:
        return state;
    }
  }
  
  const store = createStore(reducer);

  const [loaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-BoldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <View style={[styles.container, styles.centered]}>
        <Text style={[styles.header,styles.header]}>Word Search</Text>
        <WordDisplay selection=""></WordDisplay>
        <Board></Board>
        <BankEntry/>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

