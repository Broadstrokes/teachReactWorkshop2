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
        this.randomBetween = this.randomBetween.bind(this)
    }


    componentWillMount() {
       this.style = {
        right: this.randomBetween(0, window.innerWidth - 150, 'px'),
        top: this.randomBetween(0, window.innerHeight - 150, 'px'),
        transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
       } 
    }

    componentDidUpdate() { // check if component updated
        let textArea;
        if (this.state.editing) {
            textArea  = this._newText
            textArea.focus()
            textArea.select()
        }
    }

    randomBetween(x, y, s) {  // s is the unit of measure
        return (
            x + Math.ceil(Math.random() * (y - x)) + s
        )
    }

    edit() { 
        this.setState({
            editing: true
        }) 
    }
    
    remove(e) {
        e.preventDefault();
        this.props.onRemove(this.props.index)
    }
    
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
            <div className='note' style={this.style}>
                <form onSubmit={this.save}>
                    <textarea ref={input => this._newText = input} defaultValue={this.props.children} />
                    <button id='save'><FaFloppyO /></button>
                </form>
            </div>
        )
    }

    renderNote() {
        return (
            <div className='note' style={this.style}>
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
