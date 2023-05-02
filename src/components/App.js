import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../services';
import { Container } from './App.styled';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';
import Button from './button';
import Modal from './modal';
import Loader from './loader';

export const App = () => {

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!page) {
      return;
    }

    try {
      setIsLoading(true);
      const response = fetchImages(query, page);
      response.then(data => {
        data.data.hits.length === 0
          ? toast.error('Nothing found')
          : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
            !images.some(image => image.id === id) &&
              setImages(image =>
                [...image, { id, webformatURL, largeImageURL }]);
          });
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [page, query, images, error]);

  const onSubmit = newQuery => {
    if (newQuery.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const nextPage = () => {
    setPage(page => page + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

    return (
      <Container>
        <Searchbar onSubmit={onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2500} />
        {images.length >= 12 && <Button nextPage={nextPage} />}
      </Container>
    );
  }
