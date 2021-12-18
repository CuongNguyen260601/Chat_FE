import React, {useEffect} from 'react';
import Conversation from './Conversation';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getConversationByUser } from '../../API/Conversation_API';
import { setListConversation } from '../../redux_action/Conversation_Action';

List_Conversation.propTypes = {
    OnClickOpenBoxChat: PropTypes.func,
    Socket: PropTypes.object,
};

List_Conversation.defaultProps = {
    OnClickOpenBoxChat: null,
    Socket: null
};

function List_Conversation(props) {

    const {Socket} = props;

    const {OnClickOpenBoxChat} = props;

    const listConversation = useSelector(state => state.conversation.listConversation);

    const sender = useSelector(state => state.user.sender);

    const listUserOnline = useSelector(state => state.user.listUserOnline);

    const dispatch = useDispatch();
    
    useEffect(() => {

        Socket.current.on('getMessage', data => {

            getConversationByUser(sender._id).then(res => {

                const {data} = res;

                console.log(data);
                
                const action_setListConversation = setListConversation(data.listConversation);
    
                dispatch(action_setListConversation);
    
            }).catch(err => {
                console.log(err);
    
                const action_setListConversation = setListConversation([]);
    
                dispatch(action_setListConversation);
            });
        })

    }, []);

    return (
        <div className="border-right col-4 rounded p-1" >
            <div className="border-bottom bg-light d-flex p-2">
                <div>
                    <img src={sender.imageUser} style={{width:"70px",height:"70px"}} className="rounded-circle" alt="..."/>
                </div>
                <div className="ml-3 d-flex flex-column align-items-start">
                    <span style={{fontSize:'20px'}}>{sender.nameUser}</span>
                    {listUserOnline.some(user => user.userId === sender._id) ? 
                        <span className="text-success" style={{fontSize:'10px'}}>online</span>
                        :<span className="text-muted" style={{fontSize:'10px'}}>offline</span>
                    }
                </div>
            </div>
            {/* <form className="rounded pt-1">
                <div className="input-group">
                    <input type="text" className="form-control bg-light" placeholder="Search"/>
                    <div className="input-group-prepend">
                        <button className="input-group-text bg-light rounded-right" id="basic-addon1"><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </form> */}
            <div className='list' style={{height: '70vh', overflowY: 'auto'}}>
                {listConversation.map((conversation, index)=>(
                     <Conversation Conversation={conversation} key={index} OnClickOpenBoxChat = {OnClickOpenBoxChat} Socket={Socket}/>
               ))}
            </div>
        </div>
    );
}

export default List_Conversation;