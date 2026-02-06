// ==================== DASHBOARD JAVASCRIPT ==================== 

document.addEventListener('DOMContentLoaded', function() {
    // Get user info from PHP and display
    getUserInfo();
    setupEventListeners();
});

// Function to fetch and display user information
function getUserInfo() {
    // This would be called via AJAX to get user data from PHP
    const userData = {
        name: localStorage.getItem('userName') || 'User',
        email: localStorage.getItem('userEmail') || 'user@example.com'
    };

    document.getElementById('userName').textContent = `Welcome, ${userData.name}`;
    document.getElementById('userGreeting').textContent = `Hello, ${userData.name}! 👋`;
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // Apply button click handlers
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
            showApplyModal(jobTitle);
        });
    });

    // Save button (bookmark) handlers
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.color = this.style.color === 'rgb(220, 20, 60)' ? '#ccc' : 'var(--primary-red)';
            const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
            console.log('Saved:', jobTitle);
        });
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Modal for job application
function showApplyModal(jobTitle) {
    alert(`Successfully applied for: ${jobTitle}\n\nThank you for your interest!`);
    // In a real application, this would show a proper modal with form
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'logout.php';
    }
}

// Format date display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Update stats (can be called periodically from server)
function updateStats(stats) {
    // stats = { applications: 5, savedJobs: 12, jobMatches: 8, profileStrength: 85 }
    document.querySelector('.stat-number').textContent = stats.applications || '5';
}

// Toast notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#4CAF50' : '#F44336'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
