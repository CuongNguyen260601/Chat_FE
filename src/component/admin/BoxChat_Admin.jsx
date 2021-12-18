import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { sendMessage } from '../../API/Message_API';
import { getListMessage } from '../../API/Message_API';
import { setConversation, setListMessage } from '../../redux_action/Message_Action';
import BoxChat_Admin_Details from './BoxChat_Admin_Details';
import { uploadImage } from '../../API/UploadFile';

BoxChat_Admin.propTypes = {
    Socket: PropTypes.object,
};

BoxChat_Admin.defaultProps = {
    Socket: null,
};

function BoxChat_Admin(props) {

    const {Socket} = props;

    const conversation = useSelector(state => state.message.conversation);

    const {setValue, register, handleSubmit} = useForm();

    const sender = useSelector(state => state.user.sender);

    const receiver = useSelector(state => state.message.receiver);

    const listUserOnline = useSelector(state => state.user.listUserOnline);
    
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

        const isOnline = await listUserOnline.some(user => user.userId === receiver._id );
        const newMes = {
            conversationId: conversation._id,
            sender: sender._id,
            text: formMes.text,
            image: urlImage,
            isSeenMessage: isOnline,
            isSeen: true
        }

        sendMessage(newMes).then(res => {

            const {data} = res;

            const action_setConversation = setConversation(data.conversation);
                            
            dispatch(action_setConversation);

            const action_setListMessage = setListMessage(data.listMessages);
    
            dispatch(action_setListMessage);

            Socket.current.emit('sendMessage',{
                senderId: sender._id,
                receiverId: receiver._id,
                conversationId: conversation._id
            });

        });

        setFormMes({
            file: '',
            text: ''
        })

        setImage(null);
        
    }
    
    useEffect(() => {
        Socket.current.on('getMessage1', data => {

            if(data.conversationId === conversation._id){

                    getListMessage(conversation._id, sender._id, 0).then(res => {
        
                        const {data} = res;
        
                        const listMessage = data.listMessage;
        
                        const action_setListMessage = setListMessage(listMessage);
        
                        dispatch(action_setListMessage);
                        
                        
                    }).catch(err => {
                        console.log(err);
                    })
            }
        })
    }, [conversation]);

    const [image, setImage] = useState(null);

    return (
        <div className='p-1 rounded  col-8'>
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
                <div className="list" style={{height:'80vh',overflowY:'auto'}}>
                    <BoxChat_Admin_Details/>
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
                                    })
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

export default BoxChat_Admin;