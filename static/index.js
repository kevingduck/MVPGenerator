document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('signup-modal');
    const btn = document.getElementById('cta-button');
    const closeBtn = document.querySelector('.close');
  
    // When the user clicks the button, open the modal
    btn.onclick = () => {
      modal.style.display = 'block';
    };
  
    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  });
  