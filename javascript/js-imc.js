/**
 * Tableaux de donnees
 * tabImc
 * intervallesImc
 * escription
 * intervallesPoids
 */
let tabImc = [16.5, 18.5, 25, 30, 35, 40];
let intervallesImc = ["moins de 16.5", "16,5 a 18,5", "18,5 a 25", "25 a 30", "30 a 35", "35 a 40", "40 et plus"];
let description = ["denutrition", "maigreur", "poids normal", "surpoids", "obesite modree", "obesite severe", "obesite morbide ou massive"]
let intervallesPoids = ["moins de 47", "47 a 53", "53 a 72", "72 a 86", "86 a 101", "101 a 115", "115 et plus"];

function imcDescription(imcUser) {
    let resultat = "obesite morbide ou massive";
    for (let i = 0; i < tabImc.length; i++) {
        if (imcUser < tabImc[i]) {
            resultat = description[i];
            i = tabImc.length;
        }
    }
    return resultat;
}

function calculerImc(p, t) {
    /**
     * Rounding imc to 1 digit after comma.
     * toFixed() - method converts a number into a string, keeping a specified number of decimals.It does not 
     * actually rounds up a number, it truncates the number.
     * Math.round(n) - rounds a number to the nearest integer.
     */
    const imc = (Math.round((t / (p * p)) * 100) / 100).toFixed(1);
    return imc;
}

function tabDynamique() {
    for (let i = 0; i < intervallesImc.length; i++) {
        $(".tableBody2").append($("<tr>"));
        $(".tableBody2 tr:last-child").append($("<td>").text(intervallesPoids[i]));
        $(".tableBody2 tr:last-child").append($("<td>").text(description[i]));
    };
}

function tabEvidence(imcEvidence) {
    let indiceChild = tabImc.length;
    for (let i = 0; i < tabImc.length; i++) {
        if (imcEvidence < tabImc[i]) {
            indiceChild = i;
            i = tabImc.length;
        }
    }

    return indiceChild + 1;
}

$(function () {
    for (let i = 0; i < intervallesImc.length; i++) {
        $(".tableBody").append($("<tr>"));
        $(".tableBody tr:last-child").append($("<td>").text(intervallesImc[i]));
        $(".tableBody tr:last-child").append($("<td>").text(description[i]));
    };

    $("#calcul").on("click", function () {
        $(".enteteTab2").remove();
        $(".tableBody2 > *").remove();

        let taille = $("#taille").val() / 100;
        let poids = $("#poids").val();

        // alert(`votre taille est : ${taille} m`);
        let imc = calculerImc(taille, poids);

        // if condition to make user set a reasonable value
        if (taille > 0.2 && poids > 5) {
            $(".tableBody2").before(("<thead class=" + "enteteTab2" + "><tr><th>Poids</th><th>Description</th></tr></thead>"));
            $(".afficheImc").text(`Avec votre taille (${taille}m)  et votre poide (${poids})kg, votre IMC est de ${imc} et est considere comme ${imcDescription(imc)}`);
            tabDynamique();
            $(`.tableBody2 tr:nth-child(${tabEvidence(imc)})`).addClass("testb").delay(800);
        }
    });
});