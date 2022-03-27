let intervalles = ["moins de 16.5", "16,5 a 18,5", "18,5 a 25", "25 a 30", "30 a 35", "35 a 40", "40 et plus"];
let description = ["denutrition", "maigreur", "poids normal", "surpoids", "obesite modree", "obesite severe", "obesite morbide ou massive"]

$(function() {
    for(let i = 0 ; i < intervalles.length ; i++){
        $(".tableBody").append($("<tr>"));
        $(".tableBody tr:last-child").append($("<td>").text(intervalles[i]));
        $(".tableBody tr:last-child").append($("<td>").text(description[i]));
    };
    $("#calcul").on("click", function() {
        const taille = $("#taille").val()/100;
        const poids = $("#poids").val();
        alert(`votre taille est : ${taille} m`);
    });
});
