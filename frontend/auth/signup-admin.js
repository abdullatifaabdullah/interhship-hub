// Admin Signup Page
function loadAdminSignupPage(container) {
    container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-warning bg-opacity-10">
                        <i class="fas fa-user-shield text-warning text-xl"></i>
                    </div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-dark-text">
                        Create admin account
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 dark:text-dark-secondary">
                        Already have an account?
                        <button onclick="loadLoginPage(document.getElementById('dynamic-content'))" 
                                class="font-medium text-primary hover:text-primary-hover">
                            Sign in here
                        </button>
                    </p>
                </div>
                
                <form class="mt-8 space-y-6" onsubmit="handleAdminSignup(event)">
                    <div class="space-y-4">
                        <div>
                            <label for="full_name" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Full Name <span class="text-danger">*</span>
                            </label>
                            <input id="full_name" name="full_name" type="text" required
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Enter your full name">
                        </div>
                        
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Email Address <span class="text-danger">*</span>
                            </label>
                            <input id="email" name="email" type="email" required
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Enter your email address">
                        </div>
                        
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Password <span class="text-danger">*</span>
                            </label>
                            <input id="password" name="password" type="password" required
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Create a strong password">
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Password must be at least 8 characters long
                            </p>
                        </div>
                        
                        <div>
                            <label for="confirm_password" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Confirm Password <span class="text-danger">*</span>
                            </label>
                            <input id="confirm_password" name="confirm_password" type="password" required
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Confirm your password">
                        </div>
                        
                        <div>
                            <label for="company" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Company/Organization
                            </label>
                            <input id="company" name="company" type="text"
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Enter your company or organization">
                        </div>
                        
                        <div>
                            <label for="department" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Department
                            </label>
                            <input id="department" name="department" type="text"
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Enter your department">
                        </div>
                        
                        <div>
                            <label for="admin_code" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Admin Access Code <span class="text-danger">*</span>
                            </label>
                            <input id="admin_code" name="admin_code" type="text" required
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Enter admin access code">
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Contact the system owner for the admin access code
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input id="terms" name="terms" type="checkbox" required
                               class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded">
                        <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-dark-text">
                            I agree to the 
                            <a href="#" class="text-primary hover:text-primary-hover">Terms of Service</a>
                            and 
                            <a href="#" class="text-primary hover:text-primary-hover">Privacy Policy</a>
                        </label>
                    </div>

                    <div>
                        <button type="submit" id="signup-btn"
                                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-warning hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warning disabled:opacity-50 disabled:cursor-not-allowed">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <i class="fas fa-user-shield text-warning group-hover:text-yellow-600" aria-hidden="true"></i>
                            </span>
                            <span id="signup-btn-text">Create Admin Account</span>
                        </button>
                    </div>

                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-background dark:bg-dark-bg text-gray-500 dark:text-dark-secondary">Student Access</span>
                            </div>
                        </div>
                        <div class="mt-6 text-center">
                            <button onclick="loadStudentSignupPage(document.getElementById('dynamic-content'))" 
                                    class="font-medium text-primary hover:text-primary-hover">
                                Sign up as Student instead
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

async function handleAdminSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
        company: formData.get('company'),
        department: formData.get('department'),
        admin_code: formData.get('admin_code')
    };
    
    const signupBtn = document.getElementById('signup-btn');
    const signupBtnText = document.getElementById('signup-btn-text');
    
    // Validate passwords match
    if (userData.password !== userData.confirm_password) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Validate password strength
    if (!Utils.validatePassword(userData.password)) {
        showToast('Password must be at least 8 characters long', 'error');
        return;
    }
    
    // Validate email
    if (!Utils.validateEmail(userData.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate admin code (basic validation)
    if (!userData.admin_code || userData.admin_code.length < 6) {
        showToast('Please enter a valid admin access code', 'error');
        return;
    }
    
    // Show loading state
    signupBtn.disabled = true;
    signupBtnText.innerHTML = Components.createSpinner('small') + ' Creating admin account...';
    
    try {
        const response = await api.signupAdmin(userData);
        
        showToast('Admin account created successfully! Please sign in.', 'success');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            loadLoginPage(document.getElementById('dynamic-content'));
        }, 2000);
        
    } catch (error) {
        console.error('Admin signup error:', error);
        showToast(error.message || 'Failed to create admin account. Please check your access code.', 'error');
        
        // Reset button state
        signupBtn.disabled = false;
        signupBtnText.textContent = 'Create Admin Account';
    }
}

// Export for use in main app
window.loadAdminSignupPage = loadAdminSignupPage;
