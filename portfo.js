
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        html.classList.add(savedTheme);
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const theme = html.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });

        // Mobile menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            });
        });

        // Contact form submit -> EmailJS
        const form = document.getElementById('contact-form');
        const status = document.getElementById('form-status');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Build template params
            const templateParams = {
                from_name: form.from_name.value || form.querySelector('#name').value,
                from_email: form.from_email.value || form.querySelector('#email').value,
                subject: form.subject.value || form.querySelector('#subject').value,
                message: form.message.value || form.querySelector('#message').value,
                // you can include to_email if your EmailJS template uses it:
                to_email: 'patil09091997@gmail.com'
            };

            // Validate EmailJS IDs are set
            if (!window.EMAILJS_USER_ID || !window.EMAILJS_SERVICE_ID || !window.EMAILJS_TEMPLATE_ID || window.EMAILJS_USER_ID === 'YOUR_EMAILJS_USER_ID') {
                status.textContent = 'Contact form not configured: replace EmailJS IDs in the HTML with your EmailJS keys.';
                status.style.color = '#f59e0b'; // amber-400
                return;
            }

            status.textContent = 'Sending message…';
            emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, templateParams)
                .then(function (response) {
                    status.textContent = 'Message sent — I will get back to you soon. Thank you!';
                    status.style.color = '#10b981'; // green
                    form.reset();
                }, function (error) {
                    console.error('EmailJS error:', error);
                    status.textContent = 'Error sending message. Try again later or contact me directly at patil09091997@gmail.com';
                    status.style.color = '#ef4444'; // red
                });
        });

        // Animate on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        document.querySelectorAll('.animate-fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.animation = 'fadeIn 0.5s ease-in-out forwards';
        });
        document.querySelectorAll('.animate-slide-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.animation = 'slideUp 0.5s ease-out forwards';
        });
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
    