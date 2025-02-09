document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality
    const infoBtn = document.getElementById('infoBtn');
    const menuBtn = document.getElementById('menuBtn');
    const infoDropdown = document.getElementById('infoDropdown');
    const menuDropdown = document.getElementById('menuDropdown');

    infoBtn.addEventListener('click', () => {
        infoDropdown.classList.toggle('show');
        menuDropdown.classList.remove('show');
    });

    menuBtn.addEventListener('click', () => {
        menuDropdown.classList.toggle('show');
        infoDropdown.classList.remove('show');
    });

    // Close dropdowns when clicking outside
    window.addEventListener('click', (e) => {
        if (!e.target.matches('#infoBtn') && !e.target.matches('#menuBtn')) {
            infoDropdown.classList.remove('show');
            menuDropdown.classList.remove('show');
        }
    });

    // File upload functionality
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadedVideo = document.getElementById('uploadedVideo');
    const uploadContainer = document.getElementById('upload-container');

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            uploadedVideo.src = url;
            uploadedVideo.style.display = 'block';
            uploadBtn.style.display = 'none';
            uploadedVideo.play();
        }
    });

    /* Backend Integration Guide:
    
    1. Camera Setup Options:
    
    // For URL-based stream:
    function setupStreamUrl(videoElement, url) {
        videoElement.src = url;
        // or
        videoElement.innerHTML = `<source src="${url}" type="video/mp4">`;
    }
    
    // For IP camera:
    function setupIPCamera(videoElement, streamUrl) {
        // Replace with your IP camera stream URL
        videoElement.src = streamUrl;
    }
    
    2. Prediction Updates:
    
    // Example of updating predictions:
    function updatePrediction(id, text) {
        document.getElementById(id).textContent = text;
    }
    
    // Usage:
    updatePrediction('prediction1', 'Person detected');
    
    3. Current dummy camera setup - replace with your implementation: */
    
    function setupDummyCamera(videoElement) {
        // Replace this with your actual camera feed implementation
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoElement.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing camera:", err);
                videoElement.parentElement.innerHTML = "Camera feed unavailable";
            });
    }

    // Setup camera feeds - modify these calls with your actual video sources
    const camera1 = document.getElementById('camera1');
    const camera2 = document.getElementById('camera2');
    
    setupDummyCamera(camera1);
    setupDummyCamera(camera2);

    /* For the output video processing:
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Add your video processing logic here
            // Example:
            const formData = new FormData();
            formData.append('video', file);
            
            // Send to your processing server
            fetch('/process-video', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle processed video
                uploadedVideo.src = data.processedVideoUrl;
                updatePrediction('prediction3', data.prediction);
            });
        }
    }); */
});
