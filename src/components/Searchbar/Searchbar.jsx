import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';


const Searchbar = ({onSubmit}) => {
    
    const [searchQueryOriginal, setSearchQueryOriginal]= useState('')
   
   const  handleChange = (e) => {
    setSearchQueryOriginal( e.currentTarget.value.toLowerCase().trim() )
    }

   const  handleSubmit = (e) => {
        e.preventDefault();
        
        if (searchQueryOriginal === '') {
            toast.warning('Enter a search query!');
            return
        }
        onSubmit(searchQueryOriginal)
        setSearchQueryOriginal('')
    }
 

    


        return (
            <header className="Searchbar" >
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <button type="submit" className="SearchForm-button">

                    Search
                    </button>
                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                        value={searchQueryOriginal}
                    />
                </form>
            </header>
        )
    }

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func
}
