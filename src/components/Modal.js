import React from 'react';
import '../css/Modal.css';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: null,
            name: this.props.event.category.name,
            event: this.props.event
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.event.category.name
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.show !== this.props.show) {
            this.setState({
                show: this.props.show,
                name: this.props.event.category.name
            });
        }
    }

    closeModal() {
        this.setState({
            show: false
        })
    }

    update(field) {
        console.log(this.state.name);
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit() {
        this.updateCategoryName({name: this.state.name});
    }

    updateCategoryName(data) {
        return fetch(`http://api.my-events.site/api/v1/categories/${this.props.event.category.id}/`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Token 934845d84fdd7b5c3ecf4129e2d8b774d6c84c87",
                "Content-Type": 'application/json'
            }
        }).then(res => {
            let url = res.url;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.props.handleStateChange(data);

                    this.setState({
                        name: data.name,
                        show: false
                    });
                })
        }).catch(err => console.log(err));
    }

    render() {
        if(!this.state.show) {
            return null;
        }

        return (
            <div className="modal-background" onClick={() => this.closeModal()}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    <h3>Oops. Looks Like We Made a Mistake!</h3>
                    <p>If you think that this event belongs in a different
                        category, please update it with the form below.
                        Thank you for your assistance!
                    </p>
                    <h5>Please enter a new Category below.</h5>
                    <input 
                        type="text" 
                        value={this.state.name} 
                        onChange={this.update("name")}></input>
                    <br />
                    <button 
                        type="button"
                        onClick={() => this.handleSubmit()}>
                        Update Category</button>
                </div>
            </div>
        )
    }
}

export default Modal;