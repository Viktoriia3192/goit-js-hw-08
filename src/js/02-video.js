import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Vimeo(document.getElementById('vimeo-player'));

function saveCurrentTime() {
    vimeoPlayer.getCurrentTime().then((time) => {
        localStorage.setItem('videoplayer-current-time', time);
    });
}

function loadSavedTime() {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime) {
        vimeoPlayer.setCurrentTime(parseFloat(savedTime));
    }
}

const throttledSaveTime = throttle(saveCurrentTime, 1000);

vimeoPlayer.on('timeupdate', throttledSaveTime);

vimeoPlayer.ready().then(() => {
    loadSavedTime();
});

