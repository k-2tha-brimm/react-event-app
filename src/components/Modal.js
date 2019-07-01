import React from 'react';
import '../css/Modal.css';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        };
    }

    closeModal() {
        this.setState({
            show: false
        })
    }

    render() {
        if(!this.state.show) {
            return null;
        }

        return (
            <div className="modal-background" onClick={() => this.closeModal()}>
                <div className="modal-child">HELLO THIS IS A MODAL</div>
            </div>
        )
    }
}