import React, { useEffect, useState } from 'react';
import { useInputValue } from '../../custom-hooks/';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Layout from '../../hocs/Layout/Layout';
import Note from '../Note/Note';
import { Input } from 'antd';
import noteMapper from '../../mappers/note';
import firebase from '../../config/firebase';
import './Main.scss';

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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

  const [openCreate, setOpenCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = useInputValue('');
  const content = useInputValue('');

  const openCreateBlock = () => {
    setOpenCreate(true);
  };

  const closeCreateBlock = () => {
    setOpenCreate(false);
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    <Layout>
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
            data.map((note, i) => {
              return (
                <Note
                  key={i}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  openModal={() => openModal(note.id)}
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
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
        MODAL FOR UPDATE NOTE
      </Modal>
    </Layout>
  );
};

export default Main;
