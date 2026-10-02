document.addEventListener("DOMContentLoaded", () => {
    const btnDarkMode = document.getElementById("btn-dark-mode");
    const body = document.body;

    btnDarkMode.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            btnDarkMode.textContent = "☀️";
        } else {
            btnDarkMode.textContent = "🌙";
        }
    });

    const btnPostar = document.getElementById("btn-postar");
    const postInput = document.getElementById("post-input");
    const feed = document.getElementById("feed");

    btnPostar.addEventListener("click", () => {
        const texto = postInput.value.trim();
        if (texto !== "") {
            const newPost = document.createElement("div");
            newPost.classList.add("profile", "post");
            
            newPost.innerHTML = `
                <div class="post-header">
                    <img alt="Perfil" src="images.png" class="avatar">
                    <strong>Usuário Anônimo</strong>
                </div>
                <p>${texto}</p>
                <div class="post-actions">
                    <button class="btn-like">🤍 Curtir <span class="like-count">0</span></button>
                </div>
            `;
            
            feed.insertBefore(newPost, feed.firstChild);
            postInput.value = "";
        }
    });

    feed.addEventListener("click", (e) => {
        const likeBtn = e.target.closest(".btn-like");
        if (likeBtn) {
            likeBtn.classList.toggle("liked");
            const countSpan = likeBtn.querySelector(".like-count");
            let count = parseInt(countSpan.textContent);
            
            if (likeBtn.classList.contains("liked")) {
                likeBtn.innerHTML = `❤️ Curtir <span class="like-count">${count + 1}</span>`;
            } else {
                likeBtn.innerHTML = `🤍 Curtir <span class="like-count">${count - 1}</span>`;
            }
        }
    });
});