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
const api_key = 'AIzaSyAfjmiTs9n_DNqYaTewZXBUoKxOoXFa9ms';
const channelId = 'UCAapwYqO-D5oEeld0cgksug';
const subscriberCount = document.getElementById('subscriberCount');
const videoCardContainer = document.querySelector('.video-container');
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
const videoCount = document.getElementById('videoCount');

// Function to fetch channel data
let getChannelData = () => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${api_key}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        subscriberCount.innerText = data.items[0].statistics.subscriberCount;
        videoCount.innerText = data.items[0].statistics.videoCount;
        
        let channelLogos = document.getElementsByClassName("channelLogo");
        for (let i = 0; i < channelLogos.length; i++) {
            channelLogos[i].src = data.items[0].snippet.thumbnails.default.url;
        }
        
        document.getElementById("channelName").innerText = data.items[0].snippet.title;
        document.getElementById("description").innerText = data.items[0].snippet.description;
        document.getElementById("url").innerText = data.items[0].snippet.customUrl;
    })
}

// Call the function to fetch channel data
getChannelData();

// Function to fetch and display channel videos
const getChannelVideos = () => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`)
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            makeVideoCard(item);
        })
    })
    .catch(err => console.log(err));
}

// Call the function to fetch channel videos
getChannelVideos();

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video-container">
         <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id.videoId}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <div class="profile-cntainer">
                  <div class="channel-icon">
                  <img class="channelLogo" src="channel-logo.jpg">
                </div> 
                </div>
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                    
                </div>
            </div>
        </div>
    </div>
    `;
}
