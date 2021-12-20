import React from 'react'
import Messenger from '../common/login/messenger.jpg';
import '../common/login/Login_Page.css';

function Icon_Home() {
    return (
        <div>
            <div className='overlay-container bg-color'>
                <div className='overlay'>
                    <div className='overlay-panel overlay-right'>
                        <img src={Messenger} style={{width:'70%', height:'100%'}} alt='...'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Icon_Home
