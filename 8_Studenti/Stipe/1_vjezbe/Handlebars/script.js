// Dohvati Handlebars template iz HTML-a
const source = document.getElementById("template").innerHTML;

// Kompajliranje Handlebars templatea
const template = Handlebars.compile(source);

// Podaci koji će se umetnuti u predložak
const podaci = { 
    naslov: "Pozdrav, Lorena!", 
    opis: "Ovo je primjer Handlebars templatinga." 
};

// Generiranje HTML-a pomoću predloška i podataka
const html = template(podaci);

// Ubacivanje generiranog HTML-a u <div id="content">
document.getElementById("content").innerHTML = html;
