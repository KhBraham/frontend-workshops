const livresData = [
    {"ISBN": "01234", "titre": "Langage C", "image": "langagec.png", "prix": 150},
    {"ISBN": "56789", "titre": "Programmation Javascript", "image": "javascript.jpg", "prix": 250},
    {"ISBN": "11778", "titre": "Laravel", "image": "laravel.png", "prix": 200}
];

const panier = [];
let totalPrix = 0;

function charger() {
    const select = document.getElementById("bookSelect");
    livresData.forEach((livre, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = livre.titre;
        select.appendChild(option);
    });
}


function afficher() {
    const select = document.getElementById("bookSelect");
    const index = select.value;
    const detailsDiv = document.getElementById("bookDetails");

    if (index !== "") {
        const livre = livresData[index];
        detailsDiv.innerHTML = `
            <h3>${livre.titre}</h3>
            <img src="${livre.image}" alt="${livre.titre}" style="width:100px;">
            <p>Prix: ${livre.prix}</p>
        `;
    } else {
        detailsDiv.innerHTML = "";
    }
}


function ajouter() {
    const select = document.getElementById("bookSelect");
    const index = select.value;

    if (index !== "") {
        const livre = livresData[index];
        panier.push(livre);
        totalPrix += livre.prix;
        updateCart();
    }
}


function retirer(isbn) {
    const index = panier.findIndex(item => item.ISBN === isbn);
    if (index !== -1) {
        totalPrix -= panier[index].prix;
        panier.splice(index, 1);
        updateCart();
    }
}


function updateCart() {
    const cartTableBody = document.getElementById("cartTable").querySelector("tbody");
    cartTableBody.innerHTML = "";
    
    panier.forEach(livre => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${livre.ISBN}</td>
            <td>${livre.titre}</td>
            <td><img src="${livre.image}" alt="${livre.titre}" style="width:50px;"></td>
            <td>${livre.prix}</td>
            <td><button onclick="retirer('${livre.ISBN}')">Retirer</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById("totalPrice").textContent = `Prix total à payer: ${totalPrix}`;
}

charger();
