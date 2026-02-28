const ligaFilter = document.getElementById('liga');
const days = document.querySelectorAll('.day');

async function dohvatiLige() {
    const fbURLv2 = "https://www.thesportsdb.com/api/v2/json/all/leagues.php";

    try {
        const response = await fetch(fbURLv2);
        const data = await response.json();
        return data.leagues;
    } catch (error) {
        console.error('Greška pri dohvaćanju liga:', error);
        return [];
    }
}

async function dohvatiUtakmice(leagueId) {
    const apiUrl = `https://www.thesportsdb.com/api/v2/json/all/eventsday.php?id=${leagueId}&d=2023-11-03`; //Promijenite datum po potrebi
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.events;
    } catch (error) {
        console.error('Greška pri dohvaćanju utakmica:', error);
        return [];
    }
}

async function popuniLige() {
    const lige = await dohvatiLige();

    if (!lige) {
        return;
    }

    lige.forEach(liga => {
        if (liga.strSport === "Soccer"){
            const option = document.createElement('option');
            option.value = liga.idLeague;
            option.textContent = liga.strLeague;
            ligaFilter.appendChild(option);
        }
    });

    // Učitaj utakmice za prvu ligu (ili sve lige)
    prikaziUtakmice(lige[0].idLeague);
}

async function prikaziUtakmice(leagueId) {
    const utakmice = await dohvatiUtakmice(leagueId);

    days.forEach(day => {
        const matchesDiv = day.querySelector('.matches');
        matchesDiv.innerHTML = '';

        if (utakmice) {
            utakmice.forEach(utakmica => {
                const matchDiv = document.createElement('div');
                matchDiv.classList.add('match');
                matchDiv.innerHTML = `
                    <span>${utakmica.strEvent}</span>
                    <span>${utakmica.strTime}</span>
                    <span>${utakmica.intHomeScore || '-'}</span>
                    <span>${utakmica.intAwayScore || '-'}</span>
                `;
                matchesDiv.appendChild(matchDiv);
            });
        }
    });
}

ligaFilter.addEventListener('change', () => {
    prikaziUtakmice(ligaFilter.value);
});

popuniLige();