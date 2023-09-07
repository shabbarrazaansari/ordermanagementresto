// Function to add an item to the CRUD API
function savetocrudcrud(event) {
    event.preventDefault();
    const pricevalue = document.getElementById("price").value;
    const optionselection = document.getElementById("options").value;
    const tableselection = document.getElementById("table").value;

    const obj = {
        pricevalue,
        optionselection,
        tableselection
    };

    axios.post("https://crudcrud.com/api/1a71b01c93414bdc9ea375f8241f00af/view", obj)
        .then((response) => {
            showmeonscreen(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Function to display data from the API and add Delete functionality
function showmeonscreen(obje) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`Price: ${obje.pricevalue}, Dish: ${obje.optionselection}`));

    const deletebtn = document.createElement("button");
    deletebtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(deletebtn);

    const tableSelection = obje.tableselection;
    const table = document.getElementById(`table${tableSelection}`);

    table.appendChild(li);

    deletebtn.addEventListener("click", () => {
        deletedata(obje._id, tableSelection, li);
    });
}

// Function to fetch data from the API and populate the table
function fetchdata() {
    axios("https://crudcrud.com/api/1a71b01c93414bdc9ea375f8241f00af/view")
        .then((response) => {
            response.data.forEach((obj) => {
                showmeonscreen(obj);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

// Function to delete data from the API and remove it from the table
async function deletedata(id, tableSelection, liElement) {
    try {
        await axios.delete(`https://crudcrud.com/api/1a71b01c93414bdc9ea375f8241f00af/view/${id}`);
        // Remove the list item from the appropriate table
        document.getElementById(`table${tableSelection}`).removeChild(liElement);
    } catch (err) {
        console.log(err);
    }
}

// Function to prevent automatic page refresh (remove setTimeout)
function refresh() {
    // Remove the setTimeout function
    // setTimeout(() => {location.reload()}, 500);
}

// Add an event listener to the form for form submission
const form = document.querySelector("form");
form.addEventListener("submit", savetocrudcrud);

// Initialize data fetching when the page loads
window.addEventListener("DOMContentLoaded", () => {
    fetchdata();
});
