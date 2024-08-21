let posts = JSON.parse(localStorage.getItem("posts")) || [];

function addPost() {
    const postContent = document.getElementById("newPost").value;
    const postName = document.getElementById("postName").value;
    const postPhoto = document.getElementById("postPhoto").files[0];
    const postCategory = document.getElementById("postCategory").value;
    const postDate = new Date().toLocaleDateString();

    if (postContent && postName && postCategory) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const post = {
                content: postContent,
                name: postName,
                photo: event.target.result,
                date: postDate,
                category: postCategory,
                tags: [],
                comments: [],
            };
            posts.push(post);
            localStorage.setItem("posts", JSON.stringify(posts));
            document.getElementById("newPost").value = "";
            document.getElementById("postName").value = "";
            document.getElementById("postPhoto").value = "";
            document.getElementById("postCategory").value = "";
            renderPosts();
            updateCategoryCounts();
        };
        reader.readAsDataURL(postPhoto);
    } else {
        alert("Please fill in all fields.");
    }
}

function renderComments(comments, postIndex, showAll) {
    const commentsToShow = showAll ? comments : comments.slice(0, 2);
    return commentsToShow.map((comment, index) => `
                <div class="comment">
                    <div class="user-info">
                        <img src="${comment.photo}" alt="${comment.name}'s photo">
                        <strong>${comment.name}</strong> <em>${comment.date}</em>
                    </div>
                    <p>${comment.content}</p>
                    <button class="delete-button" onclick="deleteComment(${postIndex}, ${index})">Delete Comment</button>
                </div>
            `).join("");
}

function renderPosts(filterPostsArray = posts) {
    const postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = "";

    if (filterPostsArray.length === 0) {
        postContainer.innerHTML = "<p>No posts available for this category.</p>";
    } else {
        filterPostsArray.forEach((post, index) => {
            const postDiv = document.createElement("div");
            postDiv.innerHTML = `
                        <div class="post">
                            <div class="user-info">
                                <img src="${post.photo}" alt="${post.name}'s photo">
                                <strong>${post.name}</strong> <em>${post.date}</em>
                            </div>
                            <p>${post.content}</p>
                            <button class="delete-button" onclick="deletePost(${index})">Delete Post</button>
                            <div class="comments">
                                <h4>${post.comments.length} Comment${post.comments.length !== 1 ? 's' : ''} on this post</h4>
                                ${renderComments(post.comments, index, post.comments.length <= 2)}
                                ${post.comments.length > 2 ? `<button onclick="toggleComments(${index})" id="toggle-btn-${index}">View All Comments</button>` : ''}
                                <div class="comment-form">
                                    <input type="text" id="commenter-name-${index}" placeholder="Your Name" required>
                                    <input type="text" id="commenter-photo-${index}" placeholder="Photo URL" required>
                                    <textarea id="comment-text-${index}" placeholder="Your Comment" required></textarea>
                                    <button onclick="addComment(${index})">Submit Comment</button>
                                </div>
                            </div>
                        </div>
                    `;
            postContainer.appendChild(postDiv);
        });
    }
}

function toggleComments(postIndex) {
    const post = posts[postIndex];
    const commentsDiv = document.querySelector(`#postContainer .post:nth-child(${postIndex + 1}) .comments`);
    const toggleButton = document.getElementById(`toggle-btn-${postIndex}`);

    const isShowingAll = toggleButton.innerText === "View All Comments";
    commentsDiv.innerHTML = `
                <h4>${post.comments.length} Comment${post.comments.length !== 1 ? 's' : ''} on this post</h4>
                ${renderComments(post.comments, postIndex, isShowingAll)}
                <button onclick="toggleComments(${postIndex})" id="toggle-btn-${postIndex}">${isShowingAll ? 'View Less Comments' : 'View All Comments'}</button>
                <div class="comment-form">
                    <input type="text" id="commenter-name-${postIndex}" placeholder="Your Name" required>
                    <input type="text" id="commenter-photo-${postIndex}" placeholder="Photo URL" required>
                    <textarea id="comment-text-${postIndex}" placeholder="Your Comment" required></textarea>
                    <button onclick="addComment(${postIndex})">Submit Comment</button>
                </div>
            `;
}

function addComment(postIndex) {
    const name = document.getElementById(`commenter-name-${postIndex}`).value;
    const photo = document.getElementById(`commenter-photo-${postIndex}`).value;
    const content = document.getElementById(`comment-text-${postIndex}`).value;
    const date = new Date().toLocaleDateString();

    if (name && photo && content) {
        posts[postIndex].comments.push({ name, photo, date, content });
        localStorage.setItem("posts", JSON.stringify(posts)); // Save to localStorage
        renderPosts(); // Re-render posts to reflect changes
    } else {
        alert("Please fill in all fields.");
    }
}

function deleteComment(postIndex, commentIndex) {
    posts[postIndex].comments.splice(commentIndex, 1);
    localStorage.setItem("posts", JSON.stringify(posts)); // Update local storage
    renderPosts(); // Re-render posts to reflect changes
}

function deletePost(postIndex) {
    posts.splice(postIndex, 1);
    localStorage.setItem("posts", JSON.stringify(posts)); // Update local storage
    renderPosts(); // Re-render posts to reflect changes
}

function updateCategoryCounts() {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = ""; // Clear existing categories

    const categories = [
        "Coding Boot-camp",
        "Admission",
        "Summer Holiday Coaching",
    ];

    categories.forEach((category) => {
        const count = posts.filter((post) => post.category === category).length;
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category-item";
        categoryDiv.onclick = () => filterPosts(category);
        categoryDiv.innerHTML = `
                    <img src="${category.toLowerCase().replace(/ /g, '-')}.png" alt="${category}" />
                    ${category} (${count})
                `;
        categoryList.appendChild(categoryDiv);
    });
}

function filterPosts(category) {
    const filteredPosts = category
        ? posts.filter((post) => post.category === category)
        : posts;
    renderPosts(filteredPosts);
}

function searchPosts() {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredPosts = posts.filter(
        (post) =>
            post.content.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query) ||
            (post.tags &&
                post.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
    renderPosts(filteredPosts.length > 0 ? filteredPosts : []);
}

window.onload = function () {
    renderPosts();
    updateCategoryCounts(); // Initialize category counts on load
};