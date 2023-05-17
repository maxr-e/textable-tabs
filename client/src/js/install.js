const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
//event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //store event
    window.deferredPrompt = event;
    //remove hidden class from button so it can be seen
    butInstall.classList.toggle('hidden', false);
});

//event handler on `butInstall'
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
     return;
    }
    //prompt appears
    promptEvent.prompt();
    window.deferredPrompt = null;
    //applies hidden class to button
    butInstall.classList.toggle('hidden', true);

});

//event handler for `appinstalled`
window.addEventListener('appinstalled', (event) => {
    //prompt removed
    window.deferredPrompt = null;
});
