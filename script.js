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
        subscriberCount.innerHTML = data["items"][0].statistics.subscriberCount;
        
        videoCount.innerHTML = data["items"][0].statistics.videoCount;
        
        channelLogo.src = data["items"][0].snippet.thumbnails.default.url;
        
        // Display channel name
        document.getElementById("channelName").innerText = data["items"][0].snippet.title;
        
        // Display channel description
        document.getElementById("description").innerText = data["items"][0].snippet.description;
        
        // Display channel handle
        document.getElementById("url").innerText = data["items"][0].snippet.customUrl;
        

    })
}

   getdata();