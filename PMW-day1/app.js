document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cursor Glow Halo
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // Shrink/grow cursor glow on hover of interactive elements
  const interactives = document.querySelectorAll('a, button, .skill-card, .project-card, .form-control');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.style.width = '150px';
      cursorGlow.style.height = '150px';
      cursorGlow.style.background = 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
      cursorGlow.style.width = '300px';
      cursorGlow.style.height = '300px';
      cursorGlow.style.background = 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)';
    });
  });

  // 2. Animate Skill Bars when scrolled into view
  const skillCards = document.querySelectorAll('.skill-card');
  const skillBars = document.querySelectorAll('.skill-bar');

  const fillSkills = () => {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percent');
      bar.style.width = `${percentage}%`;
    });
  };

  const skillsSection = document.querySelector('#skills');
  const observerOptions = {
    root: null,
    threshold: 0.25,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fillSkills();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // 3. Simple Form submission handler (Mock API response)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-btn');
      const originalText = submitBtn.textContent;
      
      // Update button state to loading
      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        // Success state
        submitBtn.textContent = 'Message Sent Successfully! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Emerald Green
        
        contactForm.reset();

        setTimeout(() => {
          // Reset button back to original state
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
        }, 3000);
      }, 1500);
    });
  }

  // 4. Subtle parallax card tilt effect on hover for projects
  const cards = document.querySelectorAll('.project-card, .visual-box');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      
      // Calculate rotation strength (max 5 degrees)
      const rotateX = -(y / (rect.height / 2)) * 5;
      const rotateY = (x / (rect.width / 2)) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
});
