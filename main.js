function getAndUpdate() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  // Get items from localStorage or initialize an empty array
  let itemJsonArray = localStorage.getItem("itemsJson")
    ? JSON.parse(localStorage.getItem("itemsJson"))
    : [];

  // Add the new item to the array
  itemJsonArray.push([title, description]);

  // Update localStorage with the modified array
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

  update();
}

function update() {
  let itemJsonArray = localStorage.getItem("itemsJson")
    ? JSON.parse(localStorage.getItem("itemsJson"))
    : [];

  // Populate the table
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
        <tr>
            <th scope="col">${index + 1}</th>
            <th scope="col">${element[0]}</th>
            <th scope="col">${element[1]}</th>
            <th><button class="btn btn-sm btn-danger" onclick='deleteItem(${index})'>Delete</button></th>
        </tr>
      `;
  });
  tableBody.innerHTML = str;
}

let addItem = document.getElementById("addItem");
addItem.addEventListener("click", getAndUpdate);

update();

function deleteItem(itemIndex) {
  let itemJsonArray = localStorage.getItem("itemsJson")
    ? JSON.parse(localStorage.getItem("itemsJson"))
    : [];

  // Delete itemIndex element from the array
  itemJsonArray.splice(itemIndex, 1);

  // Update localStorage with the modified array
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

  update();
}

// Removing the items entry from localStorage
function clearItems() {
  if (confirm("Do you really want to clear the table?")) {
    localStorage.removeItem("itemsJson");
    update();
  }
}
