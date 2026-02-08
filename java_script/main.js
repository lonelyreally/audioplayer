const playpauseButton = document.querySelector('.playpause')
const nextSongButton = document.querySelector('.next')
const prevSongButton = document.querySelector('.prev')
const mixSongButton = document.querySelector('.mix')
const repeatSongButton = document.querySelector('.repeat')
const progress = document.querySelector('.progress')
const songImg = document.querySelector('.img')
const songTitle = document.querySelector('.title')
const songArtist = document.querySelector('.artist')
const current_time = document.querySelector('.current_time')
const song_duration = document.querySelector('.song_duration')

const songs = [
    {   image: "images/xxxmanera - usb.png",
        title: "usb",
        artist: "xxxmanera",
        audio: "audio/usb.mp3",
    },
    {
        image: "images/d3r - jealous (UNFINISHED).jpeg",
        title: "jealous",
        artist: "d3r",
        audio: "audio/jealous.mp3"
    },
    {
        image: "images/dollreal, d3r - RED.png",
        title: "RED",
        artist: "dollreal, d3r",
        audio: "audio/red.m4a"
    },
    {
        image: "images/d3r, kets4eki, asteria - DROP IT!.jpg",
        title: "DROP IT!",
        artist: "d3r, kets4eki, asteria",
        audio: "audio/drop it.m4a",
    },
    {
        image: "images/Upvampin, kets4eki, 5GSWAG - PASS THAT HOE AROUND!.jpeg",
        title: "PASS THAT HOE AROUND!",
        artist: "Upvampin, kets4eki, 5GSWAG",
        audio: "audio/pass that hoe around!.m4a",
    },
    {
        image: "images/skypebf, kets4eki, Syris - talk shit.jpeg",
        title: "talk shit",
        artist: "skypebf, kets4eki, Syris",
        audio: "audio/talk shit.m4a",
    },
    {
        image: "images//fever lie - snippet.jpg",
        title: "tiktok snippet",
        artist: "fever lie",
        audio: "audio/fever lie - snippet.mp3",
    },
    {
        image: "images//иван.jpeg",
        title: "???",
        artist: "???",
        audio: "audio/иван.m4a",
    },
]
const audio = document.createElement("audio")

let currentSongIndex = 0

updateSong()

function nextSong() {
    playpauseButton.src = 'images/pausesongbutton.svg'
    if (currentSongIndex == songs.length - 1 && audio.currentTime == audio.duration) {
        playpauseButton.src = 'images/playsongbutton.svg'
        return
    }
    currentSongIndex++
    updateSong()
    audio.play()
}

function prevSong() {
    if (currentSongIndex != 0) {
        playpauseButton.src = 'images/pausesongbutton.svg'
    } else {
        audio.currentTime = 0;
        audio.play();
        return
    }
    currentSongIndex--
    updateSong()
    audio.play()
}

prevSongButton.addEventListener("click", prevSong)
nextSongButton.addEventListener("click", nextSong)

playpauseButton.addEventListener("click", function() {
    if (!audio.paused) {
        playpauseButton.src = 'images/playsongbutton.svg'
        audio.pause()
    }
    else {
        playpauseButton.src = 'images/pausesongbutton.svg'
        audio.play()
    }
})

function updateSong() {
    const song = songs[currentSongIndex]
    songImg.src = song.image;
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;

    audio.src = song.audio;

    audio.onloadedmetadata = function() {
        progress.value = 0;
        progress.max = audio.duration;
    };
}

progress.addEventListener('change', function() {
    audio.currentTime = progress.value;
})

function moveProgress() {
    progress.value = audio.currentTime;
    current_time.innerHTML = sToStr(Math.round(audio.currentTime));
    song_duration.innerHTML = sToStr(Math.round(audio.duration));
}

setInterval(moveProgress, 1000);

audio.addEventListener('ended', nextSong)

function sToStr(s) {
  let m = Math.trunc(s / 60) + ''
  s = (s % 60) + ''
  return m.padStart(2, 0) + ':' + s.padStart(2, 0)
}