/*=============== POST CHOSEN IMAGE ===============*/
// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             $('#banner-upload')
//                 .attr('src', e.target.result)
//                 .width(150)
//                 .height(200);
//         };

//         reader.readAsDataURL(input.files[0]);
//     }
// }
/*=============== POST TO DATABASE ===============*/
function upload() {
        // Get Image
        var bannerImage = document.getElementById('banner-upload').files[0];
        // Get Blog Title
        var title = document.getElementById('title').value;
        // Get Blog Text
        var post = document.getElementById('post').value; // post == article
        // var postField = document.querySelector('.post');
        // // Banner Image
        // var bannerImage = document.getElementById('banner-upload').value;
        // var banner = document.querySelector('.banner').value;
        // let bannerPath;
        // // Upload Image Button
        // var uploadInput = document.getElementById('image-upload');
        // Get Image Name
        var bannerImageName = bannerImage.name;
        // Firebase Storage Reference. Path Where Image Will Be Stored
        var storageRef = firebase.storage().ref('images/*' + bannerImageName);
        // Upload Image To Selected Storage Reference
        var uploadTask = storageRef.put(bannerImage);
        // Date
        var date = new Date();
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // Unique ID
        var id = date.getTime();

        // bannerImage.addEventListener('change', () => {
        //     uploadImage(bannerImage, "banner");
        // })

        // uploadInput.addEventListener('change', () => {
        //     uploadImage(uploadInput, "image");
        // })

        // const uploadImage = (uploadFile, uploadType) => {
        //     const [file] = uploadFile.files;
        //     console.log("Added Image")
        //     if (file && file.type.includes("image")) {
        //         const formData = new FormData();
        //         formData.append('image', file);

        //         fetch('/upload', {
        //             method: 'post',
        //             body: formData
        //         })
        //         .then(res > res.json())
        //         .then(data => {
        //             if (uploadType == "image") {
        //                 addImage(data, file.name);
        //             } else {
        //                 bannerPath = `${location.origin}/${data}`;
        //                 banner.style.backgroundImage = `url("${bannerPath}")`;
        //             }
        //         })
        //     } else {
        //         alert("Upload an Image Only");
        //     }
        // }

        // const addImage = (imagePath, alt) => {
        //     let curPos = postField.selectionStart;
        //     let textToInsert = `\r![${alt}](${imagepath})\r`;
        //     postField.value = postField.value.slice(0, curPos) + textToInsert + postField.value.slice(curPos);
        // }

        // Get The State Of Image Uploading
        uploadTask.on('state_changed', function (snapshot) {
            // Get Task Progress
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + progress + " done");
            // alert("upload is " + progress + " done");
        }, function (error) {
            // Handle Error
            console.log(error.message);
        }, function () {
            // Handle Successful. Uploads.
            uploadTask.snapshot.ref.getDownloadURL().then(
                function (downloadURL) {
                    // Get Image Download And Upload It To Database
                    // Push Used For Unique Upload Identity
                    firebase.database().ref('blogs/').push().set({
                        id: id,
                        title: title,
                        // post: postField.value,
                        post: post,
                        bannerImageURL: downloadURL,
                        // bannerImage: bannerPath,
                        publishedOn: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                    }, function (error) {
                        if (error) {
                            alert("Error while uploading");
                        } else {
                            alert("Successfully uploaded");
                            // Form Reset
                            document.getElementById('post-form').reset();
                            getData();
                        }
                    })
                    // .then(() => {
                    //     location.href = `/${id}`;
                    // }).catch((err) => {
                    //     console.error(err)
                    // })
                }
            );
        });
    }

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
            //     "<img src='" + value.bannerImageURL + "' alt='Blog Image'>"+
            //     "<br>" +
            //     "<div class='steps__card-number'>" + value.publishedOn +
            //     "</div>"+
            //     "<h3 class='steps__card-title'>" + value.title +
            //     "</h3>"+
            //     "<p class='steps__card-description'>" + value.post +
            //     "</p>" +
            //     "<a href='./blog.html' class='button button--flex'>" +
            //     "Read More" +
            //     "<i class='ri-arrow-right-line button__icon'></i>"+
            //     "</a>"+
            // "</div>";
            `
            <div class="steps__card">
            <div class="steps__card-number">${value.publishedOn}</div>
            <h3 class="steps__card-title">${value.title}</h3>
            <img class="img__blog" src="${value.bannerImageURL}">
                <p class="steps__card-description">
                    ${value.post.substring(0, 100)}
                </p>
                <br>
                <a href="./blog.html" class="button button--flex">
                Read More
                <i class="ri-arrow-right-line button__icon"></i>
                </a>
                <pre>       </pre>
                <button class="btn btn-delete" id="${key}" onclick="delete_post(this.id)">Delete</button>
                <button class="btn btn-update" id="${key}" onclick="update_post(this.id)" hidden>Update</button>
            </div>
            `+posts_div.innerHTML;
        }
        }
    )
}

function delete_post(key) {
    firebase.database().ref('blogs/'+key).remove();
    getData();
}

// function update_post(key) {
//     firebase.database().ref('blogs/'+key).update({'title': value.title});
//     getData();
// }