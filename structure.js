const REGISTERFORM = $("#registerForm");
const LOGINFORM = $("#loginForm");
REGISTERFORM.on('submit', (e) => {
    // pour empecher l'envoi du formulaire
    e.preventDefault();
    // recuperer les infos de l'user
    let pseudo = $("#pseudo").val();
    let firstName = $("#firstname").val();
    let lastName = $("#lastname").val();
    let password = $("#password").val();
    let action = $("#action").val();
    // appel de la fonction register
    register(pseudo, firstName, lastName, password, action);
});


LOGINFORM.on('submit', (e) => {
    // pour empecher l'envoi du formulaire
    e.preventDefault();
    // recuperer les infos de l'user
    let pseudo = $("#pseudo").val();
    let password = $("#password").val();
    let action = $("#action").val();
    // appel de la fonction LOGIN
    login(pseudo, password, action);
});

function register(pseudo, firstName, lastName, password, action) {
    let data = {
        pseudo: pseudo,
        password: password,
        firstname: firstName,
        lastname: lastName,
        action: action
    }

    let dataOption = {
        method: "post",
        body: JSON.stringify(data),
    }
    //
    fetch("http://localhost/api_back/", dataOption)
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log("promesse non tenue...")
                })
        })
    .catch(error => console.log("tu me l'avais promis en tous cas..."))
}

// Login
function login(pseudo, password, action) {
    let data = {
        pseudo: pseudo,
        password: password,
        action: action
    }
    let dataOption = {
        method: "post",
        body: JSON.stringify(data),
    }
    fetch("http://localhost/api_back/", dataOption)
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data);
                    // localStorage.drtItem("iduser", )
                    window.location.href("");
                })
                .catch(error => error);
        })
       
        .catch(error => console.log("il y a une erreur."))
}