import React, { useContext, useState } from 'react';
import { useInputValue } from '../../custom-hooks/';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Layout from '../../hocs/Layout/Layout';
import Note from '../Note/Note';
import { Input, Icon } from 'antd';
import { DataContext } from '../DataContext';
import './Main.scss';

const Main = () => {
  const { data, isLoading, setIsLoading } = useContext(DataContext);

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
      alert('PLEASE ENTER TEXT');
    } else {
      console.log('Submitted', title.bind.value, content.bind.value);
    }
    title.clear();
    content.clear();
  };

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }
  console.log(data, isLoading);

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

            <div className="note-icons">
              <div className="note-icon">
                <span className="note-icon-back">
                  <Icon type="check-square" />
                </span>
              </div>
              <div className="note-icon">
                <span className="note-icon-back">
                  <Icon type="highlight" />
                </span>
              </div>
              <div className="note-icon">
                <span className="note-icon-back">
                  <Icon type="picture" />
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="notes-block">
          {!data.length ? (
            <div className="no-data">
              <h3>No any notes, please enter some new</h3>
            </div>
          ) : isLoading ? (
            <Loader />
          ) : (
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
