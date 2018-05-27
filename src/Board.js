import React, { Component } from 'react'
import Note from './Note'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /*
                The state of the notes is held in the parent, 
                each time a note is updated, we need to send
                that child note's text its parent i.e. board.
             */
            notes: [
                {id:0, note: 'Call Jimmy'},
                {id:1, note: 'Pickup laundry'},
                {id:2, note: 'Watch tv'},
            ]
        }
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
    }

    /*
        This function will be passed down to each child 
        to update the parent's state
     */
    update(newText, i) {
        console.log(`updating item at index ${i}, ${newText}`);
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => note.id !== i ? note : {...note, note: newText}
            )
        }))
    }

    remove(id) {
        console.log(`deleting item at id ${id}`);
        this.setState(prevState => ({
            notes: prevState.notes.filter(
                note => note.id !== id
            )
        }))
    }

    eachNote(note, i) {
        return (
            <Note key={i} index={i} onChange={this.update} onRemove={this.remove}>
                {note.note}
            </Note>
        )
    }

    render() {
        return (
            <div className='board'>
                {this.state.notes.map(this.eachNote)}
            </div>
        )
    }
}

export default Board
