   
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
            
            // Animate statistics counters
            function animateStats() {
                $('.stat-number').each(function() {
                    const $this = $(this);
                    const countTo = $this.attr('data-count');
                    
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
                });
            }
            
            // Initialize stats animation when in viewport
            function initStatsAnimation() {
                const statsSection = $('.stats-section');
                const statsSectionTop = statsSection.offset().top;
                const windowHeight = $(window).height();
                const scrollTop = $(window).scrollTop();
                
                if (scrollTop + windowHeight > statsSectionTop + 100) {
                    animateStats();
                    $(window).off('scroll', initStatsAnimation);
                }
            }
            
            // Check if stats are in viewport on scroll
            $(window).on('scroll', initStatsAnimation);
            initStatsAnimation(); // Check on page load
        });
    