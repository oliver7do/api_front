const REGISTERFORM = $("#registerForm");
const LOGINFORM = $("#loginForm");
const MESSAGEFROM = $("#messageForm");
let interlocutor = null;
getUserList();

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

// au click sur le bouton envoyer message
MESSAGEFROM.on('submit', (e) => {
    e.preventDefault();
    // recuperation du message
    let message = $("#message").val();
    let action = $("#action").val();
    let expeditor = localStorage.getItem("iduser");
    let receiver = interlocutor;
    // appel de la fonction 
    sendMessage(expeditor, receiver, message, action);
})

// fonction register
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
    // fetch
    fetch("http://localhost/api_back/", dataOption)
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data);
                    localStorage.setItem("iduser", data.userInfo.id_user)
                    window.location.href = "index.html";
                })
                .catch(error => error);
        })

        .catch(error => console.log("il y a une erreur."))
}

// fonction pour obtenir la liste des utilisateurs
function getUserList() {
    fetch("http://localhost/api_back/getuserlist/")
        .then(response => {
            response.json()
                .then(data => {
                    // console.log(data);
                    // appel de printUsers
                    printUsers(data.users);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

// fonction pour afficher la liste des user
function printUsers(listUser) {
    // console.log(listUser)
    listUser.forEach(element => {
        // creer une balise p en lui ajoutant le prenom de l'utilisateur comme texte
        // let p = $("p").append(element.firstname);
        let p = document.createElement("p");
        p.textContent = element.firstname;
        p.id = element.id_user;

        p.addEventListener("click", () => {
            // console.log(localStorage.getItem("iduser"), p.id);
            getListMessage(localStorage.getItem("iduser"), p.id);
            interlocutor = p.id;
        })
        // on ajoute le paragraphe comme enfant de la div avec la class user_list
        $("#user_list").append(p);
    });
}


// fonction pour avoir la liste des messages entre 2 utilisateurs getMessage

function getListMessage(expeditor, receiver) {
    fetch("http://localhost/api_back/getListMessage/" + expeditor + "/" + receiver)
        .then(response => {
            response.json()
                .then(data => {
                    // console.log(data);
                    // appel de printUsers
                    printMessages(data.listMessage);
                    // console.log(data);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

// fonction pour afficher la liste des mensage entre 2 users
function printMessages(listMessage) {
    document.getElementById("discution").innerHTML = "";
    listMessage.forEach(element => {

        // on crée une div et un paragraphe
        let div = document.createElement("div");
        let p = document.createElement("p");
        // on ajoute paragraphe a la div
        div.append(p);
        // on ajoute au paragraphe son text
        p.textContent = element.message;
        if (element.expeditor_id == localStorage.getItem("iduser")) {
            div.className = "expediteur";
        } else {
            div.className = "recepteur";
        }
        $("#discution").append(div);
    })
}

// fonction pour envoyer un message
function sendMessage(expeditor, receiver, message, action) {
    let data = {
        expeditor: expeditor,
        receiver: receiver,
        message: message,
        action: action
    };
    let dataOption = {
        method: "post",
        body: JSON.stringify(data)
    };
    // on envoi la requete vers l'api
    fetch("http://localhost/api_back/", dataOption)
        .then((response) => {
            response.json()
                .then(data => {
                    console.log(data);
                    getListMessage(expeditor, receiver);
                })
                .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
}