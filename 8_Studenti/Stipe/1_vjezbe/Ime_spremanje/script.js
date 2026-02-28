document.addEventListener('DOMContentLoaded', function() {
    const imeInput = document.getElementById('ime');
    const prezimeInput = document.getElementById('prezime');
    const godineInput = document.getElementById('godine');
    const dodajButton = document.getElementById('dodaj');
    const popisDiv = document.getElementById('popis');

    let osobe = JSON.parse(localStorage.getItem('osobe')) || [];

    function prikaziOsobe() {
        popisDiv.innerHTML = '';
        osobe.forEach((osoba, index) => {
            const osobaDiv = document.createElement('div');
            osobaDiv.classList.add('osoba');
            osobaDiv.innerHTML = `<strong>${osoba.ime} ${osoba.prezime}</strong> (${osoba.godine} godina)<br>${osoba.opis || ''}
                                    <div class="opis-unos">
                                        <input type="text" id="opis-${index}" placeholder="Unesite opis" value="${osoba.opis || ''}">
                                        <button class="spremi-opis" data-index="${index}">Spremi opis</button>
                                    </div>
                                    <i class="fas fa-trash brisanje" data-index="${index}"></i>`;

            popisDiv.appendChild(osobaDiv);
        });

        document.querySelectorAll('.spremi-opis').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                const opisInput = document.getElementById(`opis-${index}`);
                osobe[index].opis = opisInput.value;
                localStorage.setItem('osobe', JSON.stringify(osobe));
                prikaziOsobe();
            });
        });

        document.querySelectorAll('.brisanje').forEach(icon => {
            icon.addEventListener('click', function() {
                const index = this.dataset.index;
                osobe.splice(index, 1);
                localStorage.setItem('osobe', JSON.stringify(osobe));
                prikaziOsobe();
            });
        });
    }

    prikaziOsobe();

    dodajButton.addEventListener('click', function() {
        const ime = imeInput.value;
        const prezime = prezimeInput.value;
        const godine = godineInput.value;

        if (!ime) {
            alert('Molimo unesite ime.');
            return;
        }
        if (!prezime) {
            alert('Molimo unesite prezime.');
            return;
        }
        if (!godine) {
            alert('Molimo unesite godine.');
            return;
        }

        osobe.push({ ime: ime, prezime: prezime, godine: godine });
        localStorage.setItem('osobe', JSON.stringify(osobe));
        prikaziOsobe();
        imeInput.value = '';
        prezimeInput.value = '';
        godineInput.value = '';

    });
});