const contacts = [];

function addContact() {
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;

    if (!validateInput(name, mobile, email)) {
        document.getElementById('error').innerText = 'Please check the input format and fill in all fields.';
        document.getElementById('error').style.display = 'block';
        return;
    }

    contacts.push({ name, mobile, email });

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('email').value = '';

    displayContacts();
}

function validateInput(name, mobile, email) {
    const namePattern = /^[A-Za-z ]{1,20}$/;
    const mobilePattern = /^\d{10}$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    return namePattern.test(name) && mobilePattern.test(mobile) && emailPattern.test(email);
}

function displayContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    for (const contact of contacts) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${contact.name}</td><td>${contact.mobile}</td><td>${contact.email}</td>`;
        contactList.appendChild(row);
    }
}

function sortTable() {
    const table = document.getElementById('contactTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        const nameA = a.getElementsByTagName('td')[0].textContent;
        const nameB = b.getElementsByTagName('td')[0].textContent;
        return nameA.localeCompare(nameB);
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

function filterContacts() {
    const searchTerm = document.getElementById('search').value;
    const filteredContacts = contacts.filter(contact => contact.mobile.includes(searchTerm));

    const noResultDiv = document.getElementById('noResult');
    if (filteredContacts.length === 0) {
        noResultDiv.style.display = 'block';
    } else {
        noResultDiv.style.display = 'none';
    }

    displayFilteredContacts(filteredContacts);
}

function displayFilteredContacts(filteredContacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    for (const contact of filteredContacts) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${contact.name}</td><td>${contact.mobile}</td><td>${contact.email}</td>`;
        contactList.appendChild(row);
    }
}