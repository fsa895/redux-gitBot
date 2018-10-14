import {
    addConversationReducer,
    addIntentReducer,
    addTokenReducer,
    addBotReducer,
    mainReducer
} from './reducers';

export default function(state={}, action){
    switch(action.type){
        case 'ADD_CONVERSATION':
            return addConversationReducer(state, action);  
        case 'SET_INTENT':
            return addIntentReducer(state, action);
        case 'ADD_TOKEN':
            return addTokenReducer(state, action);  
        case 'ADD_BOT_REPLY':
            return addBotReducer(state, action);
        case 'BOT_REPLY':
            return mainReducer(state, action);                              
        default:
            return state;    
    }
}

