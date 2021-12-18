import React from 'react';
import PropTypes from 'prop-types';

Receiver.propTypes = {
    Sender: PropTypes.object,
    Message : PropTypes.object,
};

Receiver.defaultProps = {
    Receiver: {
        _id:'',
        nameUser:'',
        imageUser:'',
        emailUser:'',
        password:'',
        isAdmin:false,
        createdAt:'',
        updatedAt:'',
    },
    Message : {
        _id: '',
        conversationId: '',
        sender: '',
        text: '',
        image: '',
        isSeenMessage: false,
        createdAt: '',
        updatedAt: ''
    }
};

function Receiver(props) {
    
    const {Receiver,Message} = props;

    return (

        <div>
            {Message.image != '' ? 
            <div className="d-flex  align-items-center p-2">
                <div>
                    <img src={Receiver.imageUser} style={{width:"50px",height:"50px"}} className="rounded-circle" alt="..."/>
                </div>
                <span className="d-flex flex-column align-items-start border text-wrap ml-3" style={{width: '200px', height:'250px'}} >
                    <img src = {Message.image} style={{width: '100%', height: '90%'}}/>
                    <span className="d-flex flex-column align-items-start p-2 text-wrap" style={{fontSize:'10px', maxWidth:'350px'}}>{Message.text}</span>
                </span>
            </div> : 
            <div className="d-flex  align-items-center p-2">
                <div>
                    <img src={Receiver.imageUser} style={{width:"50px",height:"50px"}} className="rounded-circle" alt="..."/>
                </div>
                <span className="d-flex flex-column align-items-start border p-2 rounded-pill text-wrap ml-3" style={{fontSize:'10px', maxWidth:'350px'}}>{Message.text}</span>
            </div>
            }
        </div>
    );
}

export default Receiver;