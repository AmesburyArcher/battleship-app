export default class View {
  _data;

  render(data = null) {
    this.clear();
    if (data) this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }
}
