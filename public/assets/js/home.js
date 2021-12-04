/*=============== GET FROM DATABASE ===============*/
window.onload = function () {
    this.getData();
}

function getData() {
    firebase.database().ref('blogs/').once('value')
    .then(
        function (snapshot) {
        // Get Your Posts
        var posts_div = document.getElementById('posts');
        // Remove All Existing Data In Div Element
        posts.innerHTML = "";
        // Get Data From Firebase
        var data = snapshot.val();
        console.log(data);
        // Pass Data To Posts
        // Data Passed To For Loop To Get One By One
        for (let [key, value] of Object.entries(data)) {
            posts_div.innerHTML =
            // "<br>"+
            // "<div class='steps__card'>" +
            //     "<img src='" + value.imageURL + "' alt='Blog Image'>"+
            //     "<br>" +
            //     "<div class='steps__card-number'>01-11-2021</div>"+
            //     "<h3 class='steps__card-title'>Consectetur adipisicing</h3>"+
            //     "<p class='steps__card-description'>" + value.text +
            //     "</p>" +
            //     "<a href='./blog.html' class='button button--flex'>" +
            //     "Read More" +
            //     "<i class='ri-arrow-right-line button__icon'></i>"+
            //     "</a>"+
            // "</div>";
            `
            <div class="steps__card">
            <img class="img__blog" src="${value.bannerImageURL}">
            <div class="steps__card-number">${value.publishedOn}</div>
            <h3 class="steps__card-title">${value.title}</h3>
                <p class="steps__card-description">
                    ${value.post.substring(0, 200)}
                </p>
                <br>
                <a href="https://royal-diadems.vercel.app/" class="button button--flex">
                Read More
                <i class="ri-arrow-right-line button__icon"></i>
                </a>
            </div>
            `+posts_div.innerHTML;
        }
        }
    )
}