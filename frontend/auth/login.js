// Login Page
function loadLoginPage(container) {
    container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10">
                        <i class="fas fa-sign-in-alt text-primary text-xl"></i>
                    </div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-dark-text">
                        Sign in to your account
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 dark:text-dark-secondary">
                        Or
                        <button onclick="loadStudentSignupPage(document.getElementById('dynamic-content'))" 
                                class="font-medium text-primary hover:text-primary-hover">
                            create a new student account
                        </button>
                    </p>
                </div>
                
                <form class="mt-8 space-y-6" onsubmit="handleLogin(event)">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email" class="sr-only">Email address</label>
                            <input id="email" name="email" type="email" autocomplete="email" required
                                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                   placeholder="Email address">
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required
                                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                   placeholder="Password">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                   class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-dark-text">
                                Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-primary hover:text-primary-hover">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" id="login-btn"
                                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <i class="fas fa-lock text-primary group-hover:text-primary-hover" aria-hidden="true"></i>
                            </span>
                            <span id="login-btn-text">Sign in</span>
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
                                Sign up as Admin
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('login-btn');
    const loginBtnText = document.getElementById('login-btn-text');
    
    // Show loading state
    loginBtn.disabled = true;
    loginBtnText.innerHTML = Components.createSpinner('small') + ' Signing in...';
    
    try {
        const response = await api.login(email, password);
        
        // Store authentication data
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify({
            email: email,
            role: response.role || 'student' // Default to student if role not provided
        }));
        
        // Update app state
        const appElement = document.querySelector('[x-data="appData()"]');
        if (appElement) {
            const appData = Alpine.$data(appElement);
            appData.isAuthenticated = true;
            appData.user = { email: email, role: response.role || 'student' };
            appData.userRole = response.role || 'student';
            
            // Redirect based on role
            const redirectPage = response.role === 'admin' ? 'admin-dashboard' : 
                               response.role === 'owner' ? 'owner-dashboard' : 'student-dashboard';
            
            showToast('Login successful!', 'success');
            
            // Update navigation and show appropriate page
            setTimeout(() => {
                appData.showPage(redirectPage);
            }, 1000);
        } else {
            showToast('Login successful!', 'success');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showToast(error.message || 'Login failed. Please check your credentials.', 'error');
        
        // Reset button state
        loginBtn.disabled = false;
        loginBtnText.textContent = 'Sign in';
    }
}

// Export for use in main app
window.loadLoginPage = loadLoginPage;
