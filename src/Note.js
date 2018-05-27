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
    save() { alert('saving note: ' + this._newText.value) }

    renderForm() {
        return (
            <div className='note'>
                <form>
                    <textarea ref={input => this._newText = input}/>
                    <button onClick={this.save} id='save'><FaFloppyO /></button>
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
