// Browse Internships Page
function loadBrowseInternshipsPage(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">Browse Internships</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-dark-secondary">
                        Discover amazing internship opportunities
                    </p>
                </div>
                <div class="mt-4 sm:mt-0">
                    <!-- No additional buttons needed - navigation handled by top menu -->
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Search Input -->
                    <div class="md:col-span-2">
                        <label for="search-input" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Search Internships
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                            <input type="text" id="search-input" placeholder="Search by title, company, or keywords..."
                                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>

                    <!-- Location Filter -->
                    <div>
                        <label for="location-filter" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Location
                        </label>
                        <select id="location-filter" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">All Locations</option>
                            <option value="remote">Remote</option>
                            <option value="san-francisco">San Francisco, CA</option>
                            <option value="new-york">New York, NY</option>
                            <option value="austin">Austin, TX</option>
                            <option value="seattle">Seattle, WA</option>
                            <option value="boston">Boston, MA</option>
                        </select>
                    </div>
                </div>

                <!-- Additional Filters -->
                <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label for="duration-filter" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Duration
                        </label>
                        <select id="duration-filter" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">Any Duration</option>
                            <option value="1">1 month</option>
                            <option value="2">2 months</option>
                            <option value="3">3 months</option>
                            <option value="6">6 months</option>
                            <option value="12">1 year</option>
                        </select>
                    </div>

                    <div>
                        <label for="salary-filter" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Salary Range
                        </label>
                        <select id="salary-filter" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">Any Salary</option>
                            <option value="0-15">$0 - $15/hour</option>
                            <option value="15-25">$15 - $25/hour</option>
                            <option value="25-35">$25 - $35/hour</option>
                            <option value="35+">$35+/hour</option>
                        </select>
                    </div>

                    <div>
                        <label for="sort-by" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Sort By
                        </label>
                        <select id="sort-by" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="salary-high">Highest Salary</option>
                            <option value="salary-low">Lowest Salary</option>
                            <option value="company">Company Name</option>
                        </select>
                    </div>

                    <div class="flex items-end">
                        <button onclick="clearFilters()" 
                                class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <!-- Results Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-medium text-gray-900 dark:text-dark-text">
                        Available Internships
                    </h2>
                    <p class="text-sm text-gray-500 dark:text-dark-secondary" id="results-count">
                        Loading internships...
                    </p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="toggleViewMode()" id="view-toggle-btn"
                            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md">
                        <i class="fas fa-th-large" id="view-icon"></i>
                    </button>
                </div>
            </div>

            <!-- Internships Grid/List -->
            <div id="internships-container" class="space-y-4">
                ${Components.createSpinner('large')}
            </div>

            <!-- Pagination -->
            <div id="pagination-container" class="hidden">
                <!-- Pagination will be inserted here -->
            </div>
        </div>
    `;

    // Load internships and user applications
    loadInternships();
    loadUserApplications();
    
    // Set up search and filter handlers
    setupSearchAndFilters();
}

let currentPage = 1;
let totalPages = 1;
let isGridView = true;
let allInternships = [];
let filteredInternships = [];
let userApplications = []; // Track user's applications

async function loadInternships() {
    try {
        const response = await api.getInternships();
        const internships = response.internships || response;

        allInternships = internships;
        filteredInternships = [...internships];
        
        displayInternships();
        updateResultsCount();
        
    } catch (error) {
        console.error('Error loading internships:', error);
        showToast('Failed to load internships', 'error');
        
        document.getElementById('internships-container').innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-warning text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">Failed to load internships</p>
                <button onclick="loadInternships()" 
                        class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                    Try Again
                </button>
            </div>
        `;
    }
}

async function loadUserApplications() {
    try {
        const response = await api.getMyApplications();
        userApplications = response.applications || response || [];
        
        // Update button states after loading applications
        updateApplyButtonStates();
    } catch (error) {
        console.error('Error loading user applications:', error);
        // Don't show error toast for applications as it's not critical for browsing
    }
}

function displayInternships() {
    const container = document.getElementById('internships-container');
    
    if (filteredInternships.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">No internships found</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }

    if (isGridView) {
        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${filteredInternships.map(internship => createInternshipCard(internship)).join('')}
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="space-y-4">
                ${filteredInternships.map(internship => createInternshipListItem(internship)).join('')}
            </div>
        `;
    }
}

function createInternshipCard(internship) {
    return `
        <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-1">
                        ${internship.title}
                    </h3>
                    <p class="text-sm text-primary font-medium">${internship.company}</p>
                </div>
                <div class="ml-4">
                    ${Components.createStatusBadge(internship.status, 'small')}
                </div>
            </div>
            
            <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-500 dark:text-dark-secondary">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    ${internship.location}
                </div>
                <div class="flex items-center text-sm text-gray-500 dark:text-dark-secondary">
                    <i class="fas fa-clock mr-2"></i>
                    ${internship.duration}
                </div>
                <div class="flex items-center text-sm text-gray-500 dark:text-dark-secondary">
                    <i class="fas fa-dollar-sign mr-2"></i>
                    ${internship.salary}
                </div>
            </div>
            
            <p class="text-sm text-gray-600 dark:text-dark-secondary mb-4 line-clamp-3">
                ${Utils.truncateText(internship.description, 120)}
            </p>
            
            <div class="flex items-center justify-between">
                <div class="text-xs text-gray-400 dark:text-gray-500">
                    Posted ${Utils.getRelativeTime(internship.created_at)}
                </div>
                <button onclick="applyToInternship(${internship.id})" 
                        class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Apply Now
                </button>
            </div>
        </div>
    `;
}

function createInternshipListItem(internship) {
    // Check if user has already applied to this internship
    const hasApplied = userApplications.some(app => app.internship_id === internship.id);
    const applyButtonText = hasApplied ? 'Applied' : 'Apply Now';
    const applyButtonClass = hasApplied 
        ? 'bg-accent hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-not-allowed opacity-75'
        : 'bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors';
    const applyButtonIcon = hasApplied ? 'fas fa-check mr-2' : 'fas fa-paper-plane mr-2';
    const applyButtonOnclick = hasApplied ? '' : `onclick="applyToInternship(${internship.id})"`;
    
    return `
        <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">
                            ${internship.title}
                        </h3>
                        ${Components.createStatusBadge(internship.status, 'small')}
                    </div>
                    
                    <p class="text-sm text-primary font-medium mb-2">${internship.company}</p>
                    
                    <div class="flex items-center space-x-6 text-sm text-gray-500 dark:text-dark-secondary mb-3">
                        <div class="flex items-center">
                            <i class="fas fa-map-marker-alt mr-1"></i>
                            ${internship.location}
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-clock mr-1"></i>
                            ${internship.duration}
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-dollar-sign mr-1"></i>
                            ${internship.salary}
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-600 dark:text-dark-secondary mb-3">
                        ${Utils.truncateText(internship.description, 200)}
                    </p>
                    
                    <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-400 dark:text-gray-500">
                            Posted ${Utils.getRelativeTime(internship.created_at)}
                        </div>
                        <button ${applyButtonOnclick}
                                class="${applyButtonClass}"
                                ${hasApplied ? 'disabled' : ''}>
                            <i class="${applyButtonIcon}"></i>${applyButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    const locationFilter = document.getElementById('location-filter');
    const durationFilter = document.getElementById('duration-filter');
    const salaryFilter = document.getElementById('salary-filter');
    const sortBy = document.getElementById('sort-by');

    // Debounced search
    const debouncedSearch = Utils.debounce(applyFilters, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
    locationFilter.addEventListener('change', applyFilters);
    durationFilter.addEventListener('change', applyFilters);
    salaryFilter.addEventListener('change', applyFilters);
    sortBy.addEventListener('change', applyFilters);
}

function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const location = document.getElementById('location-filter').value;
    const duration = document.getElementById('duration-filter').value;
    const salary = document.getElementById('salary-filter').value;
    const sortBy = document.getElementById('sort-by').value;

    filteredInternships = allInternships.filter(internship => {
        // Search filter
        const matchesSearch = !searchTerm || 
            internship.title.toLowerCase().includes(searchTerm) ||
            internship.company.toLowerCase().includes(searchTerm) ||
            internship.description.toLowerCase().includes(searchTerm);

        // Location filter
        const matchesLocation = !location || 
            internship.location.toLowerCase().includes(location.toLowerCase());

        // Duration filter
        const matchesDuration = !duration || 
            internship.duration.toLowerCase().includes(duration);

        // Salary filter (basic implementation)
        const matchesSalary = !salary || 
            internship.salary.toLowerCase().includes(salary.split('-')[0]);

        return matchesSearch && matchesLocation && matchesDuration && matchesSalary;
    });

    // Apply sorting
    applySorting(sortBy);

    displayInternships();
    updateResultsCount();
}

function applySorting(sortBy) {
    switch (sortBy) {
        case 'newest':
            filteredInternships.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'oldest':
            filteredInternships.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            break;
        case 'company':
            filteredInternships.sort((a, b) => a.company.localeCompare(b.company));
            break;
        case 'salary-high':
            // Basic salary sorting (would need more sophisticated parsing in real app)
            filteredInternships.sort((a, b) => {
                const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
                const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
                return bSalary - aSalary;
            });
            break;
        case 'salary-low':
            filteredInternships.sort((a, b) => {
                const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
                const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
                return aSalary - bSalary;
            });
            break;
    }
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('location-filter').value = '';
    document.getElementById('duration-filter').value = '';
    document.getElementById('salary-filter').value = '';
    document.getElementById('sort-by').value = 'newest';
    
    filteredInternships = [...allInternships];
    applySorting('newest');
    displayInternships();
    updateResultsCount();
}

function toggleViewMode() {
    isGridView = !isGridView;
    const viewIcon = document.getElementById('view-icon');
    viewIcon.className = isGridView ? 'fas fa-th-large' : 'fas fa-list';
    displayInternships();
}

function updateResultsCount() {
    const count = filteredInternships.length;
    const total = allInternships.length;
    document.getElementById('results-count').textContent = 
        `Showing ${count} of ${total} internships`;
}

async function applyToInternship(internshipId) {
    try {
        // Find the internship details
        const internship = allInternships.find(i => i.id === internshipId);
        if (!internship) {
            showToast('Internship not found', 'error');
            return;
        }

        // Show confirmation modal
        const modalId = 'apply-modal';
        const modalContent = `
            <div class="space-y-4">
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-900 dark:text-dark-text mb-2">${internship.title}</h4>
                    <p class="text-sm text-gray-600 dark:text-dark-secondary">${internship.company || 'Company not specified'}</p>
                    <p class="text-sm text-gray-600 dark:text-dark-secondary">${internship.location || 'Location not specified'}</p>
                </div>
                <p class="text-sm text-gray-600 dark:text-dark-secondary">
                    Are you sure you want to apply for this internship? This action cannot be undone.
                </p>
            </div>
        `;

        const modalActions = [
            {
                text: 'Cancel',
                type: 'secondary',
                size: 'medium',
                onClick: `Components.closeModal('${modalId}')`
            },
            {
                text: 'Apply Now',
                type: 'primary',
                size: 'medium',
                icon: 'fas fa-paper-plane',
                onClick: `confirmApplication(${internshipId})`
            }
        ];

        // Remove existing modal if it exists
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }

        // Create and show modal
        const modal = Components.createModal(modalId, 'Apply to Internship', modalContent, modalActions);
        document.body.insertAdjacentHTML('beforeend', modal);
        Components.showModal(modalId);

    } catch (error) {
        console.error('Error showing apply modal:', error);
        showToast('Error loading application form', 'error');
    }
}

async function confirmApplication(internshipId) {
    try {
        // Show loading state
        const applyButton = document.querySelector(`button[onclick="confirmApplication(${internshipId})"]`);
        if (applyButton) {
            applyButton.disabled = true;
            applyButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Applying...';
        }

        // Make API call to apply
        const response = await api.applyToInternship(internshipId);
        
        if (response) {
            showToast('Application submitted successfully!', 'success');
            
            // Add the new application to userApplications array
            userApplications.push({
                internship_id: internshipId,
                status: 'submitted',
                created_at: new Date().toISOString()
            });
            
            // Close modal
            Components.closeModal('apply-modal');
            
            // Update the apply button to show "Applied" state
            updateApplyButtonState(internshipId, true);
            
            // Refresh applications if on applications page
            if (typeof loadApplicationsPage === 'function') {
                loadApplicationsPage();
            }
        }
    } catch (error) {
        console.error('Error applying to internship:', error);
        
        if (error.status === 409) {
            showToast('You have already applied to this internship', 'warning');
        } else if (error.status === 403) {
            showToast('This internship is not available for applications', 'error');
        } else if (error.status === 404) {
            showToast('Internship not found', 'error');
        } else {
            showToast('Failed to submit application. Please try again.', 'error');
        }
        
        // Reset button state
        const applyButton = document.querySelector(`button[onclick="confirmApplication(${internshipId})"]`);
        if (applyButton) {
            applyButton.disabled = false;
            applyButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Apply Now';
        }
    }
}

function updateApplyButtonStates() {
    // Update all apply buttons based on user's applications
    userApplications.forEach(application => {
        updateApplyButtonState(application.internship_id, true);
    });
}

function updateApplyButtonState(internshipId, isApplied) {
    const applyButton = document.querySelector(`button[onclick="applyToInternship(${internshipId})"]`);
    if (applyButton) {
        if (isApplied) {
            applyButton.innerHTML = '<i class="fas fa-check mr-2"></i>Applied';
            applyButton.className = applyButton.className.replace('bg-primary hover:bg-primary-hover', 'bg-accent hover:bg-green-600');
            applyButton.disabled = true;
            applyButton.onclick = null;
        }
    }
}

// Export for use in main app
window.loadBrowseInternshipsPage = loadBrowseInternshipsPage;
