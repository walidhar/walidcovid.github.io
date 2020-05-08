/////////// Variable ////////
const demarage = document.getElementById("demarer");
let sect = document.querySelectorAll(".sect");
let question = document.querySelector(".questions");
const suivant = document.getElementById("suivant");
const precedent = document.getElementById("precedent");
const afficheResultat = document.getElementById("resultat");
let progress = document.getElementById("file");
let afficheNum = document.getElementById("afficheNum");
let messageFinal = document.getElementById("affichageResult");
var conter = 0;
var resultat = [];
let valeur = 1;
tabSymptome = [];
tabfacteurPronostique = [];
tabfacteurMineur = [];
tabfacteurMajeur = [];

resultSyptome = 0;
resultFacteurPronostique = 0;
resultfacteurMineur = 0;
resultfacteurMajeur = 0;

//////////////// Demarage //////////
demarage.addEventListener("click", () => {
    sect[0].classList.add("affiche");
    sect[1].classList.remove("affiche");
    question.innerHTML = questions[0];
    inputs = document.querySelectorAll(".answer-inputs input");
    precedent.classList.add("affiche");
    suivant.setAttribute("disabled", "disabled");
    progressBar(conter, valeur);
    recuperation();
});
/////// ProgresseBar //////////////////
progressBar = (e, x) => {
    progress.setAttribute("value", e + 1);
    afficheNum.innerHTML = x + "/" + questions.length;
};

///// Suivant //////
suivant.addEventListener("click", (e) => {
    if (conter < questions.length - 1) {
        valeur++;
        conter++;
    }
    if (conter == questions.length - 1) {
        suivant.classList.add("affiche");
        afficheResultat.classList.remove("affiche");
    }
    question.innerHTML = questions[conter];
    inputs = document.querySelectorAll(".answer-inputs input");
    precedent.classList.remove("affiche");
    suivant.setAttribute("disabled", "disabled");
    progressBar(conter, valeur);
    recuperation();
    e.preventDefault();
});
////////////// Precedent ////////////////////
precedent.addEventListener("click", (e) => {
    afficheResultat.classList.add("affiche");
    suivant.classList.remove("affiche");
    if (conter > 0) {
        conter--;
        valeur--;
    }
    if (conter == 0) {
        precedent.classList.add("affiche");
    }
    question.innerHTML = questions[conter];
    inputs = document.querySelectorAll(".answer-inputs input");
    recuperation();
    progressBar(conter, valeur);
    e.preventDefault();
});
////// recuperation des resultat ///////////////////
recuperation = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", () => {
            if (inputs.length == 1) {
                resultat.splice(conter, 1, inputs[0].value);
                suivant.removeAttribute("disabled");
            } else {
                if (inputs[i].checked == true) {
                    resultat.splice(conter, 1, inputs[i].value);
                    suivant.removeAttribute("disabled");
                }
            }
        });
    }
};


///// affiche resultat ////

afficheResultat.addEventListener("click", (e) => {
    sect[1].classList.add("affiche");
    sect[2].classList.remove("affiche");
    e.preventDefault();
    trireponces();
    nombreDeFacteur();
    Algorithme();

});


// tri repon

trireponces = () => {

    for (let i = 0; i < resultat.length; i++) {
        if (i == 1) {
            tabfacteurMineur.push(resultat[i]);
            tabfacteurMajeur.push(resultat[i]);
        } else if (i >= 11 && i <= 21) {
            tabfacteurPronostique.push(resultat[i]);
        } else if (i == 7 || i == 8) {
            tabfacteurMajeur.push(resultat[i]);
        } else if (i == 6 || i == 9) {
            tabfacteurMineur.push(resultat[i]);
        }
        if (i >= 0 && i <= 9) {
            tabSymptome.push(resultat[i]);

        }
    }
};

// le nombres des facteurs

nombreDeFacteur = () => {
    for (let i = 0; i < tabSymptome.length; i++) {
        if (tabSymptome[i] == "Oui") {
            resultSyptome++;
        }
    }
    for (let i = 0; i < tabfacteurPronostique.length; i++) {
        if (tabfacteurPronostique[i] >= 70 || tabfacteurPronostique[i] == "Oui") {
            resultFacteurPronostique++;
        }
    }
    for (let i = 0; i < tabfacteurMineur.length; i++) {

        if (
            tabfacteurMineur[i] >= 39 ||
            tabfacteurMineur[i] == "Oui" ||
            tabfacteurMineur[i] == "Très fatigué" ||
            tabfacteurMineur[i] == " fatigué"
        ) {
            resultfacteurMineur++;
        }
    }
    for (let i = 0; i < tabfacteurMajeur.length; i++) {
        if (tabfacteurMajeur[i] <= 35.4 || tabfacteurMajeur[i] == "Oui") {
            resultfacteurMajeur++;
        }
    }
};

// algo

Algorithme = () => {

    if (
        //Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée 
        resultat[0] == "Oui" ||
        (resultat[2] == "Oui" && resultat[4] == "Oui") ||
        (resultat[2] == "Oui" && resultat[3] == "Oui") ||
        (resultat[0] == "Oui" && resultat[5] == "Oui")
    ) {
        if (resultFacteurPronostique == 0) {
            if (
                resultfacteurMajeur == 0 &&
                resultfacteurMineur == 0 &&
                resultat[10] < 50
            ) {
                messageFinal.innerText = messageAffiche[0];
            } else if (
                resultfacteurMajeur == 0 &&
                resultfacteurMineur >= 1 &&
                (resultat[10] >= 50 || resultat[10] <= 69)
            ) {
                messageFinal.innerText = messageAffiche[1];
            }
        } else {
            if (resultfacteurMajeur == 0 && resultfacteurMineur <= 1) {
                messageFinal.innerText = messageAffiche[1];
            } else if (resultfacteurMajeur == 0 && resultfacteurMineur >= 2) {
                messageFinal.innerText = messageAffiche[2];
            }
        }
        if (resultfacteurMajeur >= 1) {
            messageFinal.innerText = messageAffiche[2];
        }
    } else if (resultat[0] == "Oui" && resultat[2] == "Oui") {
        if (resultFacteurPronostique == 0) {
            if (resultfacteurMajeur == 0 && resultfacteurMineur >= 1) {
                messageFinal.innerText = messageAffiche[3];
            }
        } else {
            if (resultfacteurMajeur == 0 && resultfacteurMineur <= 1) {
                messageFinal.innerText = messageAffiche[3];
            } else if (resultfacteurMajeur == 0 && resultfacteurMineur > 1) {
                messageFinal.innerText = messageAffiche[2];
            }
        }
        if (resultfacteurMajeur > 0) {
            messageFinal.innerText = messageAffiche[2];
        }
    } else if (
        resultat[0] == "Oui" ||
        resultat[2] == "Oui" ||
        resultat[3] == "Oui" ||
        resultat[4] == "Oui"
    ) {
        if (resultfacteurMajeur == 0 && resultfacteurMineur == 0) {
            messageFinal.innerText = messageAffiche[4];
        } else {
            if (resultFacteurPronostique > 0) {
                messageFinal.innerText = messageAffiche[4] + " " + messageAffiche[2];
            }
        }
    } else if (resultSyptome == 0) {
        messageFinal.innerText = messageAffiche[5];
    } else if (resultat[10] < 15) {
        messageFinal.innerText = messageAffiche[6];
    }
};


///// recommancer test /////

repeter.addEventListener("click", (e) => {
    sect[2].classList.add("affiche");
    sect[1].classList.remove("affiche");
    tabSymptome = [];
    tabfacteurPronostique = [];
    tabfacteurMineur = [];
    tabfacteurMajeur = [];
    resultSyptome = 0;
    resultFacteurPronostique = 0;
    resultfacteurMineur = 0;
    resultfacteurMajeur = 0;
    conter = 0;
    valeur = 1;
    suivant.classList.remove("affiche");
    precedent.classList.add("affiche");
    afficheResultat.classList.add("affiche");
    question.innerHTML = questions[0];
    inputs = document.querySelectorAll(".answer-inputs input");
    progressBar(conter, valeur);
    recuperation();
    e.preventDefault();
});





const questions = [

    '<p class="form__question"> Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ? </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question--c">Quelle est votre température corporelle ?</p> <div class="answer-inputs"><input type="number" name="Q2" id="degrés" min="34" max="42" placeholder="34 - 42"><span class="input-span">degrés</span></div>',

    '<p class="form__question"> Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question"> Avez-vous eu des courbatures inhabituelles au cours des derniers jours ? </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question"> Ces derniers jours, avez-vous un mal de gorge ? </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question"> Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles. </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question">Ces derniers jours, avez-vous une fatigue inhabituelle qui vous a obligé à vous reposer plus de la moitié de la journée ? </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question">Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ? </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question"> Dans les dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ? </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question--quatre">Actuellement, comment vous vous sentez ? </p><div class="answer-inputs"><div> <input type="radio" name="Q10" id="Bien"><label for="Bien"><span>Bien</span> </label> </div><div><input type="radio" name="Q10" id="Assez bien"><label for="Assez bien"><span>Assez bien</span> </label> </div> <div> <input type="radio" name="Q10" id="Fatigué(e)">  <label for="Fatigué(e)">  <span>Fatigué(e)</span> </label>    </div>    <div>        <input type="radio" name="Q10" id="Très fatigué">      <label for="Très fatigué">      <span>Très fatigué</span> </label>  </div></div>',

    '<p class="form__question--age">Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique.</p><div  class="answer-inputs""> <input type="number" id="reponce1" placeholder="17 - 120" min="17" max="120"><span class="input-span">Age</span></div><br><br></br>',

    '<p class="form__question--poids">Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.</p><div  class="answer-inputs""><input type="number" id="reponce1"  min="30" max= "200" placeholder="30 - 200"><span class="input-span">Kg</span></div><br><br></br>',

    '<p class="form__question--taille">Quelle est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.</p> <div  class="answer-inputs""><input type="number" id="reponce1" min="100" max="260" placeholder="100 - 260"><span class="input-span">Cm</span></div><br><br></br>',

    '<p class="form__question"> Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ? </p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question">Êtes-vous diabétique ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question">Avez-vous ou avez-vous eu un cancer ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question">Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question">Avez-vous une insuffisance rénale chronique dialysée ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    '<p class="form__question">Avez-vous une maladie chronique du foie ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    ' <p class="form__question--trois">Êtes-vous enceinte ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div><div><input type="radio" name="Q1" id="Homme" value ="Homme"><label for="Homme"><span>Homme</span> </label></div></div>',

    '<p class="form__question">Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

    ' <p class="form__question">Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).</p><div class="answer-inputs"><div><input type="radio" name="Q1" id="Oui" value ="Oui"><label for="Oui"><span>Oui</span> </label></div><div><input type="radio" name="Q1" id="Non" value="Non"><label for="Non"><span>Non</span> </label></div></div>',

];


messageAffiche = [
    ` nous vous conseillons de rester à votre domicile et de contacter votre médecin en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouveau l’application pour réévaluer vos symptômes. `,
    `téléconsultation ou médecin généraliste ou visite à domicile  préciser “appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.” 
   `,
    `appel 141 `,
    ` téléconsultation ou médecin généraliste ou visite à domicile  `,
    `Votre situation ne relève probablement pas du Covid-19. Consultez votre médecin au moindre doute`,
    `Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la   situation.   Pour   toute information concernant   le   Covid-19 allez vers la page d’accueil. 
   `,
    ` Prenez contact avec votre médecin généraliste au moindre doute. Cette application n’est pour l’instant pas adaptée aux personnes de moins de 15 ans. En cas d’urgence, appeler le 15. `,
];