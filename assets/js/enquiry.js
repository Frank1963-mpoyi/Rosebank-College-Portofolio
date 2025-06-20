   
        // Set current date in timestamp
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
        
        // Form validation
        $(document).ready(function() {
            $('#enquiryForm').on('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Reset errors
                $('.error').hide();
                $('.form-control').removeClass('error-border');
                
                // Validate name
                const name = $('#name').val().trim();
                if (name === '') {
                    $('#name-error').show();
                    $('#name').addClass('error-border');
                    isValid = false;
                } else {
                    $('#name').removeClass('error-border');
                }
                
                // Validate email
                const email = $('#email').val().trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email === '' || !emailRegex.test(email)) {
                    $('#email-error').show();
                    $('#email').addClass('error-border');
                    isValid = false;
                } else {
                    $('#email').removeClass('error-border');
                }
                
                // Validate phone (if provided)
                const phone = $('#phone').val().trim();
                if (phone !== '') {
                    const phoneRegex = /^[0-9\-\+\s\(\)]{7,20}$/;
                    if (!phoneRegex.test(phone)) {
                        $('#phone-error').show();
                        $('#phone').addClass('error-border');
                        isValid = false;
                    } else {
                        $('#phone').removeClass('error-border');
                    }
                }
                
                // Validate project type
                const projectType = $('#projectType').val();
                if (projectType === '') {
                    $('#projectType-error').show();
                    $('#projectType').addClass('error-border');
                    isValid = false;
                } else {
                    $('#projectType').removeClass('error-border');
                }
                
                // Validate budget
                const budget = $('#budget').val();
                if (budget === '') {
                    $('#budget-error').show();
                    $('#budget').addClass('error-border');
                    isValid = false;
                } else {
                    $('#budget').removeClass('error-border');
                }
                
                // Validate message
                const message = $('#message').val().trim();
                if (message === '') {
                    $('#message-error').show();
                    $('#message').addClass('error-border');
                    isValid = false;
                } else {
                    $('#message').removeClass('error-border');
                }
                
                // If valid, show success message
                if (isValid) {
                    // Show submission time
                    const submissionTime = new Date();
                    document.getElementById('submissionTime').textContent = 
                        submissionTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' on ' +
                        submissionTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    
                    // Show success message
                    $('#successMessage').slideDown();
                    
                    // Scroll to success message
                    $('html, body').animate({
                        scrollTop: $('#successMessage').offset().top - 100
                    }, 500);
                    
                    // Reset form after 5 seconds
                    setTimeout(function() {
                        $('#enquiryForm')[0].reset();
                        $('#successMessage').slideUp();
                    }, 10000);
                }
            });
            
            // Add error-border class when inputs are invalid
            $('.form-control').on('blur', function() {
                const $this = $(this);
                if ($this.val().trim() === '' && $this.attr('required') !== undefined) {
                    $this.addClass('error-border');
                } else {
                    $this.removeClass('error-border');
                }
            });
            
            // Reset success message when form is edited
            $('#enquiryForm input, #enquiryForm textarea, #enquiryForm select').on('input change', function() {
                $('#successMessage').slideUp();
                $(this).removeClass('error-border');
            });
        });
    