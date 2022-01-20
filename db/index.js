const fs = require('fs');
const util = require('util');
// for unique id's
const uuid = require('uuid/v1')

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

// class for funtions to read, write, and delete notes
class DB {
    read() {
        return readAsync('db/db.json', 'utf-8')
    }

    write(notes) {
        return writeAsync('db/db.json', JSON.stringify(notes));
    }

    writeNotes(note) {
        // destructure contents of db.json
        const { title, text } = note;

        const newNote = {
            title,
            text,
            // add unique id
            id: uuid()
        }

        return this.readNotes()
            // use rest operator for notes and add newNote to array
            .then((notes) => [...notes, newNote])
            .then(newArray => this.write(newArray));
    };
    readNotes() {
        return this.read()
            .then((notes) => {
                let allNotes;
                // try / catch block to handle errors
                try {
                    allNotes = [].concat(JSON.parse(notes))
                } catch (err) {
                    allNotes = []
                }

                return allNotes;
            });
    };
    deleteNote(id) {
        return this.readNotes()
            // filter out note to be deleted by id
            .then(notes => notes.filter(note => note.id !== id))
            // update the file with new array
            .then(newNotesArr => this.write(newNotesArr));
    }
};

module.exports = new DB();