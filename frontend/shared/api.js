// API Configuration and Utilities
const API_BASE_URL = 'https://internhubapi.sadn.site/api/v1';

// API Client Class
class APIClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = localStorage.getItem('token');
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        };

        const config = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Authentication endpoints
    async login(email, password) {
        return this.request('/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    }

    async signupStudent(userData) {
        return this.request('/auth/sign-up-student', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async signupAdmin(userData) {
        return this.request('/auth/sign-up-admin', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    // Internship endpoints
    async getInternships(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/internships/approved${queryString ? `?${queryString}` : ''}`);
    }

    async getInternship(id) {
        return this.request(`/internships/${id}`);
    }

    async createInternship(data) {
        return this.request('/internships', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateInternship(id, data) {
        return this.request(`/internships/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteInternship(id) {
        return this.request(`/internships/${id}`, {
            method: 'DELETE'
        });
    }

    // Application endpoints
    async applyToInternship(internshipId, data) {
        return this.request('/applications', {
            method: 'POST',
            body: JSON.stringify({
                internship_id: internshipId,
                ...data
            })
        });
    }

    async getMyApplications() {
        return this.request('/applications/mine');
    }

    async getApplicationsForAdmin(internshipId, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/applications/for-admin?post_id=${internshipId}${queryString ? `&${queryString}` : ''}`);
    }

    async getAllApplications(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/applications/all${queryString ? `?${queryString}` : ''}`);
    }

    async updateApplicationStatus(applicationId, status) {
        return this.request(`/applications/${applicationId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }

    // Admin endpoints
    async getAdminDashboard() {
        return this.request('/admin/dashboard');
    }

    async getAdminDashboardCards() {
        return this.request('/admin/dashboard/cards');
    }


    async getAdminInternships() {
        return this.request('/admin/internships');
    }

    async getAdminApplications() {
        return this.request('/admin/applications');
    }

    async getAdminInternshipApplications(internshipId) {
        return this.request(`/admin/internships/${internshipId}/applications`);
    }

    async updateAdminApplicationStatus(applicationId, status, statusNote = null, contactEmail = null) {
        return this.request(`/admin/applications/${applicationId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ 
                status, 
                status_note: statusNote, 
                contact_email: contactEmail 
            })
        });
    }


    // Owner endpoints
    async getOwnerDashboard() {
        return this.request('/owner/dashboard');
    }

    async getAllAdmins() {
        return this.request('/owner/admins');
    }

    async approveAdmin(adminId) {
        return this.request(`/owner/admins/${adminId}/approve`, {
            method: 'PATCH'
        });
    }

    async suspendAdmin(adminId) {
        return this.request(`/owner/admins/${adminId}/suspend`, {
            method: 'PATCH'
        });
    }

    async rejectAdmin(adminId) {
        return this.request(`/owner/admins/${adminId}/reject`, {
            method: 'PATCH'
        });
    }

    async approveInternship(internshipId) {
        return this.request(`/owner/internships/${internshipId}/approve`, {
            method: 'PATCH'
        });
    }

    async rejectInternship(internshipId, reason) {
        return this.request(`/owner/internships/${internshipId}/reject`, {
            method: 'PATCH',
            body: JSON.stringify({ reason })
        });
    }

    async getPendingPosts() {
        return this.request('/owner/pending-posts');
    }

    async createAdmin(data) {
        return this.request('/owner/admins', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async deleteAdmin(adminId) {
        return this.request(`/owner/admins/${adminId}`, {
            method: 'DELETE'
        });
    }

    // Search endpoints
    async searchInternships(query, filters = {}) {
        return this.request('/internships/search', {
            method: 'POST',
            body: JSON.stringify({ query, ...filters })
        });
    }
}

// Create global API instance
const api = new APIClient();

// Enhanced API wrapper for error handling
async function safeAPIRequest(apiCall) {
    try {
        return await apiCall();
    } catch (error) {
        console.error('API call failed:', error.message);
        throw error;
    }
}

// Export for use in other files
window.api = api;
window.safeAPIRequest = safeAPIRequest;
