import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Sender from '../message/Sender';
import Receiver from '../message/Receiver';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { sendMessage } from '../../API/Message_API';
import { setConversation, setListMessage } from '../../redux_action/Message_Action';
import { uploadImage } from '../../API/UploadFile';
import { getListMessage } from './../../API/Message_API';
import './Scroll_User.css';

BoxChat_User.propTypes = {
    Socket: PropTypes.object,
};

BoxChat_User.defaultProps = {
    Socket: null,
};

function BoxChat_User(props) {

    const {Socket} = props;
    
    const sender = useSelector(state => state.user.sender);

    const conversation = useSelector(state => state.message.conversation);

    const receiver = useSelector(state => state.message.receiver);

    const listMessage = useSelector(state => state.message.listMessage);

    const listUserOnline = useSelector(state => state.user.listUserOnline);

    const listUserInRoom = useSelector(state => state.user.listUserInRoom);

    const {setValue, register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const [formMes, setFormMes] = useState({
        file: '',
        text: ''
    });

    
    const onChangeData = (event) => {
        const {name,value} = event.target;

        setFormMes({
            ...formMes,
            [name]: value
        });
    }

    const onSendMessage = async () => {

        let urlImage = '';

        if (formMes.file){
            const formData = new FormData();
            formData.append("file", formMes.file );

            await uploadImage(formData).then(res => {
                const {data} = res;
                urlImage = data;
            }).catch(err => {
                console.log(err);
            })
        }

        const isRoom = await listUserInRoom.some(user => user.userId === receiver._id && user.conversationId === conversation._id);
        const newMes = {
            conversationId: conversation._id,
            sender: sender._id,
            text: formMes.text,
            image: urlImage,
            isSeenMessage: isRoom,
            isSeen: isRoom
        }

        sendMessage(newMes).then(res => {

            const {data} = res;

            Socket.current.emit('sendMessage',{
                senderId: sender._id,
                receiverId: receiver._id,
                conversationId: conversation._id
            });

            const action_setConversation = setConversation(data.conversation);
                            
            dispatch(action_setConversation);

            const action_setListMessage = setListMessage(data.listMessages);
    
            dispatch(action_setListMessage);

        });

        setFormMes({
            file: '',
            text: ''
        })
        setImage(null);
    }

    const [image, setImage] = useState(null);

    const [page, setPage] = useState(0);

    const [top, setTop] = useState(50);

    const logScroll = ()=>{
        if(document.getElementById("load1").scrollTop <= top){

            getListMessage(conversation._id, sender._id, page+1).then(res => {

                const {data} = res;
    
                const newListMessage = data.listMessage;
    
                const action_setListMessage = setListMessage(newListMessage);
    
                dispatch(action_setListMessage);
                
                if(newListMessage.length > listMessage.length){
                    document.getElementById("load1").scrollTop = 90;
                }else{
                    setTop(0);
                    document.getElementById("load1").scrollTop = 0;
                }
                setPage(page+1);

            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className='border border-primary p-1 rounded' onLoad={()=>{
            if(page == 0){
            document.getElementById("load1").scrollTop = document.getElementById("load1").scrollHeight; 
            }
        }}>
                <div className="border-bottom bg-light d-flex p-2">
                    <div>
                        <img src={receiver.imageUser} style={{width:"70px",height:"70px"}} className="rounded-circle" alt="..."/>
                    </div>
                    <div className="ml-3 d-flex flex-column align-items-start">
                        <span style={{fontSize:'20px'}}>{receiver.nameUser}</span>
                        {listUserOnline.some(user => user.userId === receiver._id) ? 
                            <span className="text-success" style={{fontSize:'10px'}}>online</span>
                            :<span className="text-muted" style={{fontSize:'10px'}}>offline</span>
                        }
                    </div>
                </div>
                <div className="list" id='load1' style={{height:'60vh',overflowY:'scroll'}} onScroll={logScroll}>
                    {listMessage.map((message, index)=>{
                        return message.sender === sender._id ? <Sender key={index} Sender={sender} Message={message}/> : <Receiver key = {index} Receiver={receiver} Message={message}/>
                    })}
                </div>
                {image != null ? 
                <div className='p-1 float-left' style={{zIndex: '111'}}>
                    <span className='border rounded float-left'>
                        <img style={{width: '100px', height: '150px'}} src={image} id='imagee' alt='...'/>
                        <button type="button" className="close" onClick={
                            () => {
                                setImage(null);
                                setFormMes({
                                    ...formMes,
                                    file: ''
                                })
                            }
                        }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </span>
                </div>: ''}
                <form className="rounded" onSubmit={handleSubmit(onSendMessage)}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label for="upload-photo" className="input-group-text bg-light"><i className="bi bi-files"></i></label>
                            <input type="file" name="photo" style={{opacity:'0',position:"absolute",zIndex:-1,with:"0"}} id="upload-photo" 
                                {...setValue('file',formMes.file)}
                                onChange = {(event) => {
                                    setFormMes ({
                                        ...formMes,
                                        file: event.target.files[0]
                                    });

                                    const imageFile = event.target.files[0];
                                    const imageUrl = URL.createObjectURL(imageFile);
                                    setImage(imageUrl);
                                }}
                            />
                        </div>
                        <input type="text" className="form-control bg-light" placeholder="Message"
                            {...setValue('text',formMes.text)}
                            {...register('text',{required: true, minLength: 1})}
                            onChange = {onChangeData}
                        />
                        <div className="input-group-prepend">
                            <button className="input-group-text bg-light rounded-right" id="basic-addon1"><i className="bi bi-cursor"></i></button>
                        </div>
                    </div>
                </form>
        </div>
    );
}

export default BoxChat_User;