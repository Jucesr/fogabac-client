import React from 'react'
import {connect} from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'

const NotificationMessage = (props) => {

  const {type, message} = props.modal

  let title, style;

  switch (type) {
    case 'ERROR':
      title = 'Ha ocurrido un error' 
      style = {
        color: 'red'
      } 
    break;
  
    default:
      title = 'Información'
      style = {
        color: 'green'
      }
      break;
  }

  return (
    <div>
      <Modal style={style} open={type !== undefined} onClose={props.closeModal} >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            {typeof message == 'string' ? message : JSON.stringify(message)}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={props.closeModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch({
      type: 'CLOSE_NOTIFICATION'
    })
  }
});


const mapStateToProps = (state) => ({
  modal: state.app.modal
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationMessage)