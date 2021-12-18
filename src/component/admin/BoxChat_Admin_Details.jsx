import React, {useEffect, useState} from 'react';
import Sender from '../message/Sender';
import Receiver from '../message/Receiver';
import { useSelector, useDispatch} from 'react-redux';
import { getListMessage } from './../../API/Message_API';
import { setListMessage } from './../../redux_action/Message_Action';
import '../user/Scroll_User.css';

function BoxChat_Admin_Details(props) {

    const sender = useSelector(state => state.user.sender);

    const receiver = useSelector(state => state.message.receiver);

    const listMessage = useSelector(state => state.message.listMessage);

    const conversation = useSelector(state => state.message.conversation);

    const [page, setPage] = useState(0);

    const [top, setTop] = useState(50);

    const dispatch = useDispatch();
    
    const logScroll = ()=>{
        if(document.getElementById("load").scrollTop <= top){

            getListMessage(conversation._id, sender._id, page+1).then(res => {

                const {data} = res;
    
                const newListMessage = data.listMessage;
    
                const action_setListMessage = setListMessage(newListMessage);
    
                dispatch(action_setListMessage);
                
                if(newListMessage.length > listMessage.length){
                    document.getElementById("load").scrollTop = 90;
                }else{
                    setTop(0);
                    document.getElementById("load").scrollTop = 0;
                }
                setPage(page+1);

            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (

        <div className="list" id='load' style={{height:'80vh',overflowY:'scroll',scrollBottom:'0'}} onScroll={logScroll} onLoad={()=>{
            if(page == 0){
            document.getElementById("load").scrollTop = document.getElementById("load").scrollHeight; 
            }
        }}>
            {listMessage.map((message, index)=>{
                        return message.sender === sender._id ? <Sender key={index} Sender={sender} Message={message}/> : <Receiver key = {index} Receiver={receiver} Message={message}/>
            })}
        </div>

    );
}

export default BoxChat_Admin_Details;