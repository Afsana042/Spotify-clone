// JavaScript source code

console.log("this is console")
let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgress = document.getElementById("myProgress");
let gif=document.getElementById("gif");
let songItem=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');

let songs = [
    { songName: "song name 1",filePath:"1.mp3",coverPath:"cover/three.jpg"},
    { songName: "song name 2",filePath:"2.mp3",coverPath:"cover/four.jpg"},
    { songName: "song name 3",filePath:"3.mp3",coverPath:"cover/five.jpg"},
    { songName: "song name 4",filePath:"4.mp3",coverPath:"cover/six.jpg"},
    { songName: "song name 5",filePath:"5.mp3",coverPath:"cover/seven.jpg"},
    { songName: "song name 6",filePath:"6.mp3",coverPath:"cover/eight.jpg"},
    { songName: "song name 7",filePath:"7.mp3",coverPath:"cover/nine.jpg"},
    { songName: "song name 8",filePath:"8.mp3",coverPath:"cover/one.png"},
    { songName: "song name 9",filePath:"9.mp3",coverPath:"cover/two.jpg"},
    
]

songItem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})

audioElement.addEventListener('timeupdate',()=>{
    // update seek bar 
    // audioELement.currentTime will give the current time at which position the song is playing
    // audioElement.duration will give the duration of song
    // (cT/D) *100= P
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgress.value=progress;
    //console.log("update time ")
})


// 
masterPlay.addEventListener('click', ()=> {
    // to play a song
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        gif.style.opacity="1";
        masterSongName.innerText=songs[songIndex].songName;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause")
    }

    // to pause a song
    else{
        audioElement.pause();
        gif.style.opacity="0";
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause")

    }

})

myProgress.addEventListener('change',()=>{

    // cT= (P * D)/100
    // seek the progress bar to its current time when change event is trigerred
    audioElement.currentTime= myProgress.value * audioElement.duration/100;
})


// to play all song

const makeAllPlay =()=>{
    Array.from(document.getElementsByClassName('songItmePlay')).forEach((element)=>{
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.add('fa-circle-pause');
        e.target.classList.remove('fa-circle-play')
        
        audioElement.src=`${songIndex+1}.mp3`
        gif.style.opacity="1";
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();

        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        //console.log(value)
        }else{
            makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play')
        
        audioElement.src=`${songIndex+1}.mp3`
        gif.style.opacity="0";
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.pause();

        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
            
        }

    })
})






document.getElementById('next').addEventListener('click',()=>{
    console.log("hello")
    if(songIndex <= 8){
        songIndex += 1 
        
    }else{
        songIndex = 0
    }
       audioElement.src=`${songIndex+1}.mp3`;
      // console.log(audioElement.src=`${songIndex+1}.mp3`)
       masterSongName.innerText=songs[songIndex].songName;
       audioElement.currentTime=0;
        audioElement.play();
    
        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");  
    
})

document.getElementById('previous').addEventListener('click',()=>{
    
    if(songIndex > 0){
        songIndex -= 1;
    }else{
        songIndex = 8;

    }
    audioElement.src=`${songIndex+1}.mp3`;
    //console.log(audioElement.src=`${songIndex+1}.mp3`);
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();

    masterPlay.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
})