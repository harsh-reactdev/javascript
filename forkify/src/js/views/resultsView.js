import icons from 'url:../../img/icons.svg';

import View from './view';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'We could not find any recipes for your query. Please try something different.!';

    _generateMarkupPreview(rec) {
        return (`
                <li class="preview">
                    <a class="preview__link" href="#${rec.id}">
                    <figure class="preview__fig">
                        <img src="${rec.imageUrl}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${rec.title}</h4>
                        <p class="preview__publisher">${rec.publisher}</p>
                    </div>
                    </a>
                </li>
                `);
    };

    _generateMarkup() {
        const markup = this._data.map(rec => this._generateMarkupPreview(rec)).join('');
        return markup;
    }
}

export default new ResultsView();