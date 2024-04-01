const getFileType = (url) => {
    let ext = url.split('/').pop().split('.').pop();

    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webp" || ext === "svg") return "image";

    if (ext === "mp4" || ext === "mov" || ext === "ogg") return "video";

    if (ext === "mp3") return "audio";

    return ext;
}

export default getFileType;