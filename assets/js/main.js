
// Document ready function
$(document).ready(function() {
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = this.hash;
        const $target = $(target);
        
        $('html, body').animate({
            'scrollTop': $target.offset().top - 80
        }, 800, 'swing');
    });
    
    // Accordion functionality
    $('.accordion-header').click(function() {
        // Toggle current accordion
        $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
        $(this).next('.accordion-content').toggleClass('show');
        
        // Close other accordions
        $('.accordion-item').not($(this).parent()).find('.accordion-content').removeClass('show');
        $('.accordion-item').not($(this).parent()).find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    });
    
    // Tab functionality
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        
        // Update active tab button
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Show active tab content
        $('.tab-pane').removeClass('active');
        $(`#${tabId}`).addClass('active');
    });
    
    // Gallery lightbox functionality
    $('.gallery-item').click(function() {
        const imgSrc = $(this).find('img').attr('src');
        const imgAlt = $(this).find('img').attr('alt');
        
        $('.lightbox img').attr('src', imgSrc).attr('alt', imgAlt);
        $('.lightbox').addClass('show');
    });
    
    // Close lightbox
    $('.lightbox-close').click(function() {
        $('.lightbox').removeClass('show');
    });
    
    // Close lightbox when clicking outside the image
    $('.lightbox').click(function(e) {
        if (e.target === this) {
            $(this).removeClass('show');
        }
    });
    
    // Close modal
    $('.modal-close, #modal-close-btn').click(function() {
        $('#success-modal').removeClass('show');
    });
    
    // Form validation
    $('#enquiry-form').submit(function(e) {
        e.preventDefault();
        let valid = true;
        
        // Reset errors
        $('.error').hide();
        
        // Validate name
        const name = $('#name').val().trim();
        if (name === '') {
            $('#name-error').show();
            valid = false;
        }
        
        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            $('#email-error').show();
            valid = false;
        }
        
        // Validate service
        if ($('#service').val() === '') {
            $('#service-error').show();
            valid = false;
        }
        
        // Validate message
        const message = $('#message').val().trim();
        if (message === '') {
            $('#message-error').show();
            valid = false;
        }
        
        // Validate phone if provided
        const phone = $('#phone').val().trim();
        if (phone !== '') {
            const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
            if (!phoneRegex.test(phone)) {
                $('#phone-error').show();
                valid = false;
            }
        }
        
        // If form is valid, show success modal
        if (valid) {
            $('#success-modal').addClass('show');
            // In a real application, you would submit the form data to a server here
            // For demo purposes, we just show the success modal
            // Reset form after successful submission
            setTimeout(() => {
                $('#enquiry-form')[0].reset();
            }, 1000);
        }
    });
    
    // Search functionality
    $('.search-btn').click(function() {
        const searchTerm = $('.search-input').val().toLowerCase();
        if (searchTerm.trim() === '') {
            $('.result-item').show();
            return;
        }
        
        $('.result-item').each(function() {
            const text = $(this).text().toLowerCase();
            if (text.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    

      // Product filtering
            $('.filter-btn').click(function() {
                const filter = $(this).data('filter');
                
                // Update active filter button
                $('.filter-btn').removeClass('active');
                $(this).addClass('active');
                
                // Filter products
                if (filter === 'all') {
                    $('.feature-card').show();
                } else {
                    $('.feature-card').each(function() {
                        if ($(this).data('category') === filter) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
            });
            
            // Service tabs functionality
            $('.service-tab-btn').click(function() {
                const tabId = $(this).data('tab');
                
                // Update active tab button
                $('.service-tab-btn').removeClass('active');
                $(this).addClass('active');
                
                // Show active tab content
                $('.service-tab-pane').removeClass('active');
                $(`#${tabId}`).addClass('active');
            });
            


    // Live search as user types
    $('.search-input').on('input', function() {
        $('.search-btn').click();
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
        
        $('#current-date').text(`Current Date: ${dateStr}`);
        $('#live-timestamp').text(` | Live Timestamp: ${timeStr}`);
    }
    
    // Initial update
    updateTimestamp();
    
    // Update every second
    setInterval(updateTimestamp, 1000);
});
