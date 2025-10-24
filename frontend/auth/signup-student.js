// Student Signup Page
function loadStudentSignupPage(container) {
    container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10">
                        <i class="fas fa-user-graduate text-accent text-xl"></i>
                    </div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-dark-text">
                        Create your student account
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 dark:text-dark-secondary">
                        Already have an account?
                        <button onclick="loadLoginPage(document.getElementById('dynamic-content'))" 
                                class="font-medium text-primary hover:text-primary-hover">
                            Sign in here
                        </button>
                    </p>
                </div>
                
                <form class="mt-8 space-y-6" onsubmit="handleStudentSignup(event)">
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
                            <label for="university" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                University/Institution
                            </label>
                            <input id="university" name="university" type="text"
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Enter your university or institution">
                        </div>
                        
                        <div>
                            <label for="major" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Major/Field of Study
                            </label>
                            <input id="major" name="major" type="text"
                                   class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                   placeholder="Enter your major or field of study">
                        </div>
                        
                        <div>
                            <label for="graduation_year" class="block text-sm font-medium text-gray-700 dark:text-dark-text">
                                Expected Graduation Year
                            </label>
                            <select id="graduation_year" name="graduation_year"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                <option value="">Select graduation year</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
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
                                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <i class="fas fa-user-plus text-accent group-hover:text-green-600" aria-hidden="true"></i>
                            </span>
                            <span id="signup-btn-text">Create Account</span>
                        </button>
                    </div>

                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-background dark:bg-dark-bg text-gray-500 dark:text-dark-secondary">Admin Access</span>
                            </div>
                        </div>
                        <div class="mt-6 text-center">
                            <button onclick="loadAdminSignupPage(document.getElementById('dynamic-content'))" 
                                    class="font-medium text-primary hover:text-primary-hover">
                                Sign up as Admin instead
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

async function handleStudentSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
        university: formData.get('university'),
        major: formData.get('major'),
        graduation_year: formData.get('graduation_year')
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
    
    // Show loading state
    signupBtn.disabled = true;
    signupBtnText.innerHTML = Components.createSpinner('small') + ' Creating account...';
    
    try {
        const response = await api.signupStudent(userData);
        
        showToast('Account created successfully! Please sign in.', 'success');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            loadLoginPage(document.getElementById('dynamic-content'));
        }, 2000);
        
    } catch (error) {
        console.error('Signup error:', error);
        showToast(error.message || 'Failed to create account. Please try again.', 'error');
        
        // Reset button state
        signupBtn.disabled = false;
        signupBtnText.textContent = 'Create Account';
    }
}

// Export for use in main app
window.loadStudentSignupPage = loadStudentSignupPage;
