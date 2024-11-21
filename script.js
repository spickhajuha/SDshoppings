document.addEventListener('DOMContentLoaded', () => {
  const videoUploadForm = document.getElementById('videoUploadForm');
  const videoGallery = document.getElementById('videoGallery');

  // Handle video upload form submission
  videoUploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get input values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const videoFile = document.getElementById('video').files[0];

    if (!videoFile) {
      alert('Please select a video file.');
      return;
    }

    // Create a FileReader to read the video file
    const reader = new FileReader();
    reader.onload = function (e) {
      // Create a new video card
      const videoCard = document.createElement('div');
      videoCard.className = 'video-card';
      videoCard.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <video controls width="400">
          <source src="${e.target.result}" type="${videoFile.type}">
          Your browser does not support the video tag.
        </video>

        <div class="comment-section">
          <h3>Comments</h3>
          <input
            type="text"
            class="comment-input"
            placeholder="Add a comment"
          />
          <button class="comment-button">Post Comment</button>
          <ul class="comment-list"></ul>
        </div>
      `;
      videoGallery.appendChild(videoCard);

      // Add functionality to the comment button
      const commentButton = videoCard.querySelector('.comment-button');
      const commentInput = videoCard.querySelector('.comment-input');
      const commentList = videoCard.querySelector('.comment-list');

      commentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
          // Add the comment to the list
          const commentItem = document.createElement('li');
          commentItem.className = 'comment-item';
          commentItem.textContent = commentText;
          commentList.appendChild(commentItem);

          // Clear the input
          commentInput.value = '';
        }
      });

      // Clear the form
      videoUploadForm.reset();
    };

    // Read the video file as a data URL
    reader.readAsDataURL(videoFile);
  });
});