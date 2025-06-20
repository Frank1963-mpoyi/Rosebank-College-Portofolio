   
        // Document ready function
        document.addEventListener('DOMContentLoaded', function() {
            // Form validation and submission
            const contactForm = document.getElementById('contact-form');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Form validation function
            function validateForm() {
                let isValid = true;
                
                // Reset errors
                document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
                
                // Validate name
                if (nameInput.value.trim().length < 3) {
                    document.getElementById('name-error').style.display = 'block';
                    isValid = false;
                }
                
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    document.getElementById('email-error').style.display = 'block';
                    isValid = false;
                }
                
                // Validate phone if provided
                if (phoneInput.value.trim() !== '') {
                    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
                    if (!phoneRegex.test(phoneInput.value)) {
                        document.getElementById('phone-error').style.display = 'block';
                        isValid = false;
                    }
                }
                
                // Validate subject
                if (subjectInput.value === '') {
                    document.getElementById('subject-error').style.display = 'block';
                    isValid = false;
                }
                
                // Validate message
                if (messageInput.value.trim().length < 10) {
                    document.getElementById('message-error').style.display = 'block';
                    isValid = false;
                }
                
                return isValid;
            }
            
            // Form submit event
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    // In a real application, we would submit the form to the server
                    // For this demo, we'll simulate a successful submission
                    
                    // Show success modal
                    document.getElementById('success-modal').classList.add('show');
                    
                    // Reset form after successful submission
                    setTimeout(() => {
                        contactForm.reset();
                    }, 1000);
                }
            });
            
            // Close modal
            document.querySelector('.modal-close').addEventListener('click', function() {
                document.getElementById('success-modal').classList.remove('show');
            });
            
            document.getElementById('modal-close-btn').addEventListener('click', function() {
                document.getElementById('success-modal').classList.remove('show');
            });
            
            // Close modal when clicking outside the content
            document.getElementById('success-modal').addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('show');
                }
            });
            
            // Update live timestamp
            function updateTimestamp() {
                const now = new Date();
                const dateStr = now.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                const timeStr = now.toLocaleTimeString('en-US');
                
                document.getElementById('current-date').textContent = `Current Date: ${dateStr}`;
                document.getElementById('live-timestamp').textContent = ` | Live Timestamp: ${timeStr}`;
            }
            
            // Initial update
            updateTimestamp();
            
            // Update every second
            setInterval(updateTimestamp, 1000);
        });
    