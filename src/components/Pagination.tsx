import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from "../utils/ThemeContext"

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  currentSubPagePath: string;
  tag?: string;
  onOlderPage: () => void;
  onNewerPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  currentSubPagePath,
  tag = "",
  onOlderPage,
  onNewerPage,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div className="pagination-wrapper">
      <Link
        to={`${currentSubPagePath}${tag}/1`}
        className={`pagination-link ${currentPage === 1 ? 'disabled' : ''}`}
      >
        &lt;&lt;
      </Link>
      <Link
        to={currentPage === 1 ? `${currentSubPagePath}${tag}` : `${currentSubPagePath}${tag}/${currentPage - 1}`}
        onClick={currentPage === 1 ? undefined : onNewerPage}
        className={`pagination-link ${currentPage === 1 ? 'disabled' : ''}`}
      >
        &lt;
      </Link>
      {currentPage > 2 && (
        <Link 
          to={`${currentSubPagePath}${tag}/${currentPage - 2}`}
          className="pagination-link"
        >
          {currentPage - 2}
        </Link>
      )}
      {currentPage > 1 && (
        <Link 
          to={`${currentSubPagePath}${tag}/${currentPage - 1}`}
          className="pagination-link"
        >
          {currentPage - 1}
        </Link>
      )}
      <Link
        to={`${currentSubPagePath}${tag}/${currentPage}`}
        className="pagination-link active"
      >
        {currentPage}
      </Link>
      {currentPage < totalPages && (
        <Link 
          to={`${currentSubPagePath}${tag}/${currentPage + 1}`}
          className="pagination-link"
        >
          {currentPage + 1}
        </Link>
      )}
      {currentPage < totalPages - 1 && (
        <Link 
          to={`${currentSubPagePath}${tag}/${currentPage + 2}`}
          className="pagination-link"
        >
          {currentPage + 2}
        </Link>
      )}
      <Link
        to={`${currentSubPagePath}${tag}/${currentPage + 1}`}
        onClick={currentPage === totalPages ? undefined : onOlderPage}
        className={`pagination-link ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        &gt;
      </Link>
      <Link
        to={`${currentSubPagePath}${tag}/${totalPages}`}
        className={`pagination-link ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        &gt;&gt;
      </Link>
    </div>
  );
};

export default Pagination;