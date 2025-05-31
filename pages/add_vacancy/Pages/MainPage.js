console.log("MainPage run");

import {BackButtonComponent} from "../Component/BackButtonComponent.js";
import {UploadResumeComponent} from "../Component/UploadResumeComponent.js";

export class MainPage {

    
    constructor(parent) {
        this.parent = parent;
        
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
    getHTML() {
        return (
            `
            <div id="main-page" class="d-flex flex-wrap"></div>
            <div class="container mt-4">
                <h2>Добавить вакансию</h2>
                <form id="vacancy-form">
                    <div class="mb-3">
                        <label for="job-title" class="form-label">Должность</label>
                        <input type="text" class="form-control" id="job-title" placeholder="Введите должность" required>
                    </div>
                    <div class="mb-3">
                        <label for="job-description" class="form-label">Описание вакансии</label>
                        <textarea class="form-control" id="job-description" rows="5" placeholder="Введите описание" required></textarea>
                    </div>
                </form>
                <div id="button-container" 
                     style="
                        position: fixed;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 15px; /* Добавляет расстояние между кнопками */
                        z-index: 1000;
                     ">
                    <div id="back-button-container"></div>
                    <div id="upload-button-container"></div>
                </div>
            </div>
            `
        );
    }

    adjustButtonContainerPosition() {
        const buttonContainer = document.getElementById("button-container");
        this.footer = document.querySelector(".footer"); 

        if (!buttonContainer || !this.footer) return;
    
        const footerRect = this.footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
    
        if (footerRect.top < windowHeight) {
            buttonContainer.style.bottom = `${windowHeight - footerRect.top + 10}px`;
        } else {
            buttonContainer.style.bottom = "20px";
        }
    }


    clickBack() {
        window.history.back();
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)

        const backButtonContainer = document.getElementById("back-button-container");
        const uploadButtonContainer = document.getElementById("upload-button-container");
        // Добавляем кнопку "Назад"

        const backButton = new BackButtonComponent(backButtonContainer);
        const uploadComponent = new UploadResumeComponent(uploadButtonContainer);

        backButton.render(this.clickBack.bind(this));
        uploadComponent.render();

        window.addEventListener("resize", () => this.adjustButtonContainerPosition());
        window.addEventListener("scroll", () => this.adjustButtonContainerPosition());
        this.adjustButtonContainerPosition(); // Вызываем сразу после рендера
    }
}
