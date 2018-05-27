import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'


class Note extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false
        }

        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderNote = this.renderNote.bind(this)
    }

    edit() { alert('editing note'); this.setState({editing: true}) }
    remove() { alert('removing note') }
    
    /*
        Define behavior in the event of onChange
        Set the state of the note back to editing false. 
        This is how react applications work. We store state data 
        in the parent component, we pass down state via props 
        and then we pass up new information with events. 
     */
    save(e) {
        e.preventDefault();
        this.props.onChange(this._newText.value, this.props.index);
        this.setState({
            editing: false
        })
    }

    renderForm() {
        return (
            <div className='note'>
                <form onSubmit={this.save}>
                    <textarea ref={input => this._newText = input}>{this.props.children}</textarea>
                    <button id='save'><FaFloppyO /></button>
                </form>
            </div>
        )
    }

    renderNote() {
        return (
            <div className='note'>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} id='edit'><FaPencil /></button>
                    <button onClick={this.remove} id='remove'><FaTrash /></button>
                </span>
            </div> 
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderNote()
    }
}

export default Note
