console.log("BackButtonComponent run");

export class BackButtonComponent {
    constructor(parent, id = "back-button") {
      this.parent = parent;
      this.id = id;
      this.footer = document.querySelector('.footer');
      this.previousFooterPosition = '';
    }
  
    addListeners(listener) {
      document.getElementById(this.id).addEventListener("click", listener);
    }
  
    getHTML() {
      return `
        <button id="${this.id}" 
                class="btn btn-primary back-button" 
                type="button">
          Назад
        </button>
      `;
    }
  
  
    render(listener) {
      const html = this.getHTML();
      this.parent.insertAdjacentHTML('beforeend', html);
      this.addListeners(listener);
      // Добавляем новый state в историю
    history.pushState(null, "", location.href);

    // Перехватываем нажатие кнопки "Назад" в браузере
    window.addEventListener("popstate", () => {
        document.getElementById(this.id)?.click();
    });
    }
  }