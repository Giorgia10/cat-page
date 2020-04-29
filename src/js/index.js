function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '78548d1d-d031-4322-95c7-877bd83d7a10',
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let thumbnailContainer = document.getElementById("thumbnail-container");
            updatePreview(data[0].url);
            data.forEach(element => {
                let thumbnail = document.createElement('figure');
                thumbnail.onclick = function () {
                    updatePreview(element.url);
                }

                let img = document.createElement('img');
                img.src = element.url;
                thumbnail.appendChild(img); // output: <div><img /></div>
                thumbnailContainer.appendChild(thumbnail);
            });
            console.log(data);
        });
});

function updatePreview (imgUrl){
    let imgPreview = document.getElementById("img-preview");
    imgPreview.src = imgUrl;
}