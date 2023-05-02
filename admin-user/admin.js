const createForm = document.getElementById('create-form');
const publishedForms = document.getElementById('published-forms');
const userResponses = document.getElementById('user-responses');

function displayResponses() {
    let responses = JSON.parse(localStorage.getItem('responses')) || [];
    userResponses.innerHTML = '';

    responses.forEach((response, index) => {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = `
            <h5 class="card-title">Respuesta al formulario ${response.formIndex}</h5>
            <p class="card-text">${response.response}</p>
            <button class="btn btn-danger" onclick="deleteResponse(${index})">Eliminar respuesta</button>
        `;
        userResponses.appendChild(responseDiv);
    });
}


displayResponses();

function saveForm(form) {
    let forms = JSON.parse(localStorage.getItem('forms')) || [];
    forms.push(form);
    localStorage.setItem('forms', JSON.stringify(forms));
}

function displayForms() {
    let forms = JSON.parse(localStorage.getItem('forms')) || [];
    publishedForms.innerHTML = '';

    forms.forEach((form, index) => {
        const formDiv = document.createElement('div');
        formDiv.innerHTML = `
            <h5 class="card-title">${form.title}</h5>
            <p class="card-text">${form.question}</p>
            <button class="btn btn-danger" onclick="deleteForm(${index})">Eliminar</button>
        `;
        publishedForms.appendChild(formDiv);
    });
}

function deleteForm(index) {
    let forms = JSON.parse(localStorage.getItem('forms')) || [];
    forms.splice(index, 1);
    localStorage.setItem('forms', JSON.stringify(forms));
    displayForms();
}

function logout() {
    window.location.href = "../index.html";
}

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const question = document.getElementById('question').value;
    const responseType = document.getElementById('response-type').value;
    const options = document.getElementById('options').value.split(',');
    const correctAnswers = document.getElementById('correct-answers').value.split(',');

    saveForm({
        title: title,
        question: question,
        responseType: responseType,
        options: options,
        correctAnswers: correctAnswers
    });

    document.getElementById('create-form').reset();
    displayForms();
});

function deleteResponse(index) {
    let responses = JSON.parse(localStorage.getItem('responses')) || [];
    responses.splice(index, 1);
    localStorage.setItem('responses', JSON.stringify(responses));
    displayResponses();
}

displayForms();
