// Admin Dashboard
function loadAdminDashboard(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Welcome Section -->
            <div class="bg-gradient-to-r from-warning to-yellow-600 rounded-lg shadow-sm p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
                        <p class="text-yellow-100 mt-1">Manage internships and review applications</p>
                    </div>
                    <div class="hidden md:block">
                        <i class="fas fa-user-shield text-4xl text-yellow-200"></i>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-briefcase text-primary"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Total Internships</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="total-internships">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-file-alt text-warning"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Pending Applications</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="pending-applications">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-check-circle text-accent"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Approved Applications</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="approved-applications">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-danger bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-times-circle text-danger"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Rejected Applications</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="rejected-applications">-</p>
                        </div>
                    </div>
                </div>

            </div>


            <!-- Quick Actions -->
            <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-plus text-primary"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">Create Internship</h3>
                            <p class="text-sm text-gray-500 dark:text-dark-secondary">Post a new internship opportunity</p>
                        </div>
                    </div>
                    <button onclick="createNewInternship()" 
                            class="w-full bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Create Internship
                    </button>
                </div>



            </div>

            <!-- Tips Section -->
            <div class="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-sm p-6 text-white">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-lightbulb text-2xl text-blue-200"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-medium">Admin Tips</h3>
                        <p class="text-blue-100 mt-1">
                            Review applications promptly to provide a good experience for students. 
                            Consider setting up automated responses for common application statuses.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Load dashboard data
    loadAdminDashboardData();
}

async function loadAdminDashboardData() {
    try {
        // Load dashboard cards data
        const cardsData = await api.getAdminDashboardCards();

        // Update stats with real data
        document.getElementById('total-internships').textContent = cardsData.total_internships || 0;
        document.getElementById('pending-applications').textContent = cardsData.pending_applications || 0;
        document.getElementById('approved-applications').textContent = cardsData.approved_applications || 0;
        document.getElementById('rejected-applications').textContent = cardsData.rejected_applications || 0;

    } catch (error) {
        console.error('Error loading admin dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
    }
}

function createNewInternship() {
    // This will be implemented when we create the internship creation modal
    showToast('Internship creation feature coming soon!', 'info');
}

// Export for use in main app
window.loadAdminDashboard = loadAdminDashboard;
