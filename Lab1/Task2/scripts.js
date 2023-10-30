function addNote() {
    const noteText = document.getElementById('noteText').value;
    const colorSelect = document.getElementById('colorSelect');
    const selectedColor = colorSelect.options[colorSelect.selectedIndex].value;

    //when no note is writing, pop up to tell user
    if (noteText.trim() === '') {
        alert('Error: Please write your own note');
        return;
    }

    const noteContainer = document.createElement('div');
    noteContainer.className = 'note';
    noteContainer.style.backgroundColor = selectedColor;

    const noteContent = document.createElement('p');
    noteContent.textContent = noteText;

    //edit the notes 
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editNote(noteContent);

    //deleting the notes
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteNote(noteContainer);

    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(editButton);
    noteContainer.appendChild(deleteButton);

    document.getElementById('noteList').appendChild(noteContainer);
    document.getElementById('noteText').value = '';
}

//function for editing the notes
function editNote(noteContent) {
    const updatedText = prompt('Edit your note here:', noteContent.textContent);
    if (updatedText !== null) {
        noteContent.textContent = updatedText;
    }
}

function deleteNote(noteContainer) {
    if (confirm('Do you wish to delete your note:')) {
        noteContainer.remove();
    }
}