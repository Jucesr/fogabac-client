import React from 'react'
import {connect} from 'react-redux'
import { Modal } from 'semantic-ui-react'


const ModalForm = (props) => {
  
  const {modal_id, modal_title} = props.app
  
  return (
    <Modal
      open={modal_id !== undefined}
      size='small'
      onClose={props.closeModal}
    >
      <Modal.Header>{modal_title}</Modal.Header>
      <Modal.Content>

        
      </Modal.Content>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        modal_id: undefined,
        modal_title: undefined
      }
    })
  }
});

const mapStateToProps = (state) => ({
  app: state.app
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);