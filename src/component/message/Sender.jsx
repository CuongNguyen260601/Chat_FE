import React from 'react';
import PropTypes from 'prop-types';

Sender.propTypes = {
    Sender: PropTypes.object,
    Message : PropTypes.object,
};

Sender.defaultProps = {
    Sender: {
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

function Sender(props) {
    const {Sender,Message} = props;
    return (
        <div>
            {Message.image != '' ? 
            <div className="d-flex flex-row-reverse align-items-center rounded p-2">
                <div className="ml-3">
                    <img src={Sender.imageUser} style={{width:"50px",height:"50px"}} className="rounded-circle" alt="..."/>
                </div>
                <span className="d-flex flex-column align-items-start border bg-primary text-white text-wrap" style={{width: '200px', height:'250px'}} >
                    <img src = {Message.image} style={{width: '100%', height: '90%'}}/>
                    <span className="d-flex flex-column align-items-start p-2 text-white text-wrap" style={{fontSize:'10px', maxWidth:'350px'}}>{Message.text}</span>
                </span>
            </div> : 
            <div className="d-flex flex-row-reverse align-items-center p-2">
                <div className="ml-3">
                    <img src={Sender.imageUser} style={{width:"50px",height:"50px"}} className="rounded-circle" alt="..."/>
                </div>
                <span className="d-flex flex-column align-items-start border p-2 rounded-pill bg-primary text-white text-wrap" style={{fontSize:'10px', maxWidth:'350px'}}>{Message.text}</span>
            </div>
            }
        </div>
    );
}

export default Sender;