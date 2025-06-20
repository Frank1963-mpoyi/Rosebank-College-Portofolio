  
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
            
            // FAQ accordion
            $('.faq-question').click(function() {
                // Toggle current FAQ
                $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
                $(this).next('.faq-answer').toggleClass('show');
                
                // Close other FAQs
                $('.faq-item').not($(this).parent()).find('.faq-answer').removeClass('show');
                $('.faq-item').not($(this).parent()).find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            });
            
            // Add to cart functionality
            $('.add-to-cart').click(function() {
                const product = $(this).closest('.feature-card, .service-item').find('h3').text();
                const price = $(this).closest('.feature-card, .service-item').find('.price').text() || 
                              $(this).closest('.feature-card').find('.price-tag').text();
                
                // Show notification
                const notification = $(`
                    <div class="cart-notification" style="position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px 25px; border-radius: 5px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 1000; animation: slideIn 0.3s ease;">
                        <i class="fas fa-check-circle"></i> Added ${product} to cart
                    </div>
                `);
                
                $('body').append(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.animate({opacity: 0}, 300, function() {
                        $(this).remove();
                    });
                }, 3000);
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
    