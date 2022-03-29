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
let intervallesPoids = [];

/**
 * this function use description[]Array to give the user a description of his/her IMC
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
 * this function creates 'in html' the Second Table with Poids and Description
 */
function tabDynamique() {
     //this instruction generate the head of the second table (poids/description)
     $(".tableBody2").before((`<thead class="enteteTab2"><tr><th>Poids</th><th>Description</th></tr></thead>`));

    for (let i = 0; i < intervallesImc.length; i++) {
        $(".tableBody2").append($("<tr>"));
        $(".tableBody2 tr:last-child").append($("<td>").text(intervallesPoids[i]));
        $(".tableBody2 tr:last-child").append($("<td>").text(description[i]));
    };
}

function genererIntervallesPoids (taille) {
    for(let i = 0 ; i < description.length ; i++) {
        intervallesPoids[i] = (Math.round(((tabImc[i] * (taille * taille)) * 100)/100));
    }
}

/**
 * 
 * @param {*} imcEvidence is the IMC of the user
 * @returns the position of the IMC among the table
 */
function tabEvidence(imcEvidence) {
    // declare and set the last element of the table "tabImc"
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
 * this function creates 'in html' the First Table with IMC and Description
 */
function tabImcDescription() {
    for (let i = 0; i < intervallesImc.length; i++) {
        $(".tableBody").append($("<tr>"));
        $(".tableBody tr:last-child").append($("<td>").text(intervallesImc[i]));
        $(".tableBody tr:last-child").append($("<td>").text(description[i]));
    };
}

/**
 * This function get all data from Browser's local storage and show it in html
 */
function getAllStorage() {
    for (let i = 0; i < keys.length; i++) {
        $("#list-historique").append($("<p>").text(('IMC ' + (i + 1)) + " / " + (localStorage.getItem('IMC ' + (i + 1) ) )));
    };
}

/**
 * function to get date
 * @returns time 
 */
function time() {
    let date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = (date.getMonth() + 1);
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hour = date.getHours();
    let time = day + "/" + month + "/" + year + " | " + hour + ":" + minutes + ":" + seconds;
    return time;
}



//instructions to set i equal to localStorage,length
keys = Object.keys(localStorage);
i = keys.length;

/**
 * Jquery Document ready function
 */
$(function () {
    //First table (IMC/Description)
    tabImcDescription();

    /**
     * this function treats the 'calcul & enregistrer' buttons behavior
     */
    $("#calcul").on("click", function () {

        $(".enteteTab2").remove();
        $(".tableBody2 > *").remove();

        let taille = $("#taille").val() / 100;
        let poids = $("#poids").val();

        let imc = calculerImc(taille, poids);

        genererIntervallesPoids(taille);

        //this instruction generate the paragraph in calculatrice tab
        $(".afficheImc-paragraph").text(`Avec votre taille (${taille}m)  et votre poide (${poids})kg, votre IMC est de ${imc} et est considere comme ${imcDescription(imc)}. Avec votre taille, voici votre categorie d'IMC en fonction de votre poids:`);

        //Show the Second table (poids/Description)
        tabDynamique();

        $(`.tableBody2 tr:nth-child(${tabEvidence(imc)})`).addClass("categorie-en-evidence");

    });

    $("#enregistrer-button").on("click", function () {

        let taille = $("#taille").val() / 100;
        let poids = $("#poids").val();

        let imc = calculerImc(taille, poids);

        //increment local storage key position
        i++;

        localStorage.setItem(`IMC ${i}`, `Date: ${time()} / IMC: ${imc}`);
    });

    $("#historique-button").on("click", function () {


        if ($(this).attr('data-click-state') == 0) {
            // Set data-click-state attribute to 0
            $(this).attr('data-click-state', 1);

            //instruction to remove history from the web page if already existed
            $("#historique > *").remove();
            $("#supprimer-tout").remove();

            if (localStorage.length <= 0) {
                alert("Aucun Historique");
                $("#historique-button").attr('data-click-state', 0);
            };
            //generate supprimer-tout button with localStorage if data exist in local.Storage
            if (localStorage.length > 0) {
                $("#historique").before(`<button id="supprimer-tout" type="button" class="btn btn-outline-primary">supprimer-tout</button>`);
            }

            $("#supprimer-tout").on("click", function () {
                //clear local storage
                if (localStorage.length > 0) {
                    localStorage.clear();
                }

                //to remove history from web
                $("#historique > *").remove();
                $("#supprimer-tout").remove();
                location.reload();
                // Make historique-button ready to for user click
                $("#historique-button").attr('data-click-state', 1);
            });

            getAllStorage().delay(800);
        }
        else {
            $(this).attr('data-click-state', 0);

            $("#historique > *").remove();
            $("#supprimer-tout").remove();
        }
    });
});