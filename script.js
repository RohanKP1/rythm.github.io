let songIndex=0;
let audioElemant = new Audio("Assets/Media/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let diskName = document.getElementById("disk-name");
let diskImage = document.getElementById("disk-image");
let songCounter = document.getElementById("songCounter");
let salutation = document.getElementById("salutation");
var currentHour = new Date().getHours();

if (6 <= currentHour <= 12) {
    salutation.innerText = "Good morning,";
}
if(12 < currentHour <=17){
    salutation.innerText = "Good afternoon,";
}
if (17 < currentHour <= 21) {
    salutation.innerText = "Good evening,";
}
else{
    salutation.innerText = "Good night,";
}

let songs=[
    {songName:'Zero to Hero', filePath:"Assets/Media/1.mp3", coverPath:"Assets/Images/1.jpg"},
    {songName:'Make Me Move', filePath:"Assets/Media/2.mp3", coverPath:"Assets/Images/2.jpg"},
    {songName:'Heroes Tonight', filePath:"Assets/Media/3.mp3", coverPath:"Assets/Images/3.jpg"},
    {songName:'Power', filePath:"Assets/Media/4.mp3", coverPath:"Assets/Images/4.jpg"},
    {songName:'Grateful', filePath:"Assets/Media/5.mp3", coverPath:"Assets/Images/5.jpg"},
    {songName:'On & On', filePath:"Assets/Media/6.mp3", coverPath:"Assets/Images/6.jpg"},
    {songName:'Work', filePath:"Assets/Media/7.mp3", coverPath:"Assets/Images/7.jpg"},
    {songName:'Namo Namo', filePath:"Assets/Media/8.mp3", coverPath:"Assets/Images/8.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
})

function formatSecondsAsTime(secs, format) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  
    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }
  
    return min + ':' + sec;
}

function masterSongNameToDuration(){
    audioElemant.addEventListener("loadedmetadata", function(_event) {
        masterSongName.innerText = formatSecondsAsTime(audioElemant.duration);
    })
}

function DurationTomasterSongName(){
    masterSongName.innerText = songs[songIndex].songName;
}

masterPlay.addEventListener("click", ()=>{
    if(audioElemant.paused || audioElemant.currentTime<=0){
        hideContainer();
        audioElemant.play();
        masterSongName.innerText = formatSecondsAsTime(audioElemant.duration);
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    }
    else{
        showContainer();
        audioElemant.pause();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
    }
})


audioElemant.addEventListener("timeupdate", ()=>{
    progress=parseInt((audioElemant.currentTime/audioElemant.duration)*100);
    myProgressBar.value = progress;
    songCounter.innerText = formatSecondsAsTime(audioElemant.currentTime);

})

myProgressBar.addEventListener("change", ()=>{
    audioElemant.currentTime = (myProgressBar.value*audioElemant.duration)/100;
})

const hideContainer = ()=>{
    Array.from(document.getElementsByClassName("container")).forEach(
        (element)=>{
            element.style.display = 'none';        }
    )
    Array.from(document.getElementsByClassName("music-focus")).forEach(
        (element)=>{
            element.style.display = 'grid';        }
    )
}

const showContainer = ()=>{
    Array.from(document.getElementsByClassName("music-focus")).forEach(
        (element)=>{
            element.style.display = 'none';        }
    )
    Array.from(document.getElementsByClassName("container")).forEach(
        (element)=>{
            element.style.display = 'grid';        }
    )
}

showContainer();

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElemant.src = `Assets/Media/${songIndex+1}.mp3`;
        let coverLocation = `url(Assets/Images/${songIndex+1}.jpg)`;
        diskImage.style.background = coverLocation;
        diskImage.style.backgroundPosition = "center";
        diskImage.style.backgroundSize = "cover";
        masterSongName.innerText = songs[songIndex].songName;
        diskName.innerText = songs[songIndex].songName;
        audioElemant.currentTime = 0;
        audioElemant.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

Array.from(document.getElementsByClassName("songItem")).forEach(
    (element)=>{
        element.addEventListener('click', ()=>{
            songIndex = parseInt(element.id); 
            hideContainer();
            audioElemant.src = `Assets/Media/${songIndex+1}.mp3`;
            let coverLocation = `url(Assets/Images/${songIndex+1}.jpg)`;
            diskImage.style.background = coverLocation;
            diskImage.style.backgroundPosition = "center";
            diskImage.style.backgroundSize = "cover";
            masterSongName.innerText = songs[songIndex].songName;
            diskName.innerText = songs[songIndex].songName;
            audioElemant.currentTime = 0;
            audioElemant.play(); 
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongNameToDuration();
        })
    }
)

document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    hideContainer();
    audioElemant.src = `Assets/Media/${songIndex+1}.mp3`;
    let coverLocation = `url(Assets/Images/${songIndex+1}.jpg)`;
    diskImage.style.background = coverLocation;
    diskImage.style.backgroundPosition = "center";
    diskImage.style.backgroundSize = "cover";
    audioElemant.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    diskName.innerText = songs[songIndex].songName;
    audioElemant.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    masterSongNameToDuration();
})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    hideContainer();
    audioElemant.src = `Assets/Media/${songIndex+1}.mp3`;
    let coverLocation = `url(Assets/Images/${songIndex+1}.jpg)`;
    diskImage.style.background = coverLocation;
    diskImage.style.backgroundPosition = "center";
    diskImage.style.backgroundSize = "cover";
    masterSongName.innerText = songs[songIndex].songName;
    diskName.innerText = songs[songIndex].songName;
    audioElemant.currentTime = 0;
    audioElemant.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    masterSongNameToDuration();
})

audioElemant.addEventListener('ended',()=>{
    if (songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElemant.src = `Assets/Media/${songIndex+1}.mp3`;
    audioElemant.play();
    audioElemant.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    let coverLocation = `url(Assets/Images/${songIndex+1}.jpg)`;
    diskImage.style.background = coverLocation;
    diskImage.style.backgroundPosition = "center";
    diskImage.style.backgroundSize = "cover";
    diskName.innerText = songs[songIndex].songName;
})
