// Manage Admins Page
function loadManageAdminsPage(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">Manage Admins</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-dark-secondary">
                        Create, edit, and manage admin accounts
                    </p>
                </div>
                <div class="mt-4 sm:mt-0 flex space-x-3">
                    <button onclick="createNewAdmin()" 
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-warning hover:bg-yellow-600">
                        <i class="fas fa-user-plus mr-2"></i>
                        Add Admin
                    </button>
                    <button onclick="loadOwnerDashboard(document.getElementById('dynamic-content'))" 
                            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <!-- Admin Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-users-cog text-warning"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Total Admins</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="total-admins-manage">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-user-check text-accent"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Active Admins</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="active-admins-manage">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-danger bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-user-times text-danger"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Inactive Admins</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="inactive-admins-manage">-</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="search-admins" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Search Admins
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                            <input type="text" id="search-admins" placeholder="Search by name or email..."
                                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="status-filter-admins" class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                            Filter by Status
                        </label>
                        <select id="status-filter-admins" 
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspended</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div class="flex items-end">
                        <button onclick="clearAdminFilters()" 
                                class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <!-- Admins Table -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">All Admins</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Email</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Created</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="admins-table-body" class="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td colspan="5" class="px-6 py-12 text-center">
                                    ${Components.createSpinner('large')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Load admins
    loadAdminsForManagement();
    
    // Set up filters
    setupAdminManagementFilters();
}

let allAdminsForManagement = [];
let filteredAdminsForManagement = [];

async function loadAdminsForManagement() {
    try {
        const response = await api.getAllAdmins();
        const admins = response.admins || response;

        allAdminsForManagement = admins;
        filteredAdminsForManagement = [...admins];
        
        displayAdminsTable();
        updateAdminManagementStats();
        
    } catch (error) {
        console.error('Error loading admins:', error);
        showToast('Failed to load admins', 'error');
        
        document.getElementById('admins-table-body').innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center">
                    <div class="text-center">
                        <i class="fas fa-exclamation-triangle text-warning text-4xl mb-4"></i>
                        <p class="text-gray-500 dark:text-dark-secondary">Failed to load admins</p>
                        <button onclick="loadAdminsForManagement()" 
                                class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                            Try Again
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }
}

function displayAdminsTable() {
    const tbody = document.getElementById('admins-table-body');
    
    if (filteredAdminsForManagement.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-12 text-center">
                    <div class="text-center">
                        <i class="fas fa-users-cog text-gray-400 text-4xl mb-4"></i>
                        <p class="text-gray-500 dark:text-dark-secondary">No admins found</p>
                        <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Create your first admin account</p>
                        <button onclick="createNewAdmin()" 
                                class="mt-4 bg-warning hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                            Add Admin
                        </button>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredAdminsForManagement.map(admin => {
        const statusConfig = getStatusConfig(admin.admin_status);
        return `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-warning bg-opacity-10 flex items-center justify-center">
                                <span class="text-warning font-medium text-sm">${admin.full_name.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900 dark:text-dark-text">${admin.full_name}</div>
                            <div class="text-sm text-gray-500 dark:text-dark-secondary">Admin</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                    ${admin.email}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgClass} ${statusConfig.textClass}">
                        <i class="${statusConfig.icon} mr-1"></i>
                        ${statusConfig.label}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-secondary">
                    ${Utils.formatDate(admin.created_at)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        ${getStatusActionButtons(admin)}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function getStatusConfig(status) {
    const statusMap = {
        'active': {
            label: 'Active',
            icon: 'fas fa-check-circle',
            bgClass: 'bg-accent bg-opacity-10',
            textClass: 'text-accent'
        },
        'pending': {
            label: 'Pending',
            icon: 'fas fa-clock',
            bgClass: 'bg-warning bg-opacity-10',
            textClass: 'text-warning'
        },
        'suspended': {
            label: 'Suspended',
            icon: 'fas fa-pause-circle',
            bgClass: 'bg-danger bg-opacity-10',
            textClass: 'text-danger'
        },
        'rejected': {
            label: 'Rejected',
            icon: 'fas fa-times-circle',
            bgClass: 'bg-gray-500 bg-opacity-10',
            textClass: 'text-gray-500'
        }
    };
    
    return statusMap[status] || statusMap['pending'];
}

function getStatusActionButtons(admin) {
    const status = admin.admin_status;
    let buttons = '';
    
    if (status === 'pending') {
        buttons += `
            <button onclick="approveAdmin(${admin.id})" 
                    class="text-accent hover:text-green-600" 
                    title="Approve Admin">
                <i class="fas fa-check"></i>
            </button>
            <button onclick="rejectAdmin(${admin.id})" 
                    class="text-danger hover:text-red-600" 
                    title="Reject Admin">
                <i class="fas fa-times"></i>
            </button>
        `;
    } else if (status === 'active') {
        buttons += `
            <button onclick="suspendAdmin(${admin.id})" 
                    class="text-warning hover:text-yellow-600" 
                    title="Suspend Admin">
                <i class="fas fa-pause"></i>
            </button>
        `;
    } else if (status === 'suspended') {
        buttons += `
            <button onclick="approveAdmin(${admin.id})" 
                    class="text-accent hover:text-green-600" 
                    title="Reactivate Admin">
                <i class="fas fa-play"></i>
            </button>
        `;
    }
    
    buttons += `
        <button onclick="viewAdminDetails(${admin.id})" 
                class="text-primary hover:text-primary-hover" 
                title="View Details">
            <i class="fas fa-eye"></i>
        </button>
    `;
    
    return buttons;
}

function updateAdminManagementStats() {
    const total = allAdminsForManagement.length;
    const active = allAdminsForManagement.filter(admin => admin.admin_status === 'active').length;
    const inactive = allAdminsForManagement.filter(admin => 
        admin.admin_status === 'suspended' || admin.admin_status === 'rejected'
    ).length;

    document.getElementById('total-admins-manage').textContent = total;
    document.getElementById('active-admins-manage').textContent = active;
    document.getElementById('inactive-admins-manage').textContent = inactive;
}

function setupAdminManagementFilters() {
    const searchInput = document.getElementById('search-admins');
    const statusFilter = document.getElementById('status-filter-admins');

    const debouncedSearch = Utils.debounce(applyAdminManagementFilters, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
    statusFilter.addEventListener('change', applyAdminManagementFilters);
}

function applyAdminManagementFilters() {
    const searchTerm = document.getElementById('search-admins').value.toLowerCase();
    const status = document.getElementById('status-filter-admins').value;

    filteredAdminsForManagement = allAdminsForManagement.filter(admin => {
        const matchesSearch = !searchTerm || 
            admin.full_name.toLowerCase().includes(searchTerm) ||
            admin.email.toLowerCase().includes(searchTerm);

        const matchesStatus = !status || admin.admin_status === status;

        return matchesSearch && matchesStatus;
    });

    displayAdminsTable();
}

function clearAdminFilters() {
    document.getElementById('search-admins').value = '';
    document.getElementById('status-filter-admins').value = '';
    
    filteredAdminsForManagement = [...allAdminsForManagement];
    displayAdminsTable();
}

async function approveAdmin(adminId) {
    if (!confirm('Are you sure you want to approve this admin?')) return;

    try {
        await api.approveAdmin(adminId);
        
        // Update the admin status in the local data
        const admin = allAdminsForManagement.find(admin => admin.id === adminId);
        if (admin) {
            admin.admin_status = 'active';
        }
        
        // Refresh the display
        filteredAdminsForManagement = [...allAdminsForManagement];
        displayAdminsTable();
        updateAdminManagementStats();
        
        showToast('Admin approved successfully', 'success');
    } catch (error) {
        console.error('Error approving admin:', error);
        showToast('Failed to approve admin', 'error');
    }
}

async function suspendAdmin(adminId) {
    if (!confirm('Are you sure you want to suspend this admin?')) return;

    try {
        await api.suspendAdmin(adminId);
        
        // Update the admin status in the local data
        const admin = allAdminsForManagement.find(admin => admin.id === adminId);
        if (admin) {
            admin.admin_status = 'suspended';
        }
        
        // Refresh the display
        filteredAdminsForManagement = [...allAdminsForManagement];
        displayAdminsTable();
        updateAdminManagementStats();
        
        showToast('Admin suspended successfully', 'success');
    } catch (error) {
        console.error('Error suspending admin:', error);
        showToast('Failed to suspend admin', 'error');
    }
}

async function rejectAdmin(adminId) {
    if (!confirm('Are you sure you want to reject this admin? This action cannot be undone.')) return;

    try {
        await api.rejectAdmin(adminId);
        
        // Update the admin status in the local data
        const admin = allAdminsForManagement.find(admin => admin.id === adminId);
        if (admin) {
            admin.admin_status = 'rejected';
        }
        
        // Refresh the display
        filteredAdminsForManagement = [...allAdminsForManagement];
        displayAdminsTable();
        updateAdminManagementStats();
        
        showToast('Admin rejected successfully', 'success');
    } catch (error) {
        console.error('Error rejecting admin:', error);
        showToast('Failed to reject admin', 'error');
    }
}

function createNewAdmin() {
    showToast('Admin creation feature coming soon!', 'info');
}

function viewAdminDetails(adminId) {
    const admin = allAdminsForManagement.find(admin => admin.id === adminId);
    if (!admin) return;

    const statusConfig = getStatusConfig(admin.admin_status);

    const modalContent = `
        <div class="space-y-4">
            <div class="flex items-center">
                <div class="flex-shrink-0 h-12 w-12">
                    <div class="h-12 w-12 rounded-full bg-warning bg-opacity-10 flex items-center justify-center">
                        <span class="text-warning font-medium text-lg">${admin.full_name.charAt(0).toUpperCase()}</span>
                    </div>
                </div>
                <div class="ml-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">${admin.full_name}</h3>
                    <p class="text-sm text-gray-500 dark:text-dark-secondary">${admin.email}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text">Created</h4>
                    <p class="text-sm text-gray-600 dark:text-dark-secondary">${Utils.formatDateTime(admin.created_at)}</p>
                </div>
                <div>
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text">Status</h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgClass} ${statusConfig.textClass}">
                        <i class="${statusConfig.icon} mr-1"></i>
                        ${statusConfig.label}
                    </span>
                </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Available Actions</h4>
                <div class="flex space-x-2">
                    ${getStatusActionButtons(admin)}
                </div>
            </div>
        </div>
    `;

    const modal = Components.createModal(
        'admin-details-modal',
        'Admin Details',
        modalContent,
        [
            {
                text: 'Close',
                type: 'secondary',
                onClick: "Components.closeModal('admin-details-modal')"
            }
        ]
    );

    document.body.insertAdjacentHTML('beforeend', modal);
    Components.showModal('admin-details-modal');
}

// Export for use in main app
window.loadManageAdminsPage = loadManageAdminsPage;
