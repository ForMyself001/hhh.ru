import {MainPage} from "../Pages/MainPage.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

        
    getHTML(itemData) {
        return `
            <style>
                .vacancy-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0,123,255,0.15);
                border-color: #007bff;
                }
            </style>
            
            <div class="vacancy-card card mb-4" style="
                border: 2px solid #e0e0e0;
                border-radius: 15px;
                box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                transition: all 0.3s ease;
                margin: 8px 15px; // Изменили здесь
                max-width: calc(100% - 30px); // Добавили это
                box-sizing: border-box; // Добавили для правильного расчета ширины
            ">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${itemData.src}" 
                             class="img-fluid" 
                             alt="картинка"
                             style="
                                 border-top-left-radius: 13px;
                                 border-bottom-left-radius: 13px;
                                 height: 200px;
                                 width: 100%;
                                 object-fit: cover;
                                 padding: 12px;
                             ">
                             
                    </div>
                    <div class="col-md-8">
                        <div class="card-body d-flex flex-column" style="
                            padding: 1.5rem 2rem;
                            height: 100%;
                        ">
                        <div>
                        
                        
                        </div>
                            <h5 class="card-organization" style="
                                color: #2c3e50;
                                font-weight: 700;
                                margin-bottom: 1.5rem;
                                font-size: 1.4rem;
                            ">
                                ${itemData.organization}
                            </h5>
                            
                            <p class="card-position" style="
                                color: #5a6a7d;
                                font-size: 1.1rem;
                                line-height: 1.6;
                                margin-bottom: 1rem;
                            ">
                                ${itemData.position}
                            </p>
                            
                            <p class="card-text flex-grow-1" style="
                                color: #6c757d;
                                font-size: 1rem;
                                line-height: 1.5;
                                margin-bottom: 2rem;
                            ">
                                ${itemData.text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(itemData) {
        const html = this.getHTML(itemData);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}