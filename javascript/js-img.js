/**
 * this function calculate the IMC of the user
 * @param {*} p the first parameter is the the weight of the user
 * @param {*} t the second parameter is the height of the user
 * @returns IMC the body mass index
 */
 function calculerImc(t, p) {
    const imc = (Math.round((p / (t * t)) * 100) / 100).toFixed(1);
    return imc;
}

/**
 * this function calculate the IMG of the user
 */
 function calculerImg(imc, age, sexeValue) {
    const img = (Math.round(((1.2 * imc) + (0.23 * age) - (10.8 * sexeValue) - 5.4) * 100) / 100).toFixed(2);
    return img;
}

$(function () {

    $("#calcul-img").on("click", function () {
        let sexeValue = $("input[name='sexe']:checked").val();
        let taille = $("#taille-img").val() / 100;
        let poids = $("#poids-img").val();
        let age = $("#age-img").val();
        let imc = calculerImc(taille, poids);
        let img = calculerImg(imc, age, sexeValue);
        let genderString = "";
        if(sexeValue == 0){
            genderString = "femme";
        }else {
            genderString = "homme"
        }
        $(".afficheImg-paragraph").text(`Pour un ${genderString} de ${age} ans dont l'IMC vaut ${imc}, l'indice de masse grasse est de ${img} .`);
    });
});