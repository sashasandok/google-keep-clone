import React, { useEffect, useState, useRef } from 'react';
import { useInputValue } from '../../custom-hooks/';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Note from '../Note/Note';
import Header from '../Header/Header';
import { Input, Button } from 'antd';
import noteMapper from '../../mappers/note';
import firebase from '../../config/firebase';
import './Main.scss';

const Main = () => {
  // state for filtering notes
  const [res, setRes] = useState('');
  // state for loader
  const [isLoading, setIsLoading] = useState(false);
  // notes for mapping
  const [data, setData] = useState([]);
  // get notes list from firebase
  useEffect(() => {
    const db = firebase.firestore();
    db.collection('notes').onSnapshot(snap => {
      const notes = snap.docs.map(doc =>
        noteMapper({ ...doc.data(), id: doc.id }),
      );
      setData(notes);
      setIsLoading(true);
    });
  }, []);

  // state for opening create form
  const [openCreate, setOpenCreate] = useState(false);
  //state for opening modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for creating new note
  const title = useInputValue('');
  const content = useInputValue('');
  // curr note for updating
  const [currNote, settCurrNote] = useState('');
  // state for updated title and content
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUupdatedContent] = useState('');
  const inputTitleRef = useRef('');
  const inputContentRef = useRef('');

  // open and close create note form
  const openCreateBlock = () => {
    setOpenCreate(true);
  };

  const closeCreateBlock = () => {
    setOpenCreate(false);
  };

  // open and close modal
  const openModal = note => {
    settCurrNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // submit note update
  const onSaveEditedNote = () => {
    if (!updatedTitle || (!updatedContent && !title) || !content) {
      alert('Please, Enter Updates To Note');
    } else {
      const editedNote = {
        id: currNote.id,
        title: updatedTitle,
        content: updatedContent,
      };
      firebase
        .firestore()
        .collection('notes')
        .doc(currNote.id)
        .set(editedNote);
    }
    closeModal();
  };

  // submit note creation
  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!title.bind.value || !content.bind.value) {
      alert('Please Enter New Note');
    } else {
      firebase
        .firestore()
        .collection('notes')
        .add({ title: title.bind.value, content: content.bind.value });
    }
    title.clear();
    content.clear();
  };

  return (
    <div className="main">
      <Header setRes={setRes} />
      <div className="main-page-block">
        {openCreate ? (
          <div className="panel-inputs">
            <p className="open-create-note" onClick={closeCreateBlock}>
              Create new note
            </p>
            <form>
              <Input
                placeholder="note title"
                {...title.bind}
                onKeyDown={onKeyDown}
                allowClear
              />
              <Input
                placeholder="note content"
                {...content.bind}
                onKeyDown={onKeyDown}
                allowClear
              />
            </form>
          </div>
        ) : (
          <div className="panel">
            <p className="open-create-note" onClick={openCreateBlock}>
              New post...
            </p>
          </div>
        )}
        <div className="notes-block">
          {!isLoading && <Loader />}
          {data.length ? (
            data
              .filter(item => {
                const text = res && res.toLowerCase();
                const searchStr = `${item.title}`;
                return searchStr.toLowerCase().includes(text);
              })
              .map((note, i) => {
                return (
                  <Note
                    key={i}
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    openModal={() => openModal(note)}
                  />
                );
              })
          ) : !isLoading ? (
            <Loader />
          ) : (
            <div className="no-data">
              <h3>No any notes, please enter some new</h3>
            </div>
          )}
        </div>
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
          <div className="edit-note">
            <form>
              <input
                type="text"
                name="title"
                onChange={evt => setUpdatedTitle(evt.target.value)}
                defaultValue={currNote.title}
                ref={inputTitleRef}
              />
              <input
                type="text"
                name="content"
                onChange={evt => setUupdatedContent(evt.target.value)}
                defaultValue={currNote.content}
                ref={inputContentRef}
              />
              <div className="edit-btns">
                <Button
                  onClick={onSaveEditedNote}
                  style={{ width: '80px' }}
                  type="primary"
                >
                  Save
                </Button>
                <Button
                  onClick={closeModal}
                  style={{ width: '80px' }}
                  type="danger"
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Main;
