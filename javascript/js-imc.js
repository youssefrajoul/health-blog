let intervalles = ["moins de 16.5", "16,5 a 18,5", "18,5 a 25", "25 a 30", "30 a 35", "35 a 40", "40 et plus"];
let description = ["denutrition", "maigreur", "poids normal", "surpoids", "obesite modree", "obesite severe", "obesite morbide ou massive"]

function calculerImc (p, t) {
    /**
     * Rounding imc to 1 digit after comma.
     * toFixed() - method converts a number into a string, keeping a specified number of decimals.It does not 
     * actually rounds up a number, it truncates the number.
     * Math.round(n) - rounds a number to the nearest integer.
     */
    const imc = (Math.round((t / (p * p)) * 100)/100).toFixed(1);
    return imc;
}

$(function () {
    for (let i = 0; i < intervalles.length; i++) {
        $(".tableBody").append($("<tr>"));
        $(".tableBody tr:last-child").append($("<td>").text(intervalles[i]));
        $(".tableBody tr:last-child").append($("<td>").text(description[i]));
    };
    $("#calcul").on("click", function () {
        const taille = $("#taille").val() / 100;
        const poids = $("#poids").val();
        // alert(`votre taille est : ${taille} m`);
        $(".afficheImc").text(`Avec votre taille (${taille}m)  et votre poide (${poids})kg, votre IMC est de  ${calculerImc(taille, poids)}`);
    });
});
