import React, { Component } from 'react';
import '/index.css';

const rules = {
    required: (value) => {
        return (value !== null && value !== undefined && value !== "")
    }
};

const tags = ["INPUT", "SELECT", "TEXTAREA"]


export class ValidForm extends Component {
    constructor() {
        super()

        this.state = {
            form: {

            }
        };

        this.formRef = React.createRef();
    }
    onChange(e) {

    }
    render() {

        return (
            <form ref={this.formRef} onChange={(e) => this.onChange(e)}>
                {this.props.children}
            </form>
        )
    }
}