// CV Upload Component
class CVUploadComponent {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            maxSize: 5 * 1024 * 1024, // 5MB
            allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            allowedExtensions: ['.pdf', '.doc', '.docx'],
            required: false,
            ...options
        };
        this.selectedFile = null;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="cv-upload-container">
                <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    CV/Resume Upload ${this.options.required ? '<span class="text-danger">*</span>' : ''}
                </label>
                
                <div class="cv-upload-area" id="cv-upload-area-${this.containerId}">
                    <div class="cv-upload-content">
                        <div class="cv-upload-icon">
                            <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="cv-upload-text">
                            <p class="cv-upload-primary">Upload your CV/Resume</p>
                            <p class="cv-upload-secondary">or drag and drop</p>
                        </div>
                        <div class="cv-upload-info">
                            <p class="cv-upload-formats">Accepted formats: PDF, DOC, DOCX</p>
                            <p class="cv-upload-size">Max size: ${this.formatFileSize(this.options.maxSize)}</p>
                        </div>
                        <input type="file" 
                               id="cv-file-input-${this.containerId}" 
                               class="cv-file-input" 
                               accept="${this.options.allowedExtensions.join(',')}"
                               ${this.options.required ? 'required' : ''}>
                    </div>
                </div>

                <div class="cv-upload-preview" id="cv-upload-preview-${this.containerId}" style="display: none;">
                    <div class="cv-preview-content">
                        <div class="cv-preview-icon">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <div class="cv-preview-info">
                            <p class="cv-preview-name" id="cv-preview-name-${this.containerId}"></p>
                            <p class="cv-preview-size" id="cv-preview-size-${this.containerId}"></p>
                        </div>
                        <div class="cv-preview-actions">
                            <button type="button" class="cv-preview-remove" onclick="cvUpload${this.containerId}.removeFile()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="cv-upload-error" id="cv-upload-error-${this.containerId}" style="display: none;">
                    <div class="cv-error-content">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span class="cv-error-message" id="cv-error-message-${this.containerId}"></span>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const uploadArea = document.getElementById(`cv-upload-area-${this.containerId}`);
        const fileInput = document.getElementById(`cv-file-input-${this.containerId}`);

        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('cv-upload-dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('cv-upload-dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('cv-upload-dragover');
            const file = e.dataTransfer.files[0];
            if (file) {
                this.handleFileSelect(file);
            }
        });
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file
        const validation = this.validateFile(file);
        if (!validation.valid) {
            this.showError(validation.message);
            return;
        }

        this.selectedFile = file;
        this.showPreview(file);
        this.hideError();
    }

    validateFile(file) {
        // Check file size
        if (file.size > this.options.maxSize) {
            return {
                valid: false,
                message: `File size must be less than ${this.formatFileSize(this.options.maxSize)}`
            };
        }

        // Check file type
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!this.options.allowedExtensions.includes(fileExtension)) {
            return {
                valid: false,
                message: `File type not supported. Allowed types: ${this.options.allowedExtensions.join(', ')}`
            };
        }

        return { valid: true };
    }

    showPreview(file) {
        const uploadArea = document.getElementById(`cv-upload-area-${this.containerId}`);
        const preview = document.getElementById(`cv-upload-preview-${this.containerId}`);
        const fileName = document.getElementById(`cv-preview-name-${this.containerId}`);
        const fileSize = document.getElementById(`cv-preview-size-${this.containerId}`);

        uploadArea.style.display = 'none';
        preview.style.display = 'block';

        fileName.textContent = file.name;
        fileSize.textContent = this.formatFileSize(file.size);

        // Update icon based on file type
        const icon = preview.querySelector('.cv-preview-icon i');
        if (file.type === 'application/pdf') {
            icon.className = 'fas fa-file-pdf';
        } else if (file.type.includes('word')) {
            icon.className = 'fas fa-file-word';
        } else {
            icon.className = 'fas fa-file';
        }
    }

    removeFile() {
        this.selectedFile = null;
        const uploadArea = document.getElementById(`cv-upload-area-${this.containerId}`);
        const preview = document.getElementById(`cv-upload-preview-${this.containerId}`);
        const fileInput = document.getElementById(`cv-file-input-${this.containerId}`);

        uploadArea.style.display = 'block';
        preview.style.display = 'none';
        fileInput.value = '';
        this.hideError();
    }

    showError(message) {
        const errorDiv = document.getElementById(`cv-upload-error-${this.containerId}`);
        const errorMessage = document.getElementById(`cv-error-message-${this.containerId}`);

        errorMessage.textContent = message;
        errorDiv.style.display = 'block';
    }

    hideError() {
        const errorDiv = document.getElementById(`cv-upload-error-${this.containerId}`);
        errorDiv.style.display = 'none';
    }

    getFile() {
        return this.selectedFile;
    }

    isValid() {
        if (this.options.required && !this.selectedFile) {
            this.showError('CV/Resume is required');
            return false;
        }
        return true;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Global function to create CV upload component
function createCVUpload(containerId, options = {}) {
    const component = new CVUploadComponent(containerId, options);
    window[`cvUpload${containerId}`] = component;
    return component;
}

// Export for use in other files
window.CVUploadComponent = CVUploadComponent;
window.createCVUpload = createCVUpload;
