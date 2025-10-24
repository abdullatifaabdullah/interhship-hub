// My Applications Page
function loadMyApplicationsPage(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">My Applications</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-dark-secondary">
                        Track the status of your internship applications
                    </p>
                </div>
                <div class="mt-4 sm:mt-0">
                    <button onclick="loadBrowseInternshipsPage(document.getElementById('dynamic-content'))" 
                            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700">
                        <i class="fas fa-plus mr-2"></i>
                        Find More Internships
                    </button>
                </div>
            </div>

            <!-- Application Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-file-alt text-primary"></i>
                            </div>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Total</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="total-apps">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-clock text-warning"></i>
                            </div>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Pending</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="pending-apps">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-check-circle text-accent"></i>
                            </div>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Approved</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="approved-apps">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-danger bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-times-circle text-danger"></i>
                            </div>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Rejected</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="rejected-apps">-</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter and Search -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="status-filter" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Filter by Status
                        </label>
                        <select id="status-filter" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label for="search-applications" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Search Applications
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                            <input type="text" id="search-applications" placeholder="Search by company or position..."
                                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>

                    <div class="flex items-end">
                        <button onclick="clearApplicationFilters()" 
                                class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <!-- Applications List -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">Application History</h3>
                </div>
                <div class="p-6">
                    <div id="applications-list">
                        ${Components.createSpinner('medium')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Load applications
    loadApplications();
    
    // Set up filters
    setupApplicationFilters();
}

let allApplications = [];
let filteredApplications = [];

async function loadApplications() {
    try {
        const response = await api.getMyApplications();
        const applications = response.applications || response;

        allApplications = applications;
        filteredApplications = [...applications];
        
        displayApplications();
        updateApplicationStats();
        
    } catch (error) {
        console.error('Error loading applications:', error);
        showToast('Failed to load applications', 'error');
        
        document.getElementById('applications-list').innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-warning text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">Failed to load applications</p>
                <button onclick="loadApplications()" 
                        class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                    Try Again
                </button>
            </div>
        `;
    }
}

function displayApplications() {
    const container = document.getElementById('applications-list');
    
    if (filteredApplications.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-file-alt text-gray-400 text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">No applications found</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Start applying to internships to see them here</p>
                <button onclick="loadBrowseInternshipsPage(document.getElementById('dynamic-content'))" 
                        class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                    Browse Internships
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredApplications.map(app => createApplicationCard(app)).join('');
}

function createApplicationCard(application) {
    const statusColor = Utils.getStatusColor(application.status);
    const statusIcon = Utils.getStatusIcon(application.status);
    
    return `
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-1">
                        ${application.internship_title}
                    </h3>
                    <p class="text-sm text-primary font-medium mb-2">${application.company}</p>
                    <div class="flex items-center text-sm text-gray-500 dark:text-dark-secondary">
                        <i class="fas fa-calendar mr-2"></i>
                        Applied ${Utils.formatDateTime(application.applied_at)}
                    </div>
                </div>
                <div class="ml-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${statusColor}-100 text-${statusColor}-800 dark:bg-${statusColor}-900 dark:text-${statusColor}-200">
                        <i class="${statusIcon} mr-1"></i>
                        ${Utils.capitalizeFirst(application.status)}
                    </span>
                </div>
            </div>
            
            ${application.cover_letter ? `
                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Cover Letter</h4>
                    <div class="bg-white dark:bg-dark-surface rounded-md p-3 border border-gray-200 dark:border-gray-600">
                        <p class="text-sm text-gray-600 dark:text-dark-secondary">${Utils.truncateText(application.cover_letter, 200)}</p>
                    </div>
                </div>
            ` : ''}
            
            ${application.cv_filename ? `
                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Attached CV</h4>
                    <div class="flex items-center text-sm text-gray-600 dark:text-dark-secondary">
                        <i class="fas fa-file-pdf text-danger mr-2"></i>
                        ${application.cv_filename}
                    </div>
                </div>
            ` : ''}
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div class="text-xs text-gray-400 dark:text-gray-500">
                    Application ID: #${application.id}
                </div>
                <div class="flex space-x-2">
                    <button onclick="viewApplicationDetails(${application.id})" 
                            class="text-primary hover:text-primary-hover text-sm font-medium">
                        <i class="fas fa-eye mr-1"></i>
                        View Details
                    </button>
                    ${application.status === 'pending' ? `
                        <button onclick="withdrawApplication(${application.id})" 
                                class="text-danger hover:text-red-700 text-sm font-medium">
                            <i class="fas fa-times mr-1"></i>
                            Withdraw
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function updateApplicationStats() {
    const total = allApplications.length;
    const pending = allApplications.filter(app => app.status === 'pending').length;
    const approved = allApplications.filter(app => app.status === 'approved').length;
    const rejected = allApplications.filter(app => app.status === 'rejected').length;

    document.getElementById('total-apps').textContent = total;
    document.getElementById('pending-apps').textContent = pending;
    document.getElementById('approved-apps').textContent = approved;
    document.getElementById('rejected-apps').textContent = rejected;
}

function setupApplicationFilters() {
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-applications');

    const debouncedSearch = Utils.debounce(applyApplicationFilters, 300);
    
    statusFilter.addEventListener('change', applyApplicationFilters);
    searchInput.addEventListener('input', debouncedSearch);
}

function applyApplicationFilters() {
    const status = document.getElementById('status-filter').value;
    const searchTerm = document.getElementById('search-applications').value.toLowerCase();

    filteredApplications = allApplications.filter(application => {
        const matchesStatus = !status || application.status === status;
        const matchesSearch = !searchTerm || 
            application.internship_title.toLowerCase().includes(searchTerm) ||
            application.company.toLowerCase().includes(searchTerm);

        return matchesStatus && matchesSearch;
    });

    displayApplications();
}

function clearApplicationFilters() {
    document.getElementById('status-filter').value = '';
    document.getElementById('search-applications').value = '';
    
    filteredApplications = [...allApplications];
    displayApplications();
}

function viewApplicationDetails(applicationId) {
    const application = allApplications.find(app => app.id === applicationId);
    if (!application) return;

    const modalContent = `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">${application.internship_title}</h3>
                ${Components.createStatusBadge(application.status)}
            </div>
            
            <div class="text-sm text-primary font-medium">${application.company}</div>
            
            <div class="text-sm text-gray-500 dark:text-dark-secondary">
                Applied: ${Utils.formatDateTime(application.applied_at)}
            </div>
            
            ${application.cover_letter ? `
                <div>
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Cover Letter</h4>
                    <div class="bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-sm text-gray-600 dark:text-dark-secondary">
                        ${application.cover_letter}
                    </div>
                </div>
            ` : ''}
            
            ${application.cv_filename ? `
                <div>
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Attached CV</h4>
                    <div class="flex items-center text-sm text-gray-600 dark:text-dark-secondary">
                        <i class="fas fa-file-pdf text-danger mr-2"></i>
                        ${application.cv_filename}
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    const modal = Components.createModal(
        'application-details-modal',
        'Application Details',
        modalContent,
        [
            {
                text: 'Close',
                type: 'secondary',
                onClick: "Components.closeModal('application-details-modal')"
            }
        ]
    );

    document.body.insertAdjacentHTML('beforeend', modal);
    Components.showModal('application-details-modal');
}

async function withdrawApplication(applicationId) {
    if (!confirm('Are you sure you want to withdraw this application?')) return;

    try {
        // In a real app, this would call the API to withdraw the application
        showToast('Application withdrawal feature coming soon!', 'info');
        
        // For now, just remove from the list
        allApplications = allApplications.filter(app => app.id !== applicationId);
        filteredApplications = [...allApplications];
        displayApplications();
        updateApplicationStats();
        
    } catch (error) {
        console.error('Error withdrawing application:', error);
        showToast('Failed to withdraw application', 'error');
    }
}

// Export for use in main app
window.loadMyApplicationsPage = loadMyApplicationsPage;
