const odpoved = document.querySelectorAll('.odpovedWrapper > *');
const otazka = document.getElementById("otazky");
const levels = document.getElementsByClassName("level");
let otazky = [
    ["Kdo je Tran?", "Vietcong", "Bezdomovec", "Náhodnej člověk", "Zpěvák", false],                 //Otazky
    ["_____ Esch?", "Pavel", "Jan", "Petr", "Martin", false],
    ["Nejčastější operační systém v PC?", "Windows", "macOS", "Linux", "Jiný", false],
    ["Kde bydlí Štefan Jambrich?", "Benátky nad Jizerou", "Benátky v Itálii", "Pod mostem", "Mladá Boleslav", false],
    ["Která automobilová společnost je známá výrobou el. automobilů?", "Tesla", "Ford", "BMW", "Fiat", false],
    ["Kdo byl Jimmy Hendrix?", "Kytarista, zpěvák skladatel", "Významný vědec", "Spisovatel", "Politik", false],
    ["Je Java nejlepší jazyk?", "NE!", "Co je Java?", "Ano, je.", "To je stejný jako java script, ne?", false],                   
    ["Štefanovo oblíbené pití?", "Gin", "Vodka", "Tequila", "Rum", false],
    ["Nejlepší jídlo z kiosku?", "Bageta Stripsy", "Tortila", "Mexická placka", "Sandwich", false],
    ["Jaký titul má paní Iva Lišková?", "RNDr.", "Ing.", "Mgr.", "Žádný", false],
    ["Co si pan Korál koupil v OBI?", "Lustr", "Židli", "Losos", "Květináč", false],
    ["Jak se řekne Zaklínač polsky?", "Wiedźmin", "Nauczyciel", "Uczeń", "Kierowca", false],
    ["Kolik knih musíš přečíst k maturitě?", "20", "5", "15", "Žádné", false],
    ["Co to je bitcoin?", "Kryptoměna", "Herní měna", "Starodávná měna", "Mýtus", false],
    ["Kdo byl Ho Či Min?", "Prezident Vietnamu", "Nějakej farmář", "Zpěvák", "Spisovatel", false]
];
const array = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
let odp1 = document.getElementById("odp1");
let odp2 = document.getElementById("odp2");
let odp3 = document.getElementById("odp3");
let odp4 = document.getElementById("odp4");

let i = array.length - 1;
let button = 0;
let odpovedArray = [];
let currentLevel = array.length;
let spravnaOdp = true;
let x = Math.floor(Math.random()*array.length);
let y = 1;

[...levels].forEach((level) => {
    level.innerHTML = new Intl.NumberFormat('cz-CS', { style: 'currency', currency: 'USD' }).format(array[i]);
    i--;
});

const restart = () => {
    for (let i = 0; i < otazky.length; i++) {
        otazky[i][2] = false;
    }
    currentLevel = array.length;
    for (let i = 0; i < array.length - 1; i++) {
        levels[i].style.backgroundColor = "#0e0c83";
        levels[i].style.color = "white";
        levels[i].style.fontWeight = "";
    }
    load();
}

const updateLevels = () => {
    currentLevel--;
    if (currentLevel > 0) {
        levels[currentLevel].style.backgroundColor = "yellow";
        levels[currentLevel].style.color = "black";
        levels[currentLevel].style.fontWeight = "900";
    }
    if (currentLevel < 14) {
        levels[currentLevel + 1].style.backgroundColor = "#131516";
        levels[currentLevel + 1].style.color = "yellow";
        levels[currentLevel + 1].style.fontWeight = "";
    }
    if (currentLevel == 0) {
        otazka.innerHTML = "<h1>Vyhrál jsi! Odcházíš s " + new Intl.NumberFormat('cz-CS', { style: 'currency', currency: 'USD' }).format(array[array.length - 1]) + "<br> Zmáčkni F5 pro restart!</h1>";
        currentLevel = array.length;
        levels[currentLevel - 1].style.backgroundColor = "#131516";
        levels[currentLevel - 1].style.color = "white";
        levels[currentLevel - 1].style.fontWeight = "";
       
    }
}

const nahodnyGen = () => {                      //Random generator
    while(odpovedArray.length < 4){
        let r = Math.floor(Math.random() * 4) + 1;
        if(odpovedArray.indexOf(r) === -1) odpovedArray.push(r);
    }
}

const load = () => {
    x = Math.floor(Math.random()*array.length);
    otazka.innerHTML = "<h1>" + otazky[x][0] + "</h1>";
    
    if (otazky[x][5] == true) {
        load();
    } else {
        updateLevels();
    }

    for (let i = 0; i < odpoved.length; i++) {
        nahodnyGen();
     odpoved[i].value = otazky[x][odpovedArray[i]];
        if (window.screen.width < 350) {
         odpoved[i].innerHTML = "<p>" + otazky[x][odpovedArray[i]] + "</p>";
        } else {
         odpoved[i].innerHTML = "<h1>" + otazky[x][odpovedArray[i]] + "</h1>";
        }
    }
}

const poslatOdpoved = () => {
    switch (button) {
        case 0:
            if  (odpoved[0].value != otazky[x][1]) {
                spatnaOdpFn();
            } else {
                spravnaOdpFn();
            }
            break;

        case 1:
            if  (odpoved[1].value != otazky[x][1]) {
                spatnaOdpFn();
            } else {
                spravnaOdpFn();
            }
            break;

        case 2:
            if  (odpoved[2].value != otazky[x][1]) {
                spatnaOdpFn();
            } else {
                spravnaOdpFn();
            }
            break;

        case 3:
            if  (odpoved[3].value != otazky[x][1]) {
                spatnaOdpFn();
            } else {
                spravnaOdpFn();
            }
            break;
    }
}

const spravnaOdpFn = () => {
    currentLevel++;
    otazka.innerHTML = otazky[x][0];
    otazky[x][5] = true;
    updateLevels();
    load();
    odpovedArray = [];
    if (currentLevel < 0) {
        restart();
    }
}

const spatnaOdpFn = () => {
    currentLevel = array.length;
    spravnaOdp = false;
    otazka.innerHTML = "<h1>Better luck next time! <br> Klikni na F5 pro restart!</h1>";
    
}

odp1.onclick = () => {
    button = 0;
    poslatOdpoved();
}
    
odp2.onclick = () => {
    button = 1;
    poslatOdpoved();
}
    
odp3.onclick = () => {
    button = 2;
    poslatOdpoved();
 }
    
odp4.onclick = () => {
    button = 3;
    poslatOdpoved();
}

window.onload = load();