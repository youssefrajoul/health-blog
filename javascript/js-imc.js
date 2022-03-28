/**
 * Tableaux de donnees global
 * tabImc
 * intervallesImc
 * escription
 * intervallesPoids
 */
let tabImc = [16.5, 18.5, 25, 30, 35, 40];
let intervallesImc = ["moins de 16.5", "16,5 a 18,5", "18,5 a 25", "25 a 30", "30 a 35", "35 a 40", "40 et plus"];
let description = ["denutrition", "maigreur", "poids normal", "surpoids", "obesite modree", "obesite severe", "obesite morbide ou massive"]
let intervallesPoids = ["moins de 47", "47 a 53", "53 a 72", "72 a 86", "86 a 101", "101 a 115", "115 et plus"];

/**
 * this function use description[]Array to give the user a description of his IMC
 * @param {*} imcUser 
 * @returns resultat is a description of the user's IMC
 */
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

/**
 * this function calculate the IMC of the user
 * @param {*} p the first parameter is the the weight of the user
 * @param {*} t the second parameter is the height of the user
 * @returns IMC the body mass index
 */
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

/**
 * this function creates(in html) the Second Table with Poids and Description
 */
function tabDynamique() {
    for (let i = 0; i < intervallesImc.length; i++) {
        $(".tableBody2").append($("<tr>"));
        $(".tableBody2 tr:last-child").append($("<td>").text(intervallesPoids[i]));
        $(".tableBody2 tr:last-child").append($("<td>").text(description[i]));
    };
}

/**
 * 
 * @param {*} imcEvidence is the IMC of the user
 * @returns the position of the IMC among the table
 */
function tabEvidence(imcEvidence) {
    let indiceCategorie = tabImc.length;
    for (let i = 0; i < tabImc.length; i++) {
        if (imcEvidence < tabImc[i]) {
            indiceCategorie = i;
            i = tabImc.length;
        }
    }

    return indiceCategorie + 1;
}

/**
 * this function creates(in html) the First Table with IMC and Description
 */
function tabImcDescription() {
    for (let i = 0; i < intervallesImc.length; i++) {
        $(".tableBody").append($("<tr>"));
        $(".tableBody tr:last-child").append($("<td>").text(intervallesImc[i]));
        $(".tableBody tr:last-child").append($("<td>").text(description[i]));
    };
}


function allStorage() {

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    for(let i = 0 ; i < keys.length ; i++) {
        $("#historique").append($("<p>").text((i+1)+" / " + values[i]));
    }
}

//instructions to get date
let date = new Date();
var year = date.getFullYear();
var day = date.getDate();
let month = date.getMonth() + 1
let seconds = date.getSeconds();
let minutes = date.getMinutes();
let hour = date.getHours();
let time = day + "/" + month + "/" + year + " | " + hour + ":" + minutes + ":" + seconds;

//instructions to set i equal to localStorage,length
let values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

/**
 * Jquery Document ready function
 */
$(function () {
    //First table (IMC/Description)
    tabImcDescription();

    $("#calcul").on("click", function () {
        //those two instructions remove the second table (Poids/descirpton) if alreaady exist
        $(".enteteTab2").remove();
        $(".tableBody2 > *").remove();

        

        //instructions to get user's taille end poids
        let taille = $("#taille").val() / 100;
        let poids = $("#poids").val();

        // alert(`votre taille est : ${taille} m`);

        //calculate user's IMC/BMI
        let imc = calculerImc(taille, poids);

        i++;
        // if condition to make user set a reasonable value
        if (taille > 0.2 && poids > 5) {
            //this instruction generate the head of the second table (poids/description)
            $(".tableBody2").before(("<thead class=" + "enteteTab2" + "><tr><th>Poids</th><th>Description</th></tr></thead>"));

            //this instruction generate the paragraph in calculatrice tab
            $(".afficheImc").text(`Avec votre taille (${taille}m)  et votre poide (${poids})kg, votre IMC est de ${imc} et est considere comme ${imcDescription(imc)}`);

            //Second table (poids/Description)
            tabDynamique();

            //change background color of the table row using a Css class
            $(`.tableBody2 tr:nth-child(${tabEvidence(imc)})`).addClass("categorie-en-evidence").delay(800);

            localStorage.setItem('IMC ' + i,  "Date: " + time + " / IMC: " + imc);


            
        }
    });
    $("#historique-button").on("click", function () {
        
        $("#historique > *").remove();
        
        allStorage().delay(800);
    });

});