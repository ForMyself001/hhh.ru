export class UploadResumeComponent {

    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="resume-upload-container">
                <button 
                    id="upload-button" 
                    class="btn btn-primary"
                    type="button"
                >
                    Разместить вакансию
                </button>
            </div>
        `;
    }

    async addListeners() {
        const button = document.getElementById("upload-button");
        if (!button) return;

        button.addEventListener("click", () => {
            // Просто переходим на другую страницу
            window.location.href = 'index.php?page=add_vacancy';
        });
        }

        async render() {
            const html = this.getHTML();
            this.parent.insertAdjacentHTML('beforeend', html);
            await this.addListeners();
        }
}