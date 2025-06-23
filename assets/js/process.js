// Process Steps Interaction

document.addEventListener('DOMContentLoaded', () => {
  initProcessSteps();
});

function initProcessSteps() {
  const processSteps = document.querySelectorAll('.process-step');
  if (!processSteps.length) return;
  
  // Highlight steps on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: 0.6
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all steps
        processSteps.forEach(step => step.classList.remove('active'));
        
        // Add active class to current step
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  // Observe each process step
  processSteps.forEach(step => {
    observer.observe(step);
  });
  
  // Make steps interactive on click
  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      // Remove active class from all steps
      processSteps.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked step
      step.classList.add('active');
      
      // Smooth scroll to the step
      step.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    });
  });
  
  // Add hover effects
  processSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      if (!step.classList.contains('active')) {
        step.style.opacity = '0.8';
      }
    });
    
    step.addEventListener('mouseleave', () => {
      if (!step.classList.contains('active')) {
        step.style.opacity = '0.6';
      }
    });
  });
  
  // Add step number hover effect
  const stepNumbers = document.querySelectorAll('.step-number');
  stepNumbers.forEach(number => {
    number.addEventListener('mouseenter', () => {
      number.style.transform = 'scale(1.1)';
    });
    
    number.addEventListener('mouseleave', () => {
      number.style.transform = 'scale(1)';
    });
  });
  
  // Animate the process line when scrolled into view
  const processLine = document.querySelector('.process-line');
  if (processLine) {
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          processLine.style.height = '100%';
          processLine.style.transition = 'height 1.5s ease-out';
          lineObserver.unobserve(processLine);
        }
      });
    }, { threshold: 0.2 });
    
    lineObserver.observe(processLine);
  }
}