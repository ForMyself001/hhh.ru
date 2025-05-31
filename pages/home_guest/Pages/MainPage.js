console.log("MainPage run");

import { ProductCardComponent } from "../Component/ProductCard.js";
import {ProductPage} from "./ProductPage.js";

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
            `
        )
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)
        this.componentDidMount();
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        this.data.forEach((item)=> {
            if (item.id == cardId) {
                const productPage = new ProductPage(this.parent, item)
                productPage.render()
            }
        })
    }

    async componentDidMount() {
        this.data = await this.getData()
        this.data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    async getData() {
        try {
            const response = await fetch("http://localhost/work/controllerUserData.php?action=get_list"); // Запрашиваем данные
            const data = await response.json(); // Преобразуем ответ в JSON
            return data; // Возвращаем массив вакансий
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            return []; // В случае ошибки возвращаем пустой массив
        }
    }

    /*getData() {
        return [
            {
                id: 1,
                src: 
                "http://localhost/work/src/%d0%bc%d0%b8%d0%b2%d0%bb%d0%b3%d1%83.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 2,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 3,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 4,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 5,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 6,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 7,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 8,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 9,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 10,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 11,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            },
            {
                id: 12,
                src: 
                "https://i.pinimg.com/736x/35/6c/dd/356cddb76e81753b3e6c63b5d6abbb47.jpg",
                organization: "Предприятие ...",
                position: "Инженер-программист 1 категории",
                text: "Описание вакансии"
            }

        ]    
    }*/
}
