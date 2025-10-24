// Manage Pending Posts Page
function loadPendingPostsPage(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">Manage Pending Posts</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-dark-secondary">
                        Review and approve internship posts created by admins
                    </p>
                </div>
                <div class="mt-4 sm:mt-0">
                    <button onclick="loadOwnerDashboard(document.getElementById('dynamic-content'))" 
                            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <!-- Pending Posts Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-clock text-warning"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Pending Posts</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="pending-posts-count">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-check-circle text-accent"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Approved Today</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="approved-today-count">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-danger bg-opacity-10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-times-circle text-danger"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500 dark:text-dark-secondary">Rejected Today</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-dark-text" id="rejected-today-count">-</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Posts List -->
            <div class="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">Pending Posts for Review</h3>
                </div>
                <div id="pending-posts-container" class="p-6">
                    ${Components.createSpinner('large')}
                </div>
            </div>
        </div>
    `;

    // Load pending posts
    loadPendingPosts();
}

let allPendingPosts = [];

async function loadPendingPosts() {
    try {
        console.log('Loading pending posts...');
        const posts = await api.getPendingPosts();
        console.log('Received posts:', posts);
        
        allPendingPosts = posts;
        
        displayPendingPosts();
        updatePendingPostsStats();
        
    } catch (error) {
        console.error('Error loading pending posts:', error);
        console.error('Error details:', error.message);
        showToast(`Failed to load pending posts: ${error.message}`, 'error');
        
        document.getElementById('pending-posts-container').innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-warning text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">Failed to load pending posts</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Error: ${error.message}</p>
                <button onclick="loadPendingPosts()" 
                        class="mt-4 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                    Try Again
                </button>
            </div>
        `;
    }
}

function displayPendingPosts() {
    const container = document.getElementById('pending-posts-container');
    
    if (allPendingPosts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-check-circle text-accent text-4xl mb-4"></i>
                <p class="text-gray-500 dark:text-dark-secondary">No pending posts</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">All posts have been reviewed</p>
            </div>
        `;
        return;
    }

    container.innerHTML = allPendingPosts.map(post => `
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-dark-text">${post.title}</h4>
                    <div class="flex items-center mt-2 text-sm text-gray-500 dark:text-dark-secondary">
                        <i class="fas fa-map-marker-alt mr-1"></i>
                        <span>${post.location}</span>
                        <span class="mx-2">•</span>
                        <i class="fas fa-user mr-1"></i>
                        <span>Created by ${post.creator_name}</span>
                        <span class="mx-2">•</span>
                        <i class="fas fa-clock mr-1"></i>
                        <span>${Utils.getRelativeTime(post.created_at)}</span>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="approvePost(${post.id})" 
                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-green-600">
                        <i class="fas fa-check mr-1"></i>
                        Approve
                    </button>
                    <button onclick="rejectPost(${post.id})" 
                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-danger hover:bg-red-600">
                        <i class="fas fa-times mr-1"></i>
                        Reject
                    </button>
                </div>
            </div>
            
            <div class="mb-4">
                <h5 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Description</h5>
                <p class="text-sm text-gray-600 dark:text-dark-secondary leading-relaxed">${post.description}</p>
            </div>
            
            ${post.tags && post.tags.length > 0 ? `
                <div class="mb-4">
                    <h5 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Skills/Tags</h5>
                    <div class="flex flex-wrap gap-2">
                        ${post.tags.map(tag => `
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="text-sm text-gray-500 dark:text-dark-secondary">
                    <i class="fas fa-envelope mr-1"></i>
                    ${post.creator_email}
                </div>
                <div class="flex space-x-2">
                    <button onclick="viewPostDetails(${post.id})" 
                            class="text-primary hover:text-primary-hover text-sm font-medium">
                        <i class="fas fa-eye mr-1"></i>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updatePendingPostsStats() {
    const pendingCount = allPendingPosts.length;
    document.getElementById('pending-posts-count').textContent = pendingCount;
    
    // For now, show mock data for approved/rejected today
    document.getElementById('approved-today-count').textContent = '0';
    document.getElementById('rejected-today-count').textContent = '0';
}

async function approvePost(postId) {
    console.log('Attempting to approve post:', postId);
    
    if (!confirm('Are you sure you want to approve this internship post?')) return;

    try {
        console.log('Calling API to approve post:', postId);
        const result = await api.approveInternship(postId);
        console.log('API response:', result);
        
        // Remove from pending list
        allPendingPosts = allPendingPosts.filter(post => post.id !== postId);
        displayPendingPosts();
        updatePendingPostsStats();
        
        showToast('Internship post approved successfully', 'success');
    } catch (error) {
        console.error('Error approving post:', error);
        console.error('Error details:', error.message);
        showToast(`Failed to approve post: ${error.message}`, 'error');
    }
}

async function rejectPost(postId) {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason || reason.trim() === '') {
        showToast('Rejection reason is required', 'error');
        return;
    }

    if (!confirm('Are you sure you want to reject this internship post?')) return;

    try {
        console.log('Calling API to reject post:', postId, 'with reason:', reason);
        const result = await api.rejectInternship(postId, reason.trim());
        console.log('API response:', result);
        
        // Remove from pending list
        allPendingPosts = allPendingPosts.filter(post => post.id !== postId);
        displayPendingPosts();
        updatePendingPostsStats();
        
        showToast('Internship post rejected successfully', 'success');
    } catch (error) {
        console.error('Error rejecting post:', error);
        console.error('Error details:', error.message);
        showToast(`Failed to reject post: ${error.message}`, 'error');
    }
}

function viewPostDetails(postId) {
    const post = allPendingPosts.find(p => p.id === postId);
    if (!post) return;

    const modalContent = `
        <div class="space-y-4">
            <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">${post.title}</h3>
                <p class="text-sm text-gray-500 dark:text-dark-secondary mt-1">
                    <i class="fas fa-map-marker-alt mr-1"></i>${post.location}
                </p>
            </div>
            
            <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Description</h4>
                <p class="text-sm text-gray-600 dark:text-dark-secondary leading-relaxed">${post.description}</p>
            </div>
            
            ${post.tags && post.tags.length > 0 ? `
                <div>
                    <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Skills/Tags</h4>
                    <div class="flex flex-wrap gap-2">
                        ${post.tags.map(tag => `
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Post Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-500 dark:text-dark-secondary">Created by:</span>
                        <p class="font-medium text-gray-900 dark:text-dark-text">${post.creator_name}</p>
                    </div>
                    <div>
                        <span class="text-gray-500 dark:text-dark-secondary">Email:</span>
                        <p class="font-medium text-gray-900 dark:text-dark-text">${post.creator_email}</p>
                    </div>
                    <div>
                        <span class="text-gray-500 dark:text-dark-secondary">Created:</span>
                        <p class="font-medium text-gray-900 dark:text-dark-text">${Utils.formatDateTime(post.created_at)}</p>
                    </div>
                    <div>
                        <span class="text-gray-500 dark:text-dark-secondary">Status:</span>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning bg-opacity-10 text-warning">
                            <i class="fas fa-clock mr-1"></i>
                            Pending Approval
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-info-circle text-blue-400"></i>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                            Review Required
                        </h3>
                        <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
                            <p>This post is waiting for your approval before it becomes visible to students.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modal = Components.createModal(
        'post-details-modal',
        'Post Details',
        modalContent,
        [
            {
                text: 'Close',
                type: 'secondary',
                onClick: "Components.closeModal('post-details-modal')"
            },
            {
                text: 'Approve',
                type: 'primary',
                onClick: `approvePost(${postId}); Components.closeModal('post-details-modal')`
            },
            {
                text: 'Reject',
                type: 'danger',
                onClick: `rejectPost(${postId}); Components.closeModal('post-details-modal')`
            }
        ]
    );

    document.body.insertAdjacentHTML('beforeend', modal);
    Components.showModal('post-details-modal');
}

// Export for use in main app
window.loadPendingPostsPage = loadPendingPostsPage;
