import React from 'react';
import '../styles/SearchPagination.css'

const SearchPagination = ({postPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];
  
  for (let i=1; i<=Math.ceil(totalPosts / postPerPage); i ++) {
    pageNumbers.push(i);
  }
    return (
      <div className='searchPagination'>
        <ul className="pagination">
          {pageNumbers.map(num => 
            <li className='pagination_li' key={num}>
              <a className='btn pageBtn' onClick={() => paginate(num)}>{num}</a>
            </li>)}
        </ul>
      </div>
    );
  };
  
  export default SearchPagination;