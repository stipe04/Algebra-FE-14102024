let currentAudio = document.getElementById("audioPlayer");

document.getElementById("searchButton").addEventListener("click", searchSongs);
document.getElementById("searchInput").addEventListener("input", clearResults);

function searchSongs() {
    const artist = document.getElementById("searchInput").value.trim();
    if (artist === '') return;

    const proxy = "https://cors-anywhere.herokuapp.com/"; // CORS bypass
    const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(artist)}`;

    fetch(proxy + apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                displaySongs(data.data);
            } else {
                document.getElementById("songList").innerHTML = "<p>Nema pronađenih pjesama.</p>";
            }
        })
        .catch(error => console.error("Greška:", error));
}

function displaySongs(songs) {
    const songList = document.getElementById("songList");
    songList.innerHTML = ''; // Očisti prethodne rezultate

    songs.forEach(song => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist.name}`;

        listItem.addEventListener("click", () => {
            playSong(song.preview);
        });

        songList.appendChild(listItem);
    });
}

function playSong(url) {
    if (currentAudio.src !== url) {
        currentAudio.src = url;
        currentAudio.play();
    } else {
        if (currentAudio.paused) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    }
}

function clearResults() {
    const input = document.getElementById("searchInput").value.trim();
    if (input === "") {
        document.getElementById("songList").innerHTML = "";
        currentAudio.pause();
        currentAudio.src = "";
    }
}
