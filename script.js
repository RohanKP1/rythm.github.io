
let songIndex=0;
let audioElemant = new Audio("Assets/Media/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let diskName = document.getElementById("disk-name");
let diskImage = document.getElementById("disk-image");

let songs=[
    {songName:'Zero to Hero', filePath:"Assets/Media/1.mp3", coverPath:"Assets/Images/1.jpg"},
    {songName:'Make Me Move', filePath:"Assets/Media/2.mp3", coverPath:"Assets/Images/2.jpg"},
    {songName:'Heroes Tonight', filePath:"Assets/Media/3.mp3", coverPath:"Assets/Images/3.jpg"},
    {songName:'Power', filePath:"Assets/Media/4.mp3", coverPath:"Assets/Images/4.jpg"},
    {songName:'Grateful', filePath:"Assets/Media/5.mp3", coverPath:"Assets/Images/5.jpg"},
    {songName:'On & On', filePath:"Assets/Media/6.mp3", coverPath:"Assets/Images/6.jpg"},
    // {songName:'Work', filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    // {songName:'Namo Namo', filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    //{songName:'Yet to Add', filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    //{songName:'Yet to Add', filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
})

//audioElemant.play();

masterPlay.addEventListener("click", ()=>{
    if(audioElemant.paused || audioElemant.currentTime<=0){
        hideContainer();
        audioElemant.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
            if (element.id==String(songIndex)){
                element.classList.remove("fa-play-circle");
                element.classList.add("fa-pause-circle");
            }
        })
    }
    else{
        makeAllPlays();
        showContainer();
        audioElemant.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
    }
})

audioElemant.addEventListener("timeupdate", ()=>{
    progress=parseInt((audioElemant.currentTime/audioElemant.duration)*100);
    myProgressBar.value = progress;
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

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
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
            Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
                if (element.id==String(songIndex)){
                    element.classList.remove("fa-play-circle");
                    element.classList.add("fa-pause-circle");
                }
            })
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
    makeAllPlays()
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        if (element.id==String(songIndex)){
            element.classList.remove("fa-play-circle");
            element.classList.add("fa-pause-circle");
        }
    })
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
})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    hideContainer();
    makeAllPlays()
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        if (element.id==String(songIndex)){
            element.classList.remove("fa-play-circle");
            element.classList.add("fa-pause-circle");
        }
    })
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

audioElemant.addEventListener('ended',()=>{
    if (songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays();
    audioElemant.src = `Assets/Media/${songIndex+1}.mp3`;
    audioElemant.play();
    audioElemant.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    let coverLocation = `url(Assets/Images/${songIndex+1}.jpg)`;
    diskImage.style.background = coverLocation;
    diskImage.style.backgroundPosition = "center";
    diskImage.style.backgroundSize = "cover";
    diskName.innerText = songs[songIndex].songName;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        if (element.id==String(songIndex)){
            element.classList.remove("fa-play-circle");
            element.classList.add("fa-pause-circle");
        }
    })

})
