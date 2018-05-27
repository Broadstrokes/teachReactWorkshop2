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

    eachNote(note, i) {
        return (
            <Note key={i} index={i} onChange={this.update}>
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
