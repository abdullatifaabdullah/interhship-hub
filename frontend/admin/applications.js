// Admin Applications Page
function loadAdminApplicationsPage(container, internshipId = null) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">Manage Applications</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-dark-secondary">
                        Review and manage student applications
                    </p>
                </div>
                <div class="mt-4 sm:mt-0">
                    <button onclick="loadAdminDashboard(document.getElementById('dynamic-content'))" 
                            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Back to Dashboard
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
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="total-apps-admin">-</p>
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
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="pending-apps-admin">-</p>
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
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="approved-apps-admin">-</p>
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
                            <p class="text-lg font-semibold text-gray-900 dark:text-dark-text" id="rejected-apps-admin">-</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter and Search -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label for="status-filter-admin" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Filter by Status
                        </label>
                        <select id="status-filter-admin" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">All Statuses</option>
                            <option value="submitted">Submitted</option>
                            <option value="review">Review</option>
                            <option value="interview_required">Interview Required</option>
                            <option value="info_required">Info Required</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label for="internship-filter" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Filter by Internship
                        </label>
                        <select id="internship-filter" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">All Internships</option>
                        </select>
                    </div>

                    <div>
                        <label for="search-applications-admin" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Search Applications
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                            <input type="text" id="search-applications-admin" placeholder="Search by student email..."
                                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>

                    <div class="flex items-end">
                        <button onclick="clearAdminApplicationFilters()" 
                                class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <!-- Applications List -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">All Applications</h3>
                </div>
                <div class="p-6">
                    <div id="admin-applications-list">
                        ${Components.createSpinner('medium')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Load applications
    loadAdminApplications(internshipId);
    
    // Set up filters
    setupAdminApplicationFilters();
}

let allAdminApplications = [];
let filteredAdminApplications = [];

async function loadAdminApplications(internshipId = null) {
    try {
        let applications;
        if (internshipId) {
            // Load applications for specific internship
            applications = await api.getAdminInternshipApplications(internshipId);
        } else {
            // Load all applications
            applications = await api.getAdminApplications();
        }

        allAdminApplications = applications;
        filteredAdminApplications = [...applications];
        
        displayAdminApplications();
        updateAdminApplicationStats();
        populateInternshipFilter();
        
    } catch (error) {
        console.error('Error loading applications:', error);
        showToast('Failed to load applications', 'error');
        
        document.getElementById('admin-applications-list').innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-warning text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">Failed to load applications</p>
                <button onclick="loadAdminApplications()" 
                        class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                    Try Again
                </button>
            </div>
        `;
    }
}

function displayAdminApplications() {
    const container = document.getElementById('admin-applications-list');
    
    if (filteredAdminApplications.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-file-alt text-gray-400 text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">No applications found</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">No applications match your current filters</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredAdminApplications.map(app => createAdminApplicationCard(app)).join('');
}

function createAdminApplicationCard(application) {
    const statusColor = Utils.getStatusColor(application.status);
    const statusIcon = Utils.getStatusIcon(application.status);
    
    return `
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-1">
                        ${application.internship_title}
                    </h3>
                    <p class="text-sm text-primary font-medium mb-2">${application.internship_location || 'N/A'}</p>
                    <div class="flex items-center text-sm text-gray-500 dark:text-dark-secondary">
                        <i class="fas fa-user mr-2"></i>
                        ${application.applicant_name || application.applicant_email}
                    </div>
                    <div class="flex items-center text-sm text-gray-500 dark:text-dark-secondary mt-1">
                        <i class="fas fa-calendar mr-2"></i>
                        Applied ${Utils.formatDateTime(application.created_at)}
                    </div>
                </div>
                <div class="ml-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${statusColor}-100 text-${statusColor}-800 dark:bg-${statusColor}-900 dark:text-${statusColor}-200">
                        <i class="${statusIcon} mr-1"></i>
                        ${Utils.capitalizeFirst(application.status)}
                    </span>
                </div>
            </div>
            
            ${application.status_note ? `
                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Status Note</h4>
                    <div class="bg-white dark:bg-dark-surface rounded-md p-3 border border-gray-200 dark:border-gray-600">
                        <p class="text-sm text-gray-600 dark:text-dark-secondary">${application.status_note}</p>
                    </div>
                </div>
            ` : ''}
            
            ${application.contact_email ? `
                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Contact Email</h4>
                    <div class="flex items-center text-sm text-gray-600 dark:text-dark-secondary">
                        <i class="fas fa-envelope text-primary mr-2"></i>
                        ${application.contact_email}
                    </div>
                </div>
            ` : ''}
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div class="text-xs text-gray-400 dark:text-gray-500">
                    Application ID: #${application.application_id}
                </div>
                <div class="flex space-x-2">
                    <button onclick="viewAdminApplicationDetails(${application.application_id})" 
                            class="text-primary hover:text-primary-hover text-sm font-medium">
                        <i class="fas fa-eye mr-1"></i>
                        View Details
                    </button>
                    ${application.status === 'submitted' ? `
                        <button onclick="approveApplication(${application.application_id})" 
                                class="text-accent hover:text-green-600 text-sm font-medium">
                            <i class="fas fa-check mr-1"></i>
                            Approve
                        </button>
                        <button onclick="rejectApplication(${application.application_id})" 
                                class="text-danger hover:text-red-600 text-sm font-medium">
                            <i class="fas fa-times mr-1"></i>
                            Reject
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function updateAdminApplicationStats() {
    const total = allAdminApplications.length;
    const pending = allAdminApplications.filter(app => app.status === 'submitted').length;
    const approved = allAdminApplications.filter(app => app.status === 'review').length;
    const rejected = allAdminApplications.filter(app => app.status === 'rejected').length;

    document.getElementById('total-apps-admin').textContent = total;
    document.getElementById('pending-apps-admin').textContent = pending;
    document.getElementById('approved-apps-admin').textContent = approved;
    document.getElementById('rejected-apps-admin').textContent = rejected;
}

function populateInternshipFilter() {
    const internshipFilter = document.getElementById('internship-filter');
    const uniqueInternships = Utils.uniqueBy(allAdminApplications, 'internship_title');
    
    internshipFilter.innerHTML = '<option value="">All Internships</option>' +
        uniqueInternships.map(internship => 
            `<option value="${internship.internship_title}">${internship.internship_title}</option>`
        ).join('');
}

function setupAdminApplicationFilters() {
    const statusFilter = document.getElementById('status-filter-admin');
    const internshipFilter = document.getElementById('internship-filter');
    const searchInput = document.getElementById('search-applications-admin');

    const debouncedSearch = Utils.debounce(applyAdminApplicationFilters, 300);
    
    statusFilter.addEventListener('change', applyAdminApplicationFilters);
    internshipFilter.addEventListener('change', applyAdminApplicationFilters);
    searchInput.addEventListener('input', debouncedSearch);
}

function applyAdminApplicationFilters() {
    const status = document.getElementById('status-filter-admin').value;
    const internship = document.getElementById('internship-filter').value;
    const searchTerm = document.getElementById('search-applications-admin').value.toLowerCase();

    filteredAdminApplications = allAdminApplications.filter(application => {
        const matchesStatus = !status || application.status === status;
        const matchesInternship = !internship || application.internship_title === internship;
        const matchesSearch = !searchTerm || 
            application.student_email.toLowerCase().includes(searchTerm) ||
            application.internship_title.toLowerCase().includes(searchTerm);

        return matchesStatus && matchesInternship && matchesSearch;
    });

    displayAdminApplications();
}

function clearAdminApplicationFilters() {
    document.getElementById('status-filter-admin').value = '';
    document.getElementById('internship-filter').value = '';
    document.getElementById('search-applications-admin').value = '';
    
    filteredAdminApplications = [...allAdminApplications];
    displayAdminApplications();
}

function viewAdminApplicationDetails(applicationId) {
    const application = allAdminApplications.find(app => app.id === applicationId);
    if (!application) return;

    const modalContent = `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">${application.internship_title}</h3>
                ${Components.createStatusBadge(application.status)}
            </div>
            
            <div class="text-sm text-primary font-medium">${application.company}</div>
            <div class="text-sm text-gray-500 dark:text-dark-secondary">Student: ${application.student_email}</div>
            <div class="text-sm text-gray-500 dark:text-dark-secondary">Applied: ${Utils.formatDateTime(application.applied_at)}</div>
            
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
        'admin-application-details-modal',
        'Application Details',
        modalContent,
        [
            {
                text: 'Close',
                type: 'secondary',
                onClick: "Components.closeModal('admin-application-details-modal')"
            }
        ]
    );

    document.body.insertAdjacentHTML('beforeend', modal);
    Components.showModal('admin-application-details-modal');
}

async function approveApplication(applicationId) {
    if (!confirm('Are you sure you want to approve this application?')) return;

    try {
        await api.updateAdminApplicationStatus(applicationId, 'review', 'Application approved');
        
        showToast('Application approved successfully', 'success');
        
        // Update the status locally
        const application = allAdminApplications.find(app => app.application_id === applicationId);
        if (application) {
            application.status = 'review';
            application.status_updated_at = new Date().toISOString();
            application.status_note = 'Application approved';
            filteredAdminApplications = [...allAdminApplications];
            displayAdminApplications();
            updateAdminApplicationStats();
        }
        
    } catch (error) {
        console.error('Error approving application:', error);
        showToast('Failed to approve application', 'error');
    }
}

async function rejectApplication(applicationId) {
    if (!confirm('Are you sure you want to reject this application?')) return;

    try {
        await api.updateAdminApplicationStatus(applicationId, 'rejected', 'Application rejected');
        
        showToast('Application rejected successfully', 'success');
        
        // Update the status locally
        const application = allAdminApplications.find(app => app.application_id === applicationId);
        if (application) {
            application.status = 'rejected';
            application.status_updated_at = new Date().toISOString();
            application.status_note = 'Application rejected';
            filteredAdminApplications = [...allAdminApplications];
            displayAdminApplications();
            updateAdminApplicationStats();
        }
        
    } catch (error) {
        console.error('Error rejecting application:', error);
        showToast('Failed to reject application', 'error');
    }
}

// Export for use in main app
window.loadAdminApplicationsPage = loadAdminApplicationsPage;
