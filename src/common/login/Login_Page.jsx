import React, {useState} from 'react';
import './Login_Page.css';
import Messenger from './messenger.jpg';
import PropTypes from 'prop-types';
import {io} from 'socket.io-client';
import {useForm} from 'react-hook-form';
import { login } from '../../API/User_API';
import { setSender, setListUserOnline, setListUserInRoom } from '../../redux_action/User_Action';
import { useDispatch } from 'react-redux';
import env from "react-dotenv";

Login_Page.propTypes = {
    Socket: PropTypes.object,
};

Login_Page.defaultProps = {
    Socket: null
};

function Login_Page(props) {

    const {Socket} = props;

    const {setValue, register, handleSubmit, formState: {errors}} = useForm();

    const [infoLogin, setInfoLogin] = useState(
        {
            email: '',
            password: ''
        }
    );

    const dispatch = useDispatch();
    
    const onChangeData = (event) =>{

        const {name, value} = event.target;
        
        setInfoLogin({
            ...infoLogin,
            [name]: value
        });

    }

    const onLogin = () => {
        login(infoLogin).then(res => {

            const {data} = res;

            const sender = data;

            localStorage.setItem('sender', JSON.stringify(sender));

            const action_setSender = setSender(sender);

            dispatch(action_setSender);

            Socket.current = io(env.SOCKET);
            Socket.current.emit('addUser', sender._id);
            Socket.current.on('getUser', (data)=>{
                const action_setListUserOnline = setListUserOnline(data);
                dispatch(action_setListUserOnline);
            })

            Socket.current.on('getUserRoom', data => {

                const action_setListUserRoom = setListUserInRoom(data);
                
                dispatch(action_setListUserRoom);
            })

        }).catch(err => {
            window.alert('Login false !!!');
        })
    }

    return (
        <div className='mt-2'>
            <div className='container-login container' id='container'>
                <div className='form-container sign-in-container'>
                    <form className='form-login' onSubmit={handleSubmit(onLogin)}>
                    <h1 className='h1-title'>Sign in</h1>
                    <h5>Account is default !</h5>
                    <input type='email' className='rounded input-login' placeholder='Email'
                        {...setValue('email', infoLogin.email)}
                        {...register('email', {required: true})}
                        onChange={onChangeData}
                    />
                    <p style={{color:'red'}}>{errors.email?.type === 'required' && 'This field is required !!!'}</p>
                    <input type='password' className='rounded input-login' placeholder='Password'
                        {...setValue('password', infoLogin.password)}
                        {...register('password',{required: true, minLength: 6})}
                        onChange={onChangeData}
                    />
                    <p style={{color:'red'}}>{errors.password?.type === 'required' && 'This field is required !!!'}</p>
                    <p style={{color:'red'}}>{errors.password?.type === 'minLength' && 'Password at least 6 characters !!!'}</p>
                    <button className='btn-submit' type='submit'>Sign In</button>
                    </form>
                </div>
                {/* <div className='overlay-container'>
                    <div className='overlay'>
                        <div className='overlay-panel overlay-right'>
                            <img src={Messenger} style={{maxWidth:'20vh'}} alt='...'/>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Login_Page;