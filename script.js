// Array of class names to be used for images
const classNames = ['img1', 'img2', 'img3', 'img4', 'img5'];

// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate random images
function generateRandomImages() {
    const images = classNames.slice(); // Clone array
    const repeatedImageClass = classNames[Math.floor(Math.random() * classNames.length)];
    images.splice(Math.floor(Math.random() * 6), 0, repeatedImageClass); // Insert repeated image

    shuffle(images); // Shuffle images
    return images;
}

// Function to create and render images
function renderImages() {
    const container = document.getElementById('image-container');
    const images = generateRandomImages();

    container.innerHTML = ''; // Clear previous images

    images.forEach((className, index) => {
        const img = document.createElement('img');
        img.className = className;
        img.src = `https://example.com/images/${className}.png`; // Replace with actual image URLs
        img.alt = 'Verification Image';
        img.dataset.index = index; // Store index for click handling
        container.appendChild(img);
    });
}

// Variables to keep track of state
let selectedImages = [];
let repeatedClassName;

// Event listener for image clicks
document.getElementById('image-container').addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const clickedClassName = event.target.className;
        if (selectedImages.length < 2 && !selectedImages.includes(clickedClassName)) {
            selectedImages.push(clickedClassName);
            event.target.style.borderColor = 'red'; // Indicate selected image
        }

        if (selectedImages.length === 2) {
            document.getElementById('verify').style.display = 'block';
        }
        
        document.getElementById('reset').style.display = 'block';
    }
});

// Event listener for reset button
document.getElementById('reset').addEventListener('click', () => {
    selectedImages = [];
    document.querySelectorAll('img').forEach(img => img.style.borderColor = '#000');
    document.getElementById('verify').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    document.getElementById('para').textContent = '';
});

// Event listener for verify button
document.getElementById('verify').addEventListener('click', () => {
    const allImages = document.querySelectorAll('img');
    const firstSelected = selectedImages[0];
    const secondSelected = selectedImages[1];

    if (firstSelected === secondSelected) {
        document.getElementById('para').textContent = 'You are a human. Congratulations!';
    } else {
        document.getElementById('para').textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    document.getElementById('verify').style.display = 'none';
});

// Initial rendering of images
renderImages();
