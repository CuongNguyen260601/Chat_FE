import {combineReducers} from 'redux';
import User_Reducer from './User_Reduccer';
import Message_Reducer from './Message_Reducer';
import Conversation_Reducer from './Conversation_Reducer';

const Root_Reducer = combineReducers({
    user: User_Reducer,
    message: Message_Reducer,
    conversation: Conversation_Reducer
});

export default Root_Reducer;