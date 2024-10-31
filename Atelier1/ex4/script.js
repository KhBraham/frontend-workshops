$(document).ready(function() {
    // Sélection des éléments du formulaire
    let $nameField = $("#name");
    let $emailField = $("#email");
    let $passwordFields = $(".password-field");
    let $submitButton = $("#submit-btn");
    let $resetButton = $("#reset-btn");

    // Fonction de validation de l'email
    function validateEmail(email) {
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Fonctionnalité du bouton "S'inscrire"
    $submitButton.click(function() {
        // Réinitialisation des styles de bordure
        $("input").removeClass("error");

        let errors = false;

        // Vérification des champs vides
        if ($nameField.val().trim() === "") {
            $nameField.addClass("error");
            errors = true;
        }
        if ($emailField.val().trim() === "") {
            $emailField.addClass("error");
            errors = true;
        }
        $passwordFields.each(function() {
            if ($(this).val().trim() === "") {
                $(this).addClass("error");
                errors = true;
            }
        });

        // Vérification du format de l'email
        if (!validateEmail($emailField.val())) {
            $emailField.addClass("error");
            errors = true;
        }

        // Vérification de la correspondance des mots de passe
        if ($passwordFields.eq(0).val() !== $passwordFields.eq(1).val()) {
            $passwordFields.addClass("error");
            errors = true;
        }

        // Affichage du message de succès ou d'erreur
        if (!errors) {
            alert("Inscription réussie !");
        } else {
            alert("Veuillez corriger les erreurs dans le formulaire.");
        }
    });

    // Fonctionnalité du bouton "Effacer"
    $resetButton.click(function() {
        $("input").val(""); // Réinitialise tous les champs
        $("input").removeClass("error"); // Enlève la bordure rouge des erreurs
    });
});