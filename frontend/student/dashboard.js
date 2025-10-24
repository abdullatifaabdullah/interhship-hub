// Student Dashboard
function loadStudentDashboard(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Welcome Section -->
            <div class="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-sm p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold">Welcome back!</h1>
                        <p class="text-primary-light mt-1">Ready to find your next internship opportunity?</p>
                    </div>
                    <div class="hidden md:block">
                        <i class="fas fa-graduation-cap text-4xl text-primary-light"></i>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-file-alt text-accent"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Applications</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="total-applications">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-check-circle text-primary"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Approved</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="approved-applications">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-clock text-warning"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Pending</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="pending-applications">-</p>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Tips Section -->
            <div class="bg-gradient-to-r from-accent to-green-600 rounded-lg shadow-sm p-6 text-white">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-lightbulb text-2xl text-green-200"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-medium">Pro Tip</h3>
                        <p class="text-green-100 mt-1">
                            Make sure your profile is complete and your CV is up-to-date before applying to internships. 
                            Companies often review applications quickly, so first impressions matter!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Load dashboard data
    loadStudentDashboardData();
}

async function loadStudentDashboardData() {
    try {
        // Load applications data
        const response = await api.getMyApplications();
        const applications = response.applications || response;

        // Update stats
        document.getElementById('total-applications').textContent = applications.length;
        document.getElementById('approved-applications').textContent = 
            applications.filter(app => app.status === 'approved').length;
        document.getElementById('pending-applications').textContent = 
            applications.filter(app => app.status === 'pending').length;

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
    }
}

// Export for use in main app
window.loadStudentDashboard = loadStudentDashboard;
