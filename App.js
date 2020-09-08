import React from 'react';
import {useFonts} from 'expo-font';
import { AppLoading } from 'expo';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import Game from 'organisms/Game'
import { ScrollView } from 'react-native-gesture-handler';
import {styles} from 'styles/style';

export default function App() {

  const initialState = {
    selection:"",
    wordBank: new Array(),
    reset: false
  }
  
  const reducer = (state = initialState, action) => {
    //console.log('reducer', state, action);
    switch(action.type) {
      case 'NEW_GAME':
        return {
          wordBank: new Array(),
          selection: "",
          latest_find: "",
          reset: true
        }
      case 'ADD_LETTER':
        return {
          wordBank: [...state.wordBank],
          selection : state.selection + action.letter,
          reset: false
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
          selection: str,
          reset: false
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

          var gameWon = state.wordBank.length == 0
          return {
            latest_find:action.latest_find,
            wordBank: [...state.wordBank],
            selection: "",
            reset: false,
            isDone: gameWon
          };
        }
        else
        {
          console.log('cleared segment ');
          return {
            wordBank: [...state.wordBank],
            selection: "",
            reset: false
          };
        }
        
      case 'ADD_TO_BANK':
        return {
          wordBank: [...state.wordBank, action.word],
          selection: state.selection,
          reset: false
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
      <ScrollView style={[styles.container]}>
        <Game/>
      </ScrollView>
    </Provider>
  );
}

