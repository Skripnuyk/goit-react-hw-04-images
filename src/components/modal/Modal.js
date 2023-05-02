import { useEffect } from 'react';
import { ModalWrap, ModalWindow, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

export default function Modal({toggleModal, largeImage}) {
  useEffect(() => {
    const handleKeyDown = evt => evt.code === 'Escape' && toggleModal();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const handleBackdropClick = evt => {
    evt.target === evt.currentTarget && toggleModal();
  };


  return (
    <ModalWrap onClick={handleBackdropClick}>
      <ModalWindow>
        <ModalImage src={largeImage} alt="" />
      </ModalWindow>
    </ModalWrap>
  );
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };