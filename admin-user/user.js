const availableForms = document.getElementById('available-forms');

function displayForm(form, index) {
    const responseType = form.responseType;
    const options = form.options || [];

    let responseInput = '';

    switch (responseType) {
        case 'multiple_choice':
            responseInput = options.map((option, i) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="response-${index}" id="response-${index}-${i}" value="${option}">
                    <label class="form-check-label" for="response-${index}-${i}">
                        ${option}
                    </label>
                </div>
            `).join('');
            break;
        case 'checkbox':
            responseInput = options.map((option, i) => `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="response-${index}" id="response-${index}-${i}" value="${option}">
                    <label class="form-check-label" for="response-${index}-${i}">
                        ${option}
                    </label>
                </div>
            `).join('');
            break;
        case 'dropdown':
            responseInput = `
                <select id="response-${index}" class="form-select">
                    ${options.map((option) => `<option value="${option}">${option}</option>`).join('')}
                </select>
            `;
            break;
        case 'short_answer':
        default:
            responseInput = `<input type="text" class="form-control" id="response-${index}" required>`;
            break;
    }

    return `
        <h5 class="card-title">${form.title}</h5>
        <p class="card-text">${form.question}</p>
        <form id="user-form-${index}" onsubmit="submitForm(event, ${index})">
            <div class="mb-3">
                <label for="response-${index}" class="form-label">Respuesta</label>
                ${responseInput}
            </div>
            <button type="submit" class="btn btn-primary">Enviar respuesta</button>
        </form>
    `;
}

function displayForms() {
    let forms = JSON.parse(localStorage.getItem('forms')) || [];
    availableForms.innerHTML = '';

    forms.forEach((form, index) => {
        const formDiv = document.createElement('div');
        formDiv.innerHTML = displayForm(form, index);
        availableForms.appendChild(formDiv);
    });
}

function submitForm(event, index) {
    event.preventDefault();

    let form = JSON.parse(localStorage.getItem('forms'))[index];
    let responseType = form.responseType;
    let response;

    if (responseType === 'checkbox') {
        response = Array.from(document.querySelectorAll(`input[name="response-${index}"]:checked`)).map(checkbox => checkbox.value);
    } else {
        response = document.getElementById(`response-${index}`).value;
    }


    saveResponse(index, response);

    document.getElementById(`user-form-${index}`).reset();
    alert('Respuesta enviada');
}






function generateAnswerField(form, index) {
    switch (form.responseType) {
        case "multiple_choice":
            return form.options.map((option, optionIndex) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="response-${index}" id="option${optionIndex}-${index}" value="${option}" required>
                    <label class="form-check-label" for="option${optionIndex}-${index}">${option}</label>
                </div>
            `).join('');
        case "checkbox":
            return form.options.map((option, optionIndex) => `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="option${optionIndex}-${index}" value="${option}">
                    <label class="form-check-label" for="option${optionIndex}-${index}">${option}</label>
                </div>
            `).join('');
        case "dropdown":
            return `
                <select id="response-${index}" class="form-select" required>
                    <option value="" disabled selected>Selecciona una opción</option>
                    ${form.options.map((option) => `<option value="${option}">${option}</option>`).join('')}
                </select>
            `;
        case "short_answer":
            return `
                <input type="text" id="response-${index}" class="form-control" required>
            `;
        default:
            return "";
    }
}




function saveResponse(formIndex, response) {
    let responses = JSON.parse(localStorage.getItem('responses')) || [];

    responses.push({
        formIndex: formIndex,
        response: response
    });

    localStorage.setItem('responses', JSON.stringify(responses));
}

function logout() {
    window.location.href = "../index.html";
}

displayForms();
