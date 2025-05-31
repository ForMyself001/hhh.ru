console.log("ProductPage run");

import {ProductComponent} from "../Component/ProductComponent.js";
import {BackButtonComponent} from "../Component/BackButtonComponent.js";
import {MainPage} from "../Pages/MainPage.js";
import {UploadResumeComponent} from "../Component/UploadResumeComponent.js"



export class ProductPage {
    constructor(parent, item) {
        this.parent = parent
        this.item = item
    }
    getItemData() {
        return {
            id: this.item.id,
            src: this.item.src,
            organization: `Организация ${this.item.organization}`,
            position: `Должность ${this.item.position}`,
            text: `Описание вакансии: ${this.item.text}`
        }
    }
    get pageRoot() {
        return document.getElementById('product-page')
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    getHTML() {
        return `
            <div id="product-page">
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
        `;
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

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        

        const itemData = this.getItemData()
        const product = new ProductComponent(this.pageRoot)
        product.render(itemData)

        // Контейнеры для кнопок
        const backButtonContainer = document.getElementById("back-button-container");
        const uploadButtonContainer = document.getElementById("upload-button-container");

        // Добавляем кнопку "Назад"
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        //Добавляем компонент загрузки резюме
        const uploadComponent = new UploadResumeComponent(uploadButtonContainer);
        uploadComponent.render();

        window.addEventListener("resize", () => this.adjustButtonContainerPosition());
        window.addEventListener("scroll", () => this.adjustButtonContainerPosition());
        this.adjustButtonContainerPosition(); // Вызываем сразу после рендера

        // const alert = new AlertSuccess(this.pageRoot)
        // alert.show()
    }
   }