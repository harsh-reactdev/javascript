import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _data;

    _generateBtnMarkup(gotoVal, className, iconVal) {
        return `
                <button data-goto="${gotoVal}" class="btn--inline pagination__btn--${className}">
                    <span>Page ${gotoVal}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-${iconVal}"></use>
                    </svg>
                </button> 
            `;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');

            if (!btn) return;

            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        });
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const curPage = this._data.page;

        //in page 1 and other pages exist
        if (curPage === 1 && numPages > 1) {
            // return `
            //     <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            //         <span>Page ${curPage + 1}</span>
            //         <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-right"></use>
            //         </svg>
            //     </button>
            // `;
            return this._generateBtnMarkup(curPage + 1, 'next', 'right');
        }

        // in last page
        if (curPage === numPages && numPages > 1) {
            // return `
            //     <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            //         <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-left"></use>
            //         </svg>
            //         <span>Page ${curPage - 1}</span>
            //     </button>
            // `;
            return this._generateBtnMarkup(curPage - 1, 'prev', 'left');
        }

        // in page other than 1st or last
        if (curPage < numPages) {
            // return `
            //     <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            //         <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-left"></use>
            //         </svg>
            //         <span>Page ${curPage - 1}</span>
            //     </button>
            //     <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            //         <span>Page ${curPage + 1}</span>
            //         <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-right"></use>
            //         </svg>
            //     </button>
            // `;
            const prev = this._generateBtnMarkup(curPage - 1, 'prev', 'left');
            const next = this._generateBtnMarkup(curPage + 1, 'next', 'right');
            return `${prev}${next}`;
        }

        // only one page
        return '';
    }
}

export default new PaginationView();