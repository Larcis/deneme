'use strict';

function handleSuccess(stream) {
    const video = document.querySelector('video');
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    video.srcObject = stream;
    const [track] = [window.track] = stream.getVideoTracks();
    const trackCap = "zoom";
    const stride = 10;
    var capabilitie = track.getCapabilities()[trackCap];
    var setting = track.getSettings()[trackCap];
    if (setting && capabilitie) {
        const step = stride * capabilitie.step;
        function applyCap(val) {
            try {
                track.applyConstraints({ advanced: [{ "zoom": val }] })
            } catch (e) {
                console.log(e);
            }
        }
        document.addEventListener("keydown", function (e) {
            console.log(e)
            if (e.which == 39 && setting <= (capabilitie.max - step)) { //zoom up
                setting += step;
                applyCap(setting);
            } else if (e.which == 37 && setting >= (capabilitie.min + step)) { //zoom down
                setting -= step;
                applyCap(setting);
            }
        });
    }
}

function handleError(error) {
    if (error.name === 'NotAllowedError') {
        errorMsg('Permissions have not been granted to use your camera, ' +
            'you need to allow the page access to your devices in ' +
            'order for the demo to work.');
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}

const constraints = window.constraints = {
    video: {
        zoom: true,
        facingMode: 'environment'
    }
};

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
        e.target.disabled = true;
    } catch (e) {
        handleError(e);
    }
}

init();
