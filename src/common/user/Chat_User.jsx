import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import BoxChat_User from '../../component/user/BoxChat_User';
import { getListMessage } from '../../API/Message_API';
import { useSelector, useDispatch } from 'react-redux';
import { getConversationByUser } from '../../API/Conversation_API';
import { getAdmin } from '../../API/User_API';
import { setConversation, setReceiver, setListMessage } from '../../redux_action/Message_Action';

Chat_User.propTypes = {
    Socket: PropTypes.object,
};

Chat_User.defaultProps = {
    Socket: null
};

function Chat_User(props) {

    const {Socket} = props;

    const sender = useSelector(state => state.user.sender);

    const dispatch = useDispatch();


    useEffect(() => {

        Socket.current.on('getMessage', data => {

            console.log("a")

            getConversationByUser(sender._id).then(res => {

                const {data} = res;
    
                const conversation = data.listConversation[0];
    
                getListMessage(conversation._id, sender._id, 0).then(res => {
    
                    const {data} = res;
    
                    const listMessage = data.listMessage;
    
                    const action_setConversation = setConversation(conversation);
                        
                    dispatch(action_setConversation);
    
                    const action_setListMessage = setListMessage(listMessage);
    
                    dispatch(action_setListMessage);
                    
                    
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            });
        })
    }, []);

    useEffect(() => {

        getAdmin().then(res => {

            const {data} = res;

            const action_setReceiver = setReceiver(data);
            
            dispatch(action_setReceiver);

        }).catch(err => {
            console.log(err);
        });

        getConversationByUser(sender._id).then(res => {

            const {data} = res;

            const conversation = data.listConversation[0];

            if (conversation) {
                Socket.current.emit('addUserRoom', {
                    userId: sender._id,
                    conversationId: conversation._id
                })
            }

            getListMessage(conversation._id, sender._id, 0).then(res => {

                const {data} = res;

                const listMessage = data.listMessage;

                const action_setConversation = setConversation(conversation);
                    
                dispatch(action_setConversation);

                const action_setListMessage = setListMessage(listMessage);

                dispatch(action_setListMessage);
                
                
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className='container '>
            <div className='mt-2'>
                <BoxChat_User Socket = {Socket}/>
            </div>
        </div>
    );
}

export default Chat_User;