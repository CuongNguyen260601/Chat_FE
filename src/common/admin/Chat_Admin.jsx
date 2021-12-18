import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import List_Conversation from '../../component/admin/List_Conversation';
import BoxChat_Admin from '../../component/admin/BoxChat_Admin';
import { useSelector, useDispatch } from 'react-redux';
import { getConversationByUser } from '../../API/Conversation_API';
import { setListConversation } from '../../redux_action/Conversation_Action';
import { getListMessage } from '../../API/Message_API';
import { getUserById } from '../../API/User_API';
import { setListMessage, setReceiver } from '../../redux_action/Message_Action';
import { updateMessage } from '../../API/Message_API';

Chat_Admin.propTypes = {
    Socket: PropTypes.object,
};

Chat_Admin.defaultProps = {
    Socket: null
};

function Chat_Admin(props) {

    const {Socket} = props;

    const sender = useSelector(state => state.user.sender);

    const dispatch = useDispatch();

    useEffect(() => {

        getConversationByUser(sender._id).then(res => {

            const {data} = res;

            const action_setListConversation = setListConversation(data.listConversation);

            dispatch(action_setListConversation);

        }).catch(err => {
            console.log(err);
        });

    }, []);

    const [openBoxChat, setOpenBoxChat] = useState(false);

    const onClickOpenBoxChat = (conversation) => {
       

        Socket.current.emit('addUserRoom', {
            userId: sender._id,
            conversationId: conversation._id
        });



        updateMessage(conversation._id).then(res => {
                
            const receiverId = conversation.members[0] === sender._id ? conversation.members[1] : conversation.members[0];


            getUserById(receiverId).then(res => {

                const {data} = res;

                const action_setReceiver = setReceiver(data);
                
                dispatch(action_setReceiver);

                getListMessage(conversation._id, sender._id, 0).then(res => {

                    const {data} = res;
    
                    const listMessage = data.listMessage;
    
                    const action_setListMessage = setListMessage(listMessage);
    
                    dispatch(action_setListMessage);
                    
                    
                }).catch(err => {
                    console.log(err);
                })

                setOpenBoxChat(true);

            }).catch(err => {

                console.log(err);
            
            });
        });
    }

    return (
        <div className='p-5'>
            <div className='mt-2'>
                <div className='border row mt-2'>
                    <List_Conversation OnClickOpenBoxChat = {onClickOpenBoxChat} Socket = {Socket}/>
                    {openBoxChat ? <BoxChat_Admin Socket={Socket}/> : ''}
                </div>
            </div>
        </div>
    );
}

export default Chat_Admin;