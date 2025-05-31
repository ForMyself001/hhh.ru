console.log("MainPage run");

import { WorkerCardComponent } from "../Component/WorkerCard.js";
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
                <div class="container">
                    <div class="row"> <!-- Обязательный класс row -->
                        <!-- Сюда будут вставляться карточки -->
                    </div>
                </div>
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
                    <div id="upload-button-container"></div>
                </div>
            `
        )
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)

        this.componentDidMount();

        //const backButtonContainer = document.getElementById("back-button-container");
        const uploadButtonContainer = document.getElementById("upload-button-container");
        // Добавляем кнопку "Назад"
        
        //const backButton = new BackButtonComponent(backButtonContainer);
        const uploadComponent = new UploadResumeComponent(uploadButtonContainer);
        
        //backButton.render(this.clickBack.bind(this));
        uploadComponent.render();
        
        window.addEventListener("resize", () => this.adjustButtonContainerPosition());
        window.addEventListener("scroll", () => this.adjustButtonContainerPosition());
        this.adjustButtonContainerPosition(); // Вызываем сразу после рендера
        
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

    async componentDidMount() {
        this.data = await this.getData(); // Загружаем данные
        this.data.forEach((item) => {
            const workerCard = new WorkerCardComponent(this.pageRoot)
            workerCard.render(item, this.clickCard.bind(this))
        }) // Вызываем рендер после загрузки
    }

    clickCard(e) {
        // Получаем ID из data-атрибута элемента, на котором произошел клик
        const fileId = e.target.dataset.id;
        
        // Находим соответствующий элемент в данных
        const selectedItem = this.data.find(item => item.id == fileId);
        
        if (selectedItem) {
            console.log(selectedItem.src);
            // Создаем временную ссылку для скачивания
            const link = document.createElement('a');
            link.href = selectedItem.src;
            link.download = selectedItem.src.split('/').pop(); // Имя файла из URL
            link.style.display = 'none';
            
            // Добавляем ссылку в DOM и эмулируем клик
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Файл не найден');
        }
    }

    async getData() {
        try {
            const response = await fetch('http://localhost/work/upload.php?action=download');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке файлов');
            }
            const files = await response.json();
            const baseUrl = 'http://localhost/work/uploads';
            
            return files.map((file) => {
                const match = file.match(/(.+)_resume_/u); // Захватываем всю часть перед _resume_
                let name = match ? match[1] : file; // Если найдено — используем, иначе весь файл
                name = name.replace(/_/g, " "); // Заменяем _ на пробелы
                console.log(name);
            
                return {
                    id: Date.now() + Math.random(),
                    name: name, // Устанавливаем извлечённое имя
                    src: `${baseUrl}/${encodeURIComponent(file)}`
                };
            });
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        }
    }
}
