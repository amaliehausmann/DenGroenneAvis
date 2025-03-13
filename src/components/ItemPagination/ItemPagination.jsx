import style from './ItemPagination.module.scss'
export const ItemPagination = ({ currentPage, setCurrentPage, totalPages }) => {

    //Function til at skifte side
    function nextPage() {
      if (currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
      }
    }
  
    //Function til at gå tilbage
    function prevPage() {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
  
    return (
      <div className={style.itemPagination}>
        <span onClick={prevPage} style={{ cursor: currentPage > 1 ? "pointer" : "not-allowed", opacity: currentPage > 1 ? 1 : 0.5 }}>
          <p style={{textDecoration: 'underline'}}>Forrige Side</p>
        </span>
        <span ><p>Side {currentPage} / {totalPages}</p></span>
        <span onClick={nextPage} style={{ cursor: currentPage < totalPages ? "pointer" : "not-allowed", opacity: currentPage < totalPages ? 1 : 0.5 }}>
          <p style={{textDecoration: 'underline'}}>Næste Side</p>
        </span>
      </div>
    );
  };
  