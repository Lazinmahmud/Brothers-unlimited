document.getElementById("homeBtn").addEventListener('click', function(){
  document.getElementById('shorts').style.display = 'flex'
  document.getElementById('shortsRed').style.display = 'none'
  document.getElementById('homeRed').style.display = 'flex'
  document.getElementById('home').style.display = 'none'
  document.querySelector('.nav-btn p').style.color = '#F41404'
  document.querySelector('.shorts-icon p').style.color = '#000'
  document.querySelector('.channel-logo img').style.border = 'none'
  document.querySelector('.channel-logo img').style.outline = 'none'
  document.querySelector('.channel-logo p').style.color = '#000'
  document.querySelector('.channel-page').style.display = 'none'
  document.querySelector('.home-page').style.display = 'block'
  document.querySelector('.header').style.boxShadow = '0 0 5px rgba(0,0,0,0.3)'
})

document.getElementById("shortsBtn").addEventListener('click', function(){
  document.getElementById('shorts').style.display = 'none'
  document.getElementById('shortsRed').style.display = 'flex'
  document.getElementById('homeRed').style.display = 'none'
  document.getElementById('home').style.display = 'flex'
  document.querySelector('.nav-btn p').style.color = '#000'
  document.querySelector('.shorts-icon p').style.color = '#F41404'
  document.querySelector('.channel-logo img').style.border = 'none'
  document.querySelector('.channel-logo img').style.outline = 'none'
  document.querySelector('.channel-logo p').style.color = '#000'
})

document.getElementById("channelBtn").addEventListener('click', function(){
  document.querySelector('.channel-logo img').style.border = '1px dashed #fff'
  document.querySelector('.channel-logo img').style.outline = '2px solid #F41404'
  document.getElementById('homeRed').style.display = 'none'
  document.getElementById('home').style.display = 'flex'
  document.getElementById('shorts').style.display = 'flex'
  document.getElementById('shortsRed').style.display = 'none'
  document.querySelector('.nav-btn p').style.color = '#000'
  document.querySelector('.shorts-icon p').style.color = '#000'
  document.querySelector('.channel-logo p').style.color = '#F41404'
  document.querySelector('.channel-page').style.display = 'block'
  document.querySelector('.home-page').style.display = 'none'
  document.querySelector('.header').style.boxShadow = 'none'
})





// youtube data api
const APIKey = 'AIzaSyAo8Y1n5w-0qNyBWs_NpTZd9YL0y1rRDoU';
   const Userid = 'UCAapwYqO-D5oEeld0cgksug';
    const subscriberCount= document.getElementById('subscriberCount');
    
    const videoCount = document.getElementById('videoCount');

   

    let getdata = () => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${Userid}&key=${APIKey}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        document.getElementById("subscriberCount").innerText = data["items"][0].statistics.subscriberCount;
        document.getElementById("videoCount").innerText = data["items"][0].statistics.videoCount;
        
        let channelLogos = document.getElementsByClassName("channelLogo");
        for (let i = 0; i < channelLogos.length; i++) {
            channelLogos[i].src = data["items"][0].snippet.thumbnails.default.url;
        }
        
        document.getElementById("channelName").innerText = data["items"][0].snippet.title;
        document.getElementById("description").innerText = data["items"][0].snippet.description;
        document.getElementById("url").innerText = data["items"][0].snippet.customUrl;
    })
}

   getdata();
   
   
   
   
// show channel video data 

const videoId = 'vn3GcQy7wAo'; 


function getVideoData() {
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            // Thumbnail
            const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
            document.querySelector('.thumbnail').src = thumbnailUrl;

            // Views
            const views = data.items[0].statistics.viewCount;
            document.querySelector('.views').innerText = `${views} views`;

            // Title
            const title = data.items[0].snippet.title;
            document.querySelector('.video-title').innerText = title;

            // Upload Time
            const uploadTime = new Date(data.items[0].snippet.publishedAt);
            const currentTime = new Date();
            const timeDiff = currentTime - uploadTime;
            const seconds = Math.floor(timeDiff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            let uploadTimeString;
            if (days > 0) {
                uploadTimeString = `${days} days ago`;
            } else if (hours > 0) {
                uploadTimeString = `${hours} hours ago`;
            } else if (minutes > 0) {
                uploadTimeString = `${minutes} minutes ago`;
            } else {
                uploadTimeString = `${seconds} seconds ago`;
            }

            document.querySelector('.upload-time').innerText = uploadTimeString;
        });
}

// Call the function to fetch video data
getVideoData();
