import React from 'react';


import Searchbar from './Searchbar/Searchbar';
import fetchGallary from 'Services/GallaryApi';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { useState, useEffect, useRef } from 'react';


const App =()=> {

  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState(null);
  const [error, setErrors] = useState(null);
  const [page, setPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const prevQuery = useRef(searchQuery);
  const prevPage = useRef(page);

  useEffect(() => {
    const fetchinfo= async () => {
      setShowLoader(true);
      try {
        const data = await fetchGallary(searchQuery, page);
        const totalPage = Math.ceil(data.totalHits / 12);
        setResults((prev) => [...prev, ...data.hits]);
        setShowLoadMore(data.totalHits > 12 * page);
        !data.totalHits && toast.error("No results found. Please try again!");
        page >= totalPage && toast.warning("We're sorry, but you've reached the end of search results!");
      } catch (error) {
       
        console.error(error.message);
      } finally {
        setShowLoader(false);
      }
    };

    if (prevQuery.current !== searchQuery || prevPage.current !== page) fetchinfo();
  }, [page, searchQuery]);


 const onFormSubmit = searchQueryOriginal => {
    setSearchQuery(searchQueryOriginal);
    setPage(1);
    setResults([]);
 }
 const onLoadMore = () => {
    if (results) setPage((prev => { return prev + 1 }))
  }

 const handleKeydown = e => {
    if (e.code === 'Escape') {
      setShowModal(false);
      setSelectedImage(null);
    }
  };

 const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setSelectedImage(null);
    }
  };

 const onOpenModal = imageId => {
    const selectedImage = results.find(image => image.id === imageId);
    setShowModal(true);
    setSelectedImage(selectedImage);
  };


    return (
      <div className='App'>
        <ToastContainer 
        autoClose={5000} 
        pauseOnHover 
        theme="colored" />
        
        <Searchbar 
        onSubmit={onFormSubmit} />
        {searchQuery === '' && <h2 >Please enter a query to search for images!</h2>}
        
        {results && <ImageGallery 
        arrayResults={results} 
        key={results.id} 
        onOpenModal={onOpenModal} />}
        
        {showLoadMore && <Button 
        handleClick={onLoadMore}><span>Load More</span></Button>}
        
        {showLoader && <Loader />}
        
        {showModal && (
          <Modal
            onBackdropClose={handleBackdropClick}
            onKeydownClose={handleKeydown}
          >
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </div>
    );
    
  }


export default App