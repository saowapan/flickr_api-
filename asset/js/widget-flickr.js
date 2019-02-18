/* Author: Saowapan Kongpia */

var html;
// preSearch (allow unsafe images)
document.getElementById("search").value = 'cat';
scriptFetch();

document.getElementById("search")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

function scriptFetch() {
    var flickerAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=all&tags=' + document.getElementById("search").value;
    var script = document.createElement('script');
    script.src = flickerAPI;
    document.querySelector('head').appendChild(script); 
}

function jsonFlickrFeed(data) {
    var image, title, author, description, tags, link, author_id, profile_url = '';
    html = '';
    data.items.forEach(function (element) {
        image = element.media.m;
        title = element.title;
        author = element.author;
        author_id = element.author_id;
        description = element.description;
        tags = element.tags;
        link = element.link;
        profile_url = 'https:\/\/www.flickr.com\/photos\/' + author_id;


        html += '<div class="gallery">';
        html +=     '<img src="'+ image + '" alt="'+ title + '" class="lazy" />';
        html +=     '<div class="detail">';
        html +=         '<span class="title">'+ '<a target="_blank" href="'+ link+ '">' + title + '</a>' + '</span> by ';
        html +=         '<span class="author">' + '<a target="_blank" href="'+ profile_url + '">' + author + '</a>' + '</span>';
        html +=     '</div>';
        //html +=   '<div class="desc">'+ description + '</div>'; 
        if(tags !== '') 
            html +=     '<div class="tags"> Tags: '+ tags + '</div>';
        html += '</div>';
    });

    document.getElementById("flickrWidget").innerHTML = html;
}