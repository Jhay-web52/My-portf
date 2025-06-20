  // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Scroll animations
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(element => {
                observer.observe(element);
            });
        }

        // Smooth scrolling for navigation links
        function setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Mouse trail effect
        function createMouseTrail() {
            let mouseX = 0, mouseY = 0;
            let trailElements = [];

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function createTrailElement() {
                const trail = document.createElement('div');
                trail.style.position = 'fixed';
                trail.style.width = '6px';
                trail.style.height = '6px';
                trail.style.background = '#4ecdc4';
                trail.style.borderRadius = '50%';
                trail.style.pointerEvents = 'none';
                trail.style.zIndex = '1000';
                trail.style.opacity = '0.8';
                trail.style.transition = 'all 0.3s ease';
                
                document.body.appendChild(trail);
                trailElements.push({
                    element: trail,
                    x: mouseX,
                    y: mouseY,
                    life: 1
                });

                if (trailElements.length > 10) {
                    const oldTrail = trailElements.shift();
                    document.body.removeChild(oldTrail.element);
                }
            }

            setInterval(() => {
                trailElements.forEach((trail, index) => {
                    trail.life -= 0.05;
                    trail.element.style.left = trail.x + 'px';
                    trail.element.style.top = trail.y + 'px';
                    trail.element.style.opacity = trail.life;
                    trail.element.style.transform = `scale(${trail.life})`;
                    
                    if (trail.life <= 0) {
                        document.body.removeChild(trail.element);
                        trailElements.splice(index, 1);
                    }
                });
                
                if (Math.random() > 0.7) {
                    createTrailElement();
                }
            }, 50);
        }

        // Dynamic project addition
        function addNewProject() {
            const projectTitle = prompt("Enter project title:");
            const projectDescription = prompt("Enter project description:");
            const githubLink = prompt("Enter GitHub link:");
            const liveLink = prompt("Enter live demo link (optional):");
            
            if (projectTitle && projectDescription && githubLink) {
                const projectsGrid = document.querySelector('.projects-grid');
                const newProject = document.createElement('div');
                newProject.className = 'project-card animate-on-scroll';
                newProject.style.opacity = '0';
                newProject.style.transform = 'translateY(50px) scale(0.9)';
                
                newProject.innerHTML = `
                    <h3 class="project-title">${projectTitle}</h3>
                    <p class="project-description">${projectDescription}</p>
                    <div class="project-tech">
                        <span class="tech-tag">New Project</span>
                        <span class="tech-tag">Custom Build</span>
                    </div>
                    <div class="project-links">
                        <a href="${githubLink}" class="project-link" target="_blank">
                            <span>GitHub</span>
                        </a>
                        ${liveLink ? `<a href="${liveLink}" class="project-link" target="_blank"><span>Live Demo</span></a>` : ''}
                    </div>
                `;
                
                projectsGrid.appendChild(newProject);
                
                // Animate the new project
                setTimeout(() => {
                    newProject.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    newProject.style.opacity = '1';
                    newProject.style.transform = 'translateY(0) scale(1)';
                }, 100);
            }
        }

        // Add floating CTA button
        function createFloatingCTA() {
            const floatingBtn = document.createElement('div');
            floatingBtn.innerHTML = `
                <button onclick="addNewProject()" style="
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
                    transition: all 0.3s ease;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                " onmouseover="this.style.transform='scale(1.1) rotate(90deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'">
                    +
                </button>
            `;
            document.body.appendChild(floatingBtn);
        }

        // Enhanced typing effect for subtitle
        function typeWriterEffect() {
            const subtitle = document.querySelector('.subtitle');
            const originalText = subtitle.textContent;
            const texts = [
                "Frontend Developer • Problem Solver",
                "Creating Digital Experiences That Wow",
                "Turning Ideas Into Interactive Reality",
                "AltSchool Africa Graduate • Tech Enthusiast"
            ];
            
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function type() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    subtitle.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    subtitle.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                if (!isDeleting && charIndex === currentText.length) {
                    setTimeout(() => isDeleting = true, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
                
                const speed = isDeleting ? 50 : 100;
                setTimeout(type, speed);
            }
            
            setTimeout(type, 1000);
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            handleScrollAnimations();
            setupSmoothScrolling();
            createMouseTrail();
            createFloatingCTA();
            typeWriterEffect();
            
            // Add some extra visual flair
            setTimeout(() => {
                document.querySelector('.profile-img').style.animation += ', bounce 2s ease-in-out 3s infinite';
            }, 2000);
        });

        // Performance optimization for animations
        let ticking = false;
        
        function updateAnimations() {
            // Update any frame-based animations here
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        // Add bounce keyframe
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translateY(0);
                }
                40%, 43% {
                    transform: translateY(-10px);
                }
                70% {
                    transform: translateY(-5px);
                }
                90% {
                    transform: translateY(-2px);
                }
            }
        `;
        document.head.appendChild(style);