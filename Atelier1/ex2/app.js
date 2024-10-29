
const genresData = [
    { "id": 1, "name": "Roman" },
    { "id": 2, "name": "Science-fiction" },
    { "id": 3, "name": "Policier" }
];


document.addEventListener("DOMContentLoaded", () => {
    const genreSelect = document.getElementById("genre");
    genresData.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.name;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
});

document.getElementById("addButton").addEventListener("click", () => {
    const ref = document.getElementById("ref").value;
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const genre = document.getElementById("genre").value;
    const copies = parseInt(document.getElementById("copies").value);
    const bookList = document.getElementById("bookList");

    let isValid = true;


    if (!/^L\d{3}$/.test(ref)) {
        document.getElementById("refError").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("refError").classList.add("hidden");
    }


    if (title.length < 2 || title.length > 50) {
        document.getElementById("titleError").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("titleError").classList.add("hidden");
    }


    if (isNaN(copies) || copies <= 0) {
        document.getElementById("copiesError").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("copiesError").classList.add("hidden");
    }


    const existingBook = [...bookList.rows].some(row => row.cells[0].textContent === ref);
    if (existingBook) {
        alert("Ce livre est déjà dans la liste.");
        isValid = false;
    }


    if (isValid) {
        const row = bookList.insertRow();
        row.innerHTML = `
            <td class="border px-4 py-2">${ref}</td>
            <td class="border px-4 py-2">${title}</td>
            <td class="border px-4 py-2">${genre}</td>
            <td class="border px-4 py-2">${date}</td>
            <td class="border px-4 py-2">${copies}</td>
            <td class="border px-4 py-2">
                <button class="borrowButton px-2 py-1 bg-green-500 text-white rounded" ${copies === 0 ? "disabled" : ""}>
                    Emprunter
                </button>
            </td>
        `;


        row.querySelector(".borrowButton").addEventListener("click", function() {
            let cell = this.closest("tr").cells[4];
            let count = parseInt(cell.textContent);
            if (count > 0) {
                count--;
                cell.textContent = count;
            }
            if (count === 0) {
                this.disabled = true;
                this.classList.add("bg-gray-500");
            }
        });
    }
});
