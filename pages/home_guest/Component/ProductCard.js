console.log("ProductCard run");

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    getHTML(data) {
        return `
            <style>
            .vacancy-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0,123,255,0.15);
                border-color: #007bff;
            }

            .vacancy-card:hover .btn-primary {
                background-color: #0056b3 !important;
                transform: scale(1.02);
            }

            .vacancy-card {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .btn-primary {
                transition: all 0.2s ease-in-out;
            }
            </style>
            <div class="col-12 col-sm-6 col-md-3 mb-4">
                <div class="vacancy-card card h-100" style="
                    border: 2px solid #e0e0e0;
                    border-radius: 15px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                    margin: 8px;
                ">
                    <img class="card-img-top" 
                         src="${data.src}" 
                         alt="картинка"
                         style="
                             border-top-left-radius: 13px;
                             border-top-right-radius: 13px;
                             height: 200px;
                             object-fit: cover;
                             padding: 12px;
                         ">
                    <div class="card-body d-flex flex-column" style="
                        padding: 1.25rem 1.5rem;
                    ">
                        <h5 class="card-organization" style="
                            color: #2c3e50;
                            font-weight: 700;
                            margin-bottom: 1rem;
                            font-size: 1.1em;
                        ">
                            ${data.organization}
                        </h5>
                        <p class="card-position flex-grow-1" style="
                            color: #5a6a7d;
                            font-size: 0.95rem;
                            line-height: 1.5;
                            margin-bottom: 1.5rem;
                        ">
                            ${data.position}
                        </p>
                        <button class="btn btn-primary mt-auto" 
                                id="click-card-${data.id}" 
                                data-id="${data.id}"
                                style="
                                    font-weight: 600;
                                    background-color: #007bff;
                                    border: none;
                                    padding: 12px 20px;
                                    transition: all 0,2s ease;
                                    margin-top: 8px;
                                ">
                            Откликнуться
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}
   