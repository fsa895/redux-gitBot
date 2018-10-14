import mocha from 'mocha';
import {createStore} from 'redux';
import chai from 'chai';
import deepFreeze from 'deep-freeze';
import reducers from '../src';

const dateFormat = require('dateformat');

const should = chai.should();

describe('Bot App', function(){
    it('should add conversation to history ', function(){
        const initialState = deepFreeze({
                access_token:"",
                conversation_history:[{who:"", msg:"", time:""}],
                intent:{
                    text:"",
                    slugs:"",
                    entities:""
                },
                intent_history:[],
                isActive: ""
        });
        const store = createStore(reducers, initialState);
        const now = new Date();
        store.dispatch({
            type:'ADD_CONVERSATION',         
                who: 'Saif',
                msg: 'Good morning',
                time: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")      
        });
        console.log('Store.state: ',store.getState())
        store.getState().should.have.property('conversation_history').of.length(2) ;
    }),

    it('modifing the intent', function(){
        const initialState = deepFreeze({
                access_token:"334213454",
                conversation_history:{who:"", msg:"", time:""},
                intent:{
                    text:"",
                    slugs:"", 
                    entities:""
                },
                intent_history:[{text:'create a random repo',slugs:'create in a sort time',entities:'inform when complete'}],
                isActive: true
        });
        const store = createStore(reducers, initialState);
        store.dispatch({
            type:'SET_INTENT',  
            text:'create a repo for me',
            slugs : 'this is slug',
            entities: 'this is entities'
        });
        console.log('Store.state: ',store.getState())
        store.getState().should.have.property('isActive').to.equal(true);
        store.getState().should.have.property('intent').not.be.empty;
    }),


    it('set token', function(){ 
        const initialState = deepFreeze({
                access_token:"",
                conversation_history:{who:"", msg:"", time:""},
                intent:{
                    text:"",
                    slugs:'',
                    entities:''
                },
                intent_history:[],
                isActive: false
        });
        const store = createStore(reducers, initialState);
        store.dispatch({
            type:'ADD_TOKEN',
            text:'12345'
        });
        console.log('Store.state: ',store.getState())
        store.getState().should.have.property('access_token').to.be.sealed;
        store.getState().should.have.property('access_token').to.deep.equal('12345');
        store.getState().should.have.property('isActive').to.equal(true)
    }),
        
    it('will reply to user ', function(){
        const initialState = deepFreeze({
                access_token:"8743218798",
                conversation_history:[{who:"Saif", msg:"Hi", time:"Thursday, October 11th, 2018, 2:28:29 PM"}],
                intent:{
                    text:"",
                    slugs:'',
                    entities:''
                },
                intent_history:[],
                isActive: true
        });
        const store = createStore(reducers, initialState);
        const now = new Date();
        store.dispatch({
            type:'ADD_BOT_REPLY',
            who: 'Bot',
            msg: 'Hello',
            time: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
    
        });
        console.log('Store.state: ',store.getState());
        store.getState().should.have.property('isActive').to.equal(true);
        store.getState().should.have.property('access_token').not.to.be.empty   ;

    })
});

describe('CONVERSATION WITH BOT', function(){
    it('bot reply to greeting hi', function () {
        const initialState = deepFreeze({
          access_token: "",
          conversation_history: [{
              who: "user",
              msg:"Hi",
              timestamp: dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
            }, 
          ],
          intent: {
            text: "Hi",
            slugs: "got_token",  //   change "got_token => greetings" to see different results
            entities: ""
          },
          intent_history: [],
          isActive: false
        });
        const store = createStore(reducers, initialState);
        store.dispatch({
          type: 'BOT_REPLY'  
        });
    
        console.log(store.getState()); 
      })
      ,

  it('bot reply to wrong access token', function () {
        const initialState = deepFreeze({
        user: "",
        access_token: "",
        conversation_history: [{
            who: 'user',
            msg: "hi",
            timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
            },
            {
            who:'Bot',  
            msg: "please provide access tokens",
            timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT"),
            },
            {
            who: 'User',  
            msg: "may be later",
            timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
            }
        ],
        intent: {
            text: "may be later",
            slugs: "",
            entities: [""]
        },
        intent_history: [],
        status:false
        });

        const store = createStore(reducers  , initialState);

        store.dispatch({
        type: 'BOT_REPLY'
        });

        console.log(store.getState());
    }),


    it('bot reply to right access token', function () {
        const initialState = deepFreeze({
          user: "",
          access_token: "",
          conversation_history: [{
              who: 'User',
              msg: "hi",
              timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
            },
            {
              who: 'Bot',  
              msg: "please provide access tokens",
              timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT"),
            },
            {
              who: 'User',  
              msg: "123",
              timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
            }
          ],
          intent: {
            text: "123",
            slugs: "got_token",
            entities: [""]
          },
          intent_history: [],
          status:false
        });
        const store = createStore(reducers, initialState);
        store.dispatch({
          type: 'BOT_REPLY'
        });
        console.log(store.getState());
      }),

      it('repo created', function () {
        const initialState = deepFreeze({
          user: "",
          access_token: "",
          conversation_history: [{
              who: 'User',
              msg: "hi",
              timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
            },
            {
              who: 'Bot',  
              msg: "please provide access tokens",
              timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT"),
            },
            {
              who: 'User',  
              msg: "123",
              timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
            },
            {
                who: 'Bot',  
                msg:"Thank you. How may I help you ?",
                timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
              },
              {
                who: 'User',  
                msg: "Create a repo ",
                timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
              },
              {
                who: 'Bot',
                msg:"Please provide Repo name",
                timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
              },
              {
                who: 'User',
                msg: "smalltalk",
                timestamp:dateFormat(new Date(), "dddd, dS mmmm, yyyy, h:MM:ss TT")
              }
          ],
          intent: {
            text: "smalltalk",
            slugs: 'repo',
            entities: ["repo name"]
          },
          intent_history: [],
          isActive:false
        });
        const store = createStore(reducers, initialState);
        store.dispatch({
          type: 'BOT_REPLY'
        });
        console.log(store.getState());
      })


});    
