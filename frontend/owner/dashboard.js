// Owner Dashboard
function loadOwnerDashboard(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Welcome Section -->
            <div class="bg-gradient-to-r from-danger to-red-600 rounded-lg shadow-sm p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold">Owner Dashboard</h1>
                        <p class="text-red-100 mt-1">System overview and admin management</p>
                    </div>
                    <div class="hidden md:block">
                        <i class="fas fa-crown text-4xl text-red-200"></i>
                    </div>
                </div>
            </div>

            <!-- System Stats -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-briefcase text-primary"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Total Internships</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="total-internships-owner">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-file-alt text-accent"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Total Applications</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="total-applications-owner">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-users-cog text-warning"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Active Admins</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="active-admins-owner">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-danger bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-user-clock text-danger"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Pending Admins</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="pending-admins-owner">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-clock text-secondary"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Pending Admin Posts</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="pending-posts-owner">-</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Management Actions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Manage Admins Section -->
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-700">
                    <div class="text-center">
                        <div class="flex justify-center mb-6">
                            <div class="w-16 h-16 bg-warning bg-opacity-10 rounded-full flex items-center justify-center">
                                <i class="fas fa-users-cog text-warning text-2xl"></i>
                            </div>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">Admin Management</h3>
                        <p class="text-gray-500 dark:text-dark-secondary mb-6">
                            Manage admin accounts, approve pending admins, and control admin access
                        </p>
                        <button onclick="loadManageAdminsPage(document.getElementById('dynamic-content'))" 
                                class="bg-warning hover:bg-yellow-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-sm">
                            <i class="fas fa-cog mr-2"></i>
                            Manage Admins
                        </button>
                    </div>
                </div>

                <!-- Manage Pending Posts Section -->
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-700">
                    <div class="text-center">
                        <div class="flex justify-center mb-6">
                            <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                                <i class="fas fa-file-alt text-primary text-2xl"></i>
                            </div>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">Pending Posts</h3>
                        <p class="text-gray-500 dark:text-dark-secondary mb-6">
                            Review and approve internship posts created by admins
                        </p>
                        <button onclick="loadPendingPostsPage(document.getElementById('dynamic-content'))" 
                                class="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-sm">
                            <i class="fas fa-clipboard-check mr-2"></i>
                            Manage Pending Posts
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tips Section -->
            <div class="bg-gradient-to-r from-danger to-red-600 rounded-lg shadow-sm p-6 text-white">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-crown text-2xl text-red-200"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-medium">Owner Tips</h3>
                        <p class="text-red-100 mt-1">
                            Regularly review admin activity and system performance. 
                            Consider setting up automated reports for better oversight of your platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Load dashboard data
    loadOwnerDashboardData();
}

async function loadOwnerDashboardData() {
    try {
        // Load dashboard data
        const dashboardData = await api.getOwnerDashboard();

        // Load admins data
        const adminsResponse = await api.getAllAdmins();
        const admins = adminsResponse.admins || adminsResponse;

        // Update stats
        document.getElementById('total-internships-owner').textContent = dashboardData.approved_posts;
        document.getElementById('total-applications-owner').textContent = dashboardData.total_applications;
        document.getElementById('active-admins-owner').textContent = dashboardData.active_admins;
        document.getElementById('pending-admins-owner').textContent = dashboardData.pending_admins;
        document.getElementById('pending-posts-owner').textContent = dashboardData.pending_posts;

    } catch (error) {
        console.error('Error loading owner dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
    }
}

function createNewAdmin() {
    showToast('Admin creation feature coming soon!', 'info');
}

function openSystemSettings() {
    showToast('System settings feature coming soon!', 'info');
}

// Export for use in main app
window.loadOwnerDashboard = loadOwnerDashboard;
