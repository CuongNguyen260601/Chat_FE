import React from 'react'
import Messenger from '../../common/login/messenger.jpg';
import '../../common/login/Login_Page.css';

function Icon_Admin() {
    return (
        <div>
            <div className='overlay-container'>
                <div className='overlay'>
                    <div className='overlay-panel overlay-right'>
                        <img src={Messenger} style={{width:'70%', height:'100%'}} alt='...'/>
                        <div className='icon-number'>1</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Icon_Admin
