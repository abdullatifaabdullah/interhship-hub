// Reusable Components
class Components {
    // Toast Notification System
    static showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toastId = Utils.generateId();
        const colors = {
            success: 'bg-accent text-white',
            error: 'bg-danger text-white',
            warning: 'bg-warning text-white',
            info: 'bg-primary text-white'
        };

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${colors[type]} px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md`;
        toast.innerHTML = `
            <i class="${icons[type]}"></i>
            <span class="flex-1">${message}</span>
            <button onclick="Components.removeToast('${toastId}')" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Show animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto remove
        setTimeout(() => {
            Components.removeToast(toastId);
        }, duration);
    }

    static removeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }

    // Loading Spinner Component
    static createSpinner(size = 'medium') {
        const sizes = {
            small: 'w-4 h-4',
            medium: 'w-6 h-6',
            large: 'w-8 h-8'
        };

        return `
            <div class="flex items-center justify-center">
                <div class="loading-spinner ${sizes[size]}"></div>
            </div>
        `;
    }

    // Status Badge Component
    static createStatusBadge(status, size = 'medium') {
        const color = Utils.getStatusColor(status);
        const icon = Utils.getStatusIcon(status);
        const sizes = {
            small: 'text-xs px-2 py-1',
            medium: 'text-sm px-3 py-1',
            large: 'text-base px-4 py-2'
        };

        return `
            <span class="inline-flex items-center ${sizes[size]} rounded-full bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-200">
                <i class="${icon} mr-1"></i>
                ${Utils.capitalizeFirst(status)}
            </span>
        `;
    }

    // Card Component
    static createCard(content, className = '') {
        return `
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}">
                ${content}
            </div>
        `;
    }

    // Button Component
    static createButton(text, type = 'primary', size = 'medium', icon = '', onClick = '', disabled = false) {
        const colors = {
            primary: 'bg-primary hover:bg-primary-hover text-white',
            secondary: 'bg-secondary hover:bg-gray-600 text-white',
            accent: 'bg-accent hover:bg-green-600 text-white',
            warning: 'bg-warning hover:bg-yellow-600 text-white',
            danger: 'bg-danger hover:bg-red-600 text-white',
            outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
            ghost: 'text-primary hover:bg-primary hover:text-white'
        };

        const sizes = {
            small: 'px-3 py-1 text-sm',
            medium: 'px-4 py-2 text-sm',
            large: 'px-6 py-3 text-base'
        };

        const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
        const iconHtml = icon ? `<i class="${icon} mr-2"></i>` : '';

        return `
            <button 
                class="inline-flex items-center ${colors[type]} ${sizes[size]} rounded-md font-medium transition-colors duration-200 ${disabledClass}"
                ${onClick ? `onclick="${onClick}"` : ''}
                ${disabled ? 'disabled' : ''}
            >
                ${iconHtml}${text}
            </button>
        `;
    }

    // Input Component
    static createInput(label, name, type = 'text', placeholder = '', required = false, value = '', error = '') {
        const errorClass = error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary';
        const errorHtml = error ? `<p class="mt-1 text-sm text-danger">${error}</p>` : '';

        return `
            <div class="space-y-1">
                <label for="${name}" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                    ${label} ${required ? '<span class="text-danger">*</span>' : ''}
                </label>
                <input
                    type="${type}"
                    id="${name}"
                    name="${name}"
                    placeholder="${placeholder}"
                    value="${value}"
                    ${required ? 'required' : ''}
                    class="block w-full px-3 py-2 border ${errorClass} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
                ${errorHtml}
            </div>
        `;
    }

    // Textarea Component
    static createTextarea(label, name, placeholder = '', required = false, value = '', rows = 4, error = '') {
        const errorClass = error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary';
        const errorHtml = error ? `<p class="mt-1 text-sm text-danger">${error}</p>` : '';

        return `
            <div class="space-y-1">
                <label for="${name}" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                    ${label} ${required ? '<span class="text-danger">*</span>' : ''}
                </label>
                <textarea
                    id="${name}"
                    name="${name}"
                    rows="${rows}"
                    placeholder="${placeholder}"
                    ${required ? 'required' : ''}
                    class="block w-full px-3 py-2 border ${errorClass} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                >${value}</textarea>
                ${errorHtml}
            </div>
        `;
    }

    // Select Component
    static createSelect(label, name, options = [], placeholder = 'Select an option', required = false, value = '', error = '') {
        const errorClass = error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary';
        const errorHtml = error ? `<p class="mt-1 text-sm text-danger">${error}</p>` : '';

        const optionsHtml = options.map(option => {
            const selected = option.value === value ? 'selected' : '';
            return `<option value="${option.value}" ${selected}>${option.label}</option>`;
        }).join('');

        return `
            <div class="space-y-1">
                <label for="${name}" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                    ${label} ${required ? '<span class="text-danger">*</span>' : ''}
                </label>
                <select
                    id="${name}"
                    name="${name}"
                    ${required ? 'required' : ''}
                    class="block w-full px-3 py-2 border ${errorClass} rounded-md shadow-sm bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                >
                    <option value="">${placeholder}</option>
                    ${optionsHtml}
                </select>
                ${errorHtml}
            </div>
        `;
    }

    // File Upload Component
    static createFileUpload(label, name, accept = '', required = false, error = '') {
        const errorClass = error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary';
        const errorHtml = error ? `<p class="mt-1 text-sm text-danger">${error}</p>` : '';

        return `
            <div class="space-y-1">
                <label for="${name}" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                    ${label} ${required ? '<span class="text-danger">*</span>' : ''}
                </label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    <div class="space-y-1 text-center">
                        <i class="fas fa-cloud-upload-alt text-gray-400 text-3xl"></i>
                        <div class="flex text-sm text-gray-600 dark:text-dark-secondary">
                            <label for="${name}" class="relative cursor-pointer bg-white dark:bg-dark-surface rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                <span>Upload a file</span>
                                <input id="${name}" name="${name}" type="file" class="sr-only" ${accept ? `accept="${accept}"` : ''} ${required ? 'required' : ''}>
                            </label>
                            <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            ${accept ? `Accepted formats: ${accept}` : 'Any file type'}
                        </p>
                    </div>
                </div>
                ${errorHtml}
            </div>
        `;
    }

    // Modal Component
    static createModal(id, title, content, actions = []) {
        const actionsHtml = actions.map(action => 
            Components.createButton(action.text, action.type, action.size, action.icon, action.onClick)
        ).join('');

        return `
            <div id="${id}" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 hidden">
                <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-dark-surface">
                    <div class="mt-3">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">${title}</h3>
                            <button onclick="Components.closeModal('${id}')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="mb-4">
                            ${content}
                        </div>
                        <div class="flex justify-end space-x-3">
                            ${actionsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static showModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    static closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Table Component
    static createTable(headers, data, actions = []) {
        const headerHtml = headers.map(header => 
            `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">${header}</th>`
        ).join('');

        const rowsHtml = data.map(row => {
            const cellsHtml = row.map(cell => 
                `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">${cell}</td>`
            ).join('');
            
            const actionsHtml = actions.map(action => 
                `<button onclick="${action.onClick}" class="text-${action.color}-600 hover:text-${action.color}-900 mr-3">
                    <i class="${action.icon}"></i> ${action.text}
                </button>`
            ).join('');

            return `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                    ${cellsHtml}
                    ${actions.length > 0 ? `<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${actionsHtml}</td>` : ''}
                </tr>
            `;
        }).join('');

        return `
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            ${headerHtml}
                            ${actions.length > 0 ? '<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Pagination Component
    static createPagination(currentPage, totalPages, onPageChange) {
        const pages = [];
        const maxVisible = 5;
        
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        const pageButtons = pages.map(page => {
            const isActive = page === currentPage;
            const activeClass = isActive ? 'bg-primary text-white' : 'text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-700';
            
            return `
                <button onclick="${onPageChange}(${page})" 
                        class="px-3 py-2 text-sm font-medium ${activeClass} rounded-md">
                    ${page}
                </button>
            `;
        }).join('');

        return `
            <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface px-4 py-3 sm:px-6">
                <div class="flex-1 flex justify-between sm:hidden">
                    <button onclick="${onPageChange}(${Math.max(1, currentPage - 1)})" 
                            ${currentPage === 1 ? 'disabled' : ''}
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <button onclick="${onPageChange}(${Math.min(totalPages, currentPage + 1)})" 
                            ${currentPage === totalPages ? 'disabled' : ''}
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700 dark:text-dark-secondary">
                            Page <span class="font-medium">${currentPage}</span> of <span class="font-medium">${totalPages}</span>
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button onclick="${onPageChange}(${Math.max(1, currentPage - 1)})" 
                                    ${currentPage === 1 ? 'disabled' : ''}
                                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-sm font-medium text-gray-500 dark:text-dark-secondary hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            ${pageButtons}
                            <button onclick="${onPageChange}(${Math.min(totalPages, currentPage + 1)})" 
                                    ${currentPage === totalPages ? 'disabled' : ''}
                                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-sm font-medium text-gray-500 dark:text-dark-secondary hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        `;
    }
}

// Export for use in other files
window.Components = Components;
window.showToast = Components.showToast;
