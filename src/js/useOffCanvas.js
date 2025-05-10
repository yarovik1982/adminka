export const useOffCanvas = (event) => {
    const openButton = document.getElementById('btnOpen');
    const closeButton = document.getElementById('btnClose');
    const offCanvas = document.getElementById('offcanvas');

    openButton.addEventListener('click', () => {
        const backdrop = document.createElement('div');
        backdrop.classList.add('offcanvas-backdrop', 'fade', 'show');
        document.body.appendChild(backdrop);
      //   offCanvas.classList.add('show');
    });

    closeButton.addEventListener('click', () => {
        offCanvas.classList.remove('show');
    });

    if(event.target.classList.contains('closeButton')){
        offCanvas.classList.remove('show');
    }
}