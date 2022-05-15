const uploadInput = document.getElementById("file-upload");
const uploadLabel = document.getElementById("file-upload-label");
const clearInput = document.getElementById("file-clear");
const fileContainer = document.getElementById("file-container");
const MAX_FILENAME_LENGTH = 48;


const updateFileView = async () => {
    const res = await (await fetch('api/filelist')).json()
    const files = res.files;
    fileContainer.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
        const anchor = document.createElement('a');
        anchor.innerText = files[i].length > MAX_FILENAME_LENGTH
            ? (files[i].slice(0, MAX_FILENAME_LENGTH - 3) + '...')
            : files[i];
        anchor.setAttribute('href', `api/files/${files[i]}`);
        anchor.setAttribute('download', '');
        anchor.setAttribute('class', 'text interact file');
        if (files[i].length > MAX_FILENAME_LENGTH)
            anchor.setAttribute('title', files[i]);
        fileContainer.appendChild(anchor);
    }
}

const uploadInputChanged = () => {
    uploadLabel.innerText = `select files (${uploadInput.files.length} selected)`
}

const clearInputClick = async () => {
    await fetch('api/clear', {
        method: "POST",
    });
    updateFileView();
}

const main = async () => {
    uploadInput.addEventListener('change', () => uploadInputChanged());
    uploadInputChanged();
    clearInput.addEventListener('click', () => clearInputClick());
    updateFileView();
}

main();
