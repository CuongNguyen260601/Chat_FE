import React, {useEffect, useRef}  from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {io} from 'socket.io-client';
import env from "react-dotenv";
import Login_Page from './login/Login_Page';
import Chat_User from './user/Chat_User';
import Chat_Admin from './admin/Chat_Admin';
import { setSender, setListUserOnline, setListUserInRoom} from '../redux_action/User_Action';
import Icon_Admin from './../component/admin/Icon_Admin';
import Icon_User from '../component/user/Icon_User';

function Home_Page() {

    const socket = useRef();

    const sender = useSelector(state => state.user.sender);

    const dispatch = useDispatch();


    useEffect(() => {
        const localSender = JSON.parse(localStorage.getItem('sender'));

        if (localSender == null || localSender._id === 'undefined' || localSender._id === ''){

            const action_setSender = setSender(null);
            
            dispatch(action_setSender);

        }else {
            const action_setSender = setSender(localSender);

            dispatch(action_setSender);

            socket.current = io(env.SOCKET);

            socket.current.emit('addUser', localSender._id);

            socket.current.on('getUser', (data)=>{

                const action_setListUserOnline = setListUserOnline(data);
                
                dispatch(action_setListUserOnline);
            })

            socket.current.on('getUserRoom', data => {

                const action_setListUserRoom = setListUserInRoom(data);
                
                dispatch(action_setListUserRoom);
            })
            
        }

        return () => {
            const action_setSender = setSender(null);
            dispatch(action_setSender);
        }
    }, []);

    if (sender == null || sender._id === 'undefined' || sender._id === ''){
        return (
            <Router>
                <Switch>
                    <Route exact path='/*' render = {
                        ()=>{
                            return (
                                <div>
                                    <Login_Page Socket = {socket}/>
                                </div>
                            )
                        }
                    }/>
                </Switch>
            </Router>
        )
    } else if (sender.isAdmin){
        return (
            <Router>
                <Switch>
                    <Route path='/' render = {
                        ()=>{
                            return (
                                <div>
                                    <Icon_Admin/>
                                </div>
                            )
                        }
                    }/>
                    <Route exact path='/chatAdmin' render = {
                        ()=>{
                            return (
                                <div>
                                    <Chat_Admin Socket = {socket}/>
                                </div>
                            )
                        }
                    }/>
                </Switch>
            </Router>
        )
    }else{
        return (
            <Router>
                <Switch>
                    <Route path='/' render = {
                        ()=>{
                            return (
                                <div>
                                    <Icon_User/>
                                </div>
                            )
                        }
                    }/>
                    <Route exact path='/chatUser' render = {
                        ()=>{
                            return (
                                <div>
                                    <Chat_User Socket={socket}/>
                                </div>
                            )
                        }
                    }/>
                </Switch>
            </Router>
        )
    }
}

export default Home_Page;