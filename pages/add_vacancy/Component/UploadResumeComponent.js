export class UploadResumeComponent {

    constructor(parent, uploadUrl = "http://localhost/work/controllerUserData.php?action=addVacancy") {
        this.parent = parent;
        this.uploadUrl = uploadUrl;
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

        button.addEventListener("click", async () => {
            // Получаем значения из формы
            const title = document.getElementById("job-title")?.value.trim();
            const description = document.getElementById("job-description")?.value.trim();

            if (!title || !description) {
                alert("Пожалуйста, заполните все поля");
                return;
            }

            // Формируем GET-параметры
            const queryParams = new URLSearchParams({
                title,
                description
            });

            try {
                const response = await fetch(`${this.uploadUrl}&${queryParams.toString()}`, {
                    method: 'GET'
                });
            
                if (!response.ok) {
                    throw new Error("Ошибка при отправке данных");
                }
            
                const result = await response.json(); // 
            
                if (result.success) {
                    alert(result.message || "Вакансия размещена успешно!");
            
                    if (result.redirect) {
                        window.location.href = result.redirect;
                    }
                } else {
                    alert(result.message || "Произошла ошибка при размещении вакансии");
                }
            
            } catch (error) {
                console.error("Ошибка:", error);
                alert("Произошла ошибка при размещении вакансии");
            }
        });
    }

    async render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        await this.addListeners();
    }
}