export class UploadResumeComponent {
    constructor(parent, uploadUrl = "http://localhost/work/upload.php?action=upload") {
        this.parent = parent;
        this.uploadUrl = uploadUrl;
    }

    getHTML() {
        return `
            <div class="resume-upload-container">
                <input 
                    type="file" 
                    id="resume-input" 
                    accept=".pdf,.doc,.docx" 
                    style="display: none;"
                />
                <button 
                    id="upload-button" 
                    class="btn btn-primary"
                    type="button"
                >
                    Отправить резюме
                </button>
            </div>
        `;
    }

    addListeners() {
        // Открываем диалог выбора файла при клике на кнопку
        document.getElementById('upload-button').addEventListener('click', () => {
            document.getElementById('resume-input').click();
        });

        // Обрабатываем выбор файла
        document.getElementById('resume-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append('resume', file);
                // В обработчике change
                document.getElementById('upload-button').disabled = true;
                document.getElementById('upload-button').textContent = 'Отправка...';
                const response = await fetch(this.uploadUrl, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                
                if (result.success) {
                    alert('Резюме успешно отправлено!');
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                alert(`Ошибка: ${error.message}`);
            }
            // После успешной отправки/ошибки
            document.getElementById('upload-button').disabled = false;
            document.getElementById('upload-button').textContent = 'Отправить резюме';
        });
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners();
    }
}