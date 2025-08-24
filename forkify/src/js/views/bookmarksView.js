import icons from 'url:../../img/icons.svg';

import View from './view';
import previewView from './previewView';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet.! Find a nice one and bookmark it.!';

    _generateMarkup() {
        const markup = this._data.map(bookmark => previewView.render(bookmark, false)).join('');
        return markup;
    }
}

export default new BookmarksView();