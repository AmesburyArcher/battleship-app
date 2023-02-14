export default class View {
  _data;

  render(data = null) {
    this.clear();
    if (data) this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
          </div> 
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <p>${message}</p>
    </div> 
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
