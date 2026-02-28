const apiKey = "AIzaSyBIVAejNJZT6q-iLyQ_S-voWoxXsTN1BfM";  // Zamijeni svojim YouTube API ključem

document.getElementById("searchButton").addEventListener("click", searchSongs);
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchSongs();
    }
});

function searchSongs() {
    const query = document.getElementById("searchInput").value.trim();
    if (query === '') return;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query + " lyrics")}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                displaySongs(data.items);
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
        listItem.textContent = song.snippet.title;

        listItem.addEventListener("click", () => {
            playSong(song.id.videoId);
        });

        songList.appendChild(listItem);
    });
}

function playSong(videoId) {
    document.getElementById("player").innerHTML = `
        <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            frameborder="0" 
            allow="autoplay; encrypted-media" 
            allowfullscreen>
        </iframe>`;
}
