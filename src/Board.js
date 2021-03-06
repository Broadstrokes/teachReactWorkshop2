import React, { Component } from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /*
                The state of the notes is held in the parent, 
                each time a note is updated, we need to send
                that child note's text its parent i.e. board.
             */
            notes: []
        }
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.add = this.add.bind(this)
        this.nextId = this.nextId.bind(this)
    }

    componentWillMount() {
        // make service call here to fetch some data
        let self = this
        let serviceUrl = `https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
        if(this.props.count) {
            fetch(serviceUrl)
                .then(response => response.json()) // convert to JSON
                .then(
                    json => json[0]
                        .split('. ')
                        .forEach(sentence => self.add('Buy/ '.concat(sentence.substring(0, 20))))
                )
        }
    }

    /*
        This will check to make sure something has changed before re-rendering component
        If something has changed it will re-render, otherwise it won't
     */
    shouldComponentUpdate(nextProps, nextState) { 
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
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

    add(text) {
        this.setState(prevState => ({
            // notes: prevState.notes.push({id:0, note:text}),
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text
                }
            ]
        })
    )}

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++
    }

    eachNote(note, i) {
        return (
            <Note 
                key={note.id} 
                index={note.id} 
                onChange={this.update} 
                onRemove={this.remove}
                onAdd={this.add}>
                {note.note}
            </Note>
        )
    }

    render() {
        return (
            <div className='board'>
                {this.state.notes.map(this.eachNote)}
                { /* pass a string to each new note */ }
                <button onClick={this.add.bind(null, 'New Note')} id='add'>
                    <FaPlus />
                </button>
            </div>
        )
    }
}

export default Board
