import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../API/User_API';
import { getLastMessage } from '../../API/Message_API';
import { countMessageNotSeen } from '../../API/Message_API';
import { setConversation } from '../../redux_action/Message_Action';

Conversation.propTypes = {
    Conversation: PropTypes.object,
    OnClickOpenBoxChat: PropTypes.func,
    Socket: PropTypes.object,
};

Conversation.defaultProps = {
    Conversation: {
        _id:'',
        members: [],
        isSeen:false,
        isDelete: false,    
        createdAt:'',
        updatedAt:'',
    },
    OnClickOpenBoxChat: null,
    Socket: null,

};

function Conversation(props) {

    const {Conversation, OnClickOpenBoxChat, Socket} = props;

    const sender = useSelector(state => state.user.sender);

    const receiverId = Conversation.members[0] === sender._id ? Conversation.members[1] : Conversation.members[0];

    const [receiver, setReceiver] = useState({
        _id:'',
        nameUser:'',
        imageUser:'',
        ageUser:'',
        emailUser:'',
        password:'',
        isAdmin:false,
        createdAt:'',
        updatedAt:'',
    });

    const [lastMessage, setLastMessage] = useState({
        _id:'',
        conversationId:'',
        sender: '',
        text:'',
        image:'',
        isSeenMessage: false,
        createdAt:'',
        updatedAt:''
    });

    const [mesNotSeen, setMesNotSeen] = useState(0);

    const listUserOnline = useSelector(state => state.user.listUserOnline);

    const dispatch = useDispatch();

    useEffect(() => {

        getUserById(receiverId).then(res => {

            const {data} = res;

            setReceiver(data);

            getLastMessage(Conversation._id).then(res => {

                const {data} = res;

                setLastMessage(data);

                countMessageNotSeen(receiverId, Conversation._id).then(res => {
                    const {data} = res;

                    setMesNotSeen(data);

                }).catch(err => {
                    console.log(err);

                    setLastMessage({
                        _id:'',
                        conversationId:'',
                        sender: '',
                        text:'',
                        image:'',
                        isSeenMessage: false,
                        createdAt:'',
                        updatedAt:''
                    });

                    setLastMessage('');

                    setMesNotSeen(0);
                })

            }).catch(err => {

                console.log(err);

                setLastMessage({
                    _id:'',
                    conversationId:'',
                    sender: '',
                    text:'',
                    image:'',
                    isSeenMessage: false,
                    createdAt:'',
                    updatedAt:''
                });

                setLastMessage('');

                setMesNotSeen(0);

            })

        }).catch(err => {

            setReceiver({
                _id:'',
                nameUser:'',
                imageUser:'',
                ageUser:'',
                emailUser:'',
                password:'',
                isAdmin:false,
                createdAt:'',
                updatedAt:'',
            });

            setLastMessage('');

            setMesNotSeen(0);
        });

    }, [Conversation]);

    useEffect(() => {

        Socket.current.on('getMessage', data => {

                getLastMessage(Conversation._id).then(res => {

                    const {data} = res;
    
                    setLastMessage(data);
    
                    countMessageNotSeen(receiverId, Conversation._id).then(res => {
                        const {data} = res;
    
                        setMesNotSeen(data);
    
                    }).catch(err => {
                        console.log(err);
    
                        setLastMessage({
                            _id:'',
                            conversationId:'',
                            sender: '',
                            text:'',
                            image:'',
                            isSeenMessage: false,
                            createdAt:'',
                            updatedAt:''
                        });
    
                        setLastMessage('');
    
                        setMesNotSeen(0);
                    })
    
                }).catch(err => {
    
                    console.log(err);
    
                    setLastMessage({
                        _id:'',
                        conversationId:'',
                        sender: '',
                        text:'',
                        image:'',
                        isSeenMessage: false,
                        createdAt:'',
                        updatedAt:''
                    });
    
                    setLastMessage('');
    
                    setMesNotSeen(0);
    
                })
        });
    }, []);

    return (
        <div className="d-flex p-2 border-bottom" onClick = {
            () => {
                const action_setConversation = setConversation(Conversation);
                        
                dispatch(action_setConversation);

                OnClickOpenBoxChat(Conversation);

                
                getLastMessage(Conversation._id).then(res => {

                    const {data} = res;
    
                    setLastMessage(data);
    
                    countMessageNotSeen(receiverId, Conversation._id).then(res => {
                        const {data} = res;
    
                        setMesNotSeen(data);
    
                    }).catch(err => {
                        console.log(err);
    
                        setLastMessage({
                            _id:'',
                            conversationId:'',
                            sender: '',
                            text:'',
                            image:'',
                            isSeenMessage: false,
                            createdAt:'',
                            updatedAt:''
                        });
    
                        setLastMessage('');
    
                        setMesNotSeen(0);
                    })
    
                }).catch(err => {
    
                    console.log(err);
    
                    setLastMessage({
                        _id:'',
                        conversationId:'',
                        sender: '',
                        text:'',
                        image:'',
                        isSeenMessage: false,
                        createdAt:'',
                        updatedAt:''
                    });
    
                    setLastMessage('');
    
                    setMesNotSeen(0);
    
                })
            }
        }>
            <div>
                <img src={receiver.imageUser} style={{width:"50px",height:"50px"}} className="rounded-circle" alt="..."/>
            </div>
            <div className="ml-3 d-flex flex-column align-items-start">
                <span>{receiver.nameUser} {mesNotSeen > 0 ? <span className='text-right text-white p-1 bg-danger rounded-pill'>{mesNotSeen}</span>  : ''} </span>
                {listUserOnline.some(user => user.userId === receiverId) ? 
                    <span className="text-success" style={{fontSize:'10px'}}>online</span>
                    :<span className="text-muted" style={{fontSize:'10px'}}>offline</span>
                }
                {lastMessage.sender === receiver._id && !lastMessage.isSeenMessage ?
                    <p className="text-muted text-truncate" style={{maxWidth:'50vh',fontSize:'15px',fontWeight:'bold'}}>{lastMessage.text}</p> :
                    <div>
                        {lastMessage.sender === receiver._id ? 
                            <p className="text-muted text-truncate" style={{maxWidth:'50vh',fontSize:'15px'}}>{lastMessage.text}</p> : 
                            <p className="text-muted text-truncate" style={{maxWidth:'50vh',fontSize:'15px'}}>Bạn: {lastMessage.text}</p>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default Conversation;