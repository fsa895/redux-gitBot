const dateFormat = require('dateformat');

export function mainReducer(state={}, action){

  switch(state.intent.slugs){  
    
    case 'greetings':
        if(state.access_token) // will not execute for undefined , null and empty string
        return Object.assign({},state,{
            conversation_history : [...state.conversation_history, {
              who: 'Bot',
              msg:"Please provide access token",
              timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
            }],
            isActive:true
          });
        return Object.assign({},state,{
          conversation_history : [...state.conversation_history, {
            who: 'Bot',
            msg:"Hi, How may I help you ?",
            timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
          }],
          isActive:true
        });
    
    case 'got_token': return Object.assign({},state,{
        access_token : state.conversation_history[state.conversation_history.length-1].msg,
        conversation_history : [...state.conversation_history, {
          who: 'Bot',
          msg:"Thank you. How may I help you ?",
          timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }],
        isActive:true
      });  
 
    case 'repo': 
        if(!state.intent.entities) return Object.assign({},state,{
          conversation_history : [...state.conversation_history, {
            who: 'Bot',
            msg:"Please provide Repo name",
            timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
          }],
          isActive:true
        });
        return Object.assign({},state,{
          conversation_history : [...state.conversation_history, {
            who: 'Bot',
            msg:"Created github repo with name: " + state.intent.text,
            timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
          }],
          isActive:true
        });

    default: return Object.assign({},state,{
      conversation_history : [...state.conversation_history, {
        who: 'Bot',
        msg:"Sorry, I have not heard it before. Could you specify some related words.",
        timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
      }],
      isActive:true
    });
  }    
  
}


export function addConversationReducer(state = {}, action)  {
    if(action.type !== 'ADD_CONVERSATION') return state;  
    return Object.assign( {}, state, {
      conversation_history : [...state.conversation_history, {who:action.who,
          msg: action.msg,
          time: action.time
      }]
    });
}

export function addIntentReducer(state={}, action){
  if(action.type !== 'ADD_INTENT') return state;
  return Object.assign( {}, state, {
    intent_history :[...state.intent_history, {text: action.text,
      slugs: action.slugs,
      entities: action.entities
    }],
    intent: {text: action.text,
            slugs: action.slugs,
            entities: action.entities
    }
  });
}

export function addTokenReducer(state={}, action){
  if(action.type !== 'ADD_TOKEN') return state;
  return Object.assign( {}, state, {
      access_token: action.text,
      isActive: true
  });
}

export function addBotReducer(state={}, action){
  if(action.type !== 'ADD_BOT_REPLY') return state;
  return Object.assign( {}, state, {
    conversation_history : [...state.conversation_history, {who:action.who,
          msg: action.msg,
          time: action.time
      }]
  });
}

