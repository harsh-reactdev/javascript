import icons from 'url:../../img/icons.svg';

import View from './view';
import previewView from './previewView';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'We could not find any recipes for your query. Please try something different.!';

    _generateMarkup() {
        const markup = this._data.map(result => previewView.render(result, false)).join('');
        return markup;
    }
}

export default new ResultsView();