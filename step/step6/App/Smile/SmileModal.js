import React from 'react';
import Modal from 'react-bootstrap/Modal';

class SmileModal extends React.Component {

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.Hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Smiley Smile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Smiley Face</Modal.Body>
                </Modal>
            </>
        );
    }
}

export default SmileModal;