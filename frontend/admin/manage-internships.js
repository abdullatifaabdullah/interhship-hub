// Manage Internships Page
function loadManageInternshipsPage(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">Manage Internships</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-dark-secondary">
                        Create, edit, and manage internship postings
                    </p>
                </div>
                <div class="mt-4 sm:mt-0 flex space-x-3">
                    <button onclick="createNewInternship()" 
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                        <i class="fas fa-plus mr-2"></i>
                        Create Internship
                    </button>
                    <button onclick="loadAdminDashboard(document.getElementById('dynamic-content'))" 
                            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="md:col-span-2">
                        <label for="search-internships" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Search Internships
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                            <input type="text" id="search-internships" placeholder="Search by title, location..."
                                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="status-filter" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Status
                        </label>
                        <select id="status-filter" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">All Statuses</option>
                            <option value="approved">Approved</option>
                            <option value="pending_approval">Pending Approval</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div class="flex items-end">
                        <button onclick="clearInternshipFilters()" 
                                class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <!-- Internships Table -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">All Internships</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Title</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Location</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Applications</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Created</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="internships-table-body" class="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td colspan="6" class="px-6 py-12 text-center">
                                    ${Components.createSpinner('large')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Load internships
    loadInternshipsForManagement();
    
    // Set up filters
    setupInternshipManagementFilters();
}

let allInternshipsForManagement = [];
let filteredInternshipsForManagement = [];

async function loadInternshipsForManagement() {
    try {
        const internships = await api.getAdminInternships();

        allInternshipsForManagement = internships;
        filteredInternshipsForManagement = [...internships];
        
        displayInternshipsTable();
        
    } catch (error) {
        console.error('Error loading internships:', error);
        showToast('Failed to load internships', 'error');
        
        document.getElementById('internships-table-body').innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center">
                    <div class="text-center">
                        <i class="fas fa-exclamation-triangle text-warning text-4xl mb-4"></i>
                        <p class="text-gray-500 dark:text-dark-secondary">Failed to load internships</p>
                        <button onclick="loadInternshipsForManagement()" 
                                class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                            Try Again
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }
}

function displayInternshipsTable() {
    const tbody = document.getElementById('internships-table-body');
    
    if (filteredInternshipsForManagement.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center">
                    <div class="text-center">
                        <i class="fas fa-briefcase text-gray-400 text-4xl mb-4"></i>
                        <p class="text-gray-500 dark:text-dark-secondary">No internships found</p>
                        <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Create your first internship posting</p>
                        <button onclick="createNewInternship()" 
                                class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                            Create Internship
                        </button>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredInternshipsForManagement.map(internship => {
        const statusConfig = getInternshipStatusConfig(internship.status);
        return `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-dark-text">${internship.title}</div>
                    <div class="text-sm text-gray-500 dark:text-dark-secondary">${internship.tags ? internship.tags.slice(0, 3).join(', ') : ''}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-secondary">
                    ${internship.location}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgClass} ${statusConfig.textClass}">
                        <i class="${statusConfig.icon} mr-1"></i>
                        ${statusConfig.label}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary">
                        ${internship.application_count} applications
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-secondary">
                    ${Utils.formatDate(internship.created_at)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="viewInternshipApplications(${internship.id})" 
                                class="text-accent hover:text-green-600" title="View Applications">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="deleteInternship(${internship.id})" 
                                class="text-danger hover:text-red-600" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function getInternshipStatusConfig(status) {
    const statusMap = {
        'approved': {
            label: 'Approved',
            icon: 'fas fa-check-circle',
            bgClass: 'bg-accent bg-opacity-10',
            textClass: 'text-accent'
        },
        'pending_approval': {
            label: 'Pending Approval',
            icon: 'fas fa-clock',
            bgClass: 'bg-warning bg-opacity-10',
            textClass: 'text-warning'
        },
        'rejected': {
            label: 'Rejected',
            icon: 'fas fa-times-circle',
            bgClass: 'bg-danger bg-opacity-10',
            textClass: 'text-danger'
        }
    };
    
    return statusMap[status] || statusMap['pending_approval'];
}

function setupInternshipManagementFilters() {
    const searchInput = document.getElementById('search-internships');
    const statusFilter = document.getElementById('status-filter');

    const debouncedSearch = Utils.debounce(applyInternshipManagementFilters, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
    statusFilter.addEventListener('change', applyInternshipManagementFilters);
}

function applyInternshipManagementFilters() {
    const searchTerm = document.getElementById('search-internships').value.toLowerCase();
    const status = document.getElementById('status-filter').value;

    filteredInternshipsForManagement = allInternshipsForManagement.filter(internship => {
        const matchesSearch = !searchTerm || 
            internship.title.toLowerCase().includes(searchTerm) ||
            internship.location.toLowerCase().includes(searchTerm);

        const matchesStatus = !status || internship.status === status;

        return matchesSearch && matchesStatus;
    });

    displayInternshipsTable();
}

function clearInternshipFilters() {
    document.getElementById('search-internships').value = '';
    document.getElementById('status-filter').value = '';
    
    filteredInternshipsForManagement = [...allInternshipsForManagement];
    displayInternshipsTable();
}

function createNewInternship() {
    const modalContent = `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="internship-title" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                        Internship Title *
                    </label>
                    <input type="text" id="internship-title" required
                           class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                           placeholder="e.g., Software Development Intern">
                </div>
                
                <div>
                    <label for="internship-location" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                        Location *
                    </label>
                    <input type="text" id="internship-location" required
                           class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                           placeholder="e.g., San Francisco, CA or Remote">
                </div>
            </div>
            
            <div>
                <label for="internship-description" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Description *
                </label>
                <textarea id="internship-description" rows="6" required
                          class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          placeholder="Describe the internship role, responsibilities, requirements, and what the intern will learn..."></textarea>
            </div>
            
            <div>
                <label for="internship-tags" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Skills/Tags (comma-separated)
                </label>
                <input type="text" id="internship-tags"
                       class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                       placeholder="e.g., Python, JavaScript, React, Problem Solving">
                <p class="mt-1 text-sm text-gray-500 dark:text-dark-secondary">
                    Separate multiple skills with commas
                </p>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-info-circle text-blue-400"></i>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                            Approval Required
                        </h3>
                        <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
                            <p>Your internship posting will be submitted for owner approval before it becomes visible to students.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modal = Components.createModal(
        'create-internship-modal',
        'Create New Internship',
        modalContent,
        [
            {
                text: 'Cancel',
                type: 'secondary',
                onClick: "Components.closeModal('create-internship-modal')"
            },
            {
                text: 'Create Internship',
                type: 'primary',
                onClick: "submitInternshipCreation()"
            }
        ]
    );

    document.body.insertAdjacentHTML('beforeend', modal);
    Components.showModal('create-internship-modal');
}

async function submitInternshipCreation() {
    const title = document.getElementById('internship-title').value.trim();
    const description = document.getElementById('internship-description').value.trim();
    const location = document.getElementById('internship-location').value.trim();
    const tagsInput = document.getElementById('internship-tags').value.trim();
    
    // Validation
    if (!title || !description || !location) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Process tags
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    try {
        const internshipData = {
            title,
            description,
            location,
            tags
        };
        
        await api.createInternship(internshipData);
        
        Components.closeModal('create-internship-modal');
        showToast('Internship created successfully! It will be reviewed by the owner.', 'success');
        
        // Refresh the internships list
        loadInternshipsForManagement();
        
    } catch (error) {
        console.error('Error creating internship:', error);
        showToast('Failed to create internship', 'error');
    }
}

function editInternship(internshipId) {
    showToast('Internship editing feature coming soon!', 'info');
}

function viewInternshipApplications(internshipId) {
    // Load applications for this specific internship
    loadAdminApplicationsPage(document.getElementById('dynamic-content'), internshipId);
}

async function deleteInternship(internshipId) {
    if (!confirm('Are you sure you want to delete this internship? This action cannot be undone.')) return;

    try {
        await api.deleteInternship(internshipId);
        
        showToast('Internship deleted successfully', 'success');
        
        // Remove from the list
        allInternshipsForManagement = allInternshipsForManagement.filter(internship => internship.id !== internshipId);
        filteredInternshipsForManagement = [...allInternshipsForManagement];
        displayInternshipsTable();
        
    } catch (error) {
        console.error('Error deleting internship:', error);
        showToast('Failed to delete internship', 'error');
    }
}

// Export for use in main app
window.loadManageInternshipsPage = loadManageInternshipsPage;
