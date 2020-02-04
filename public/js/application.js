document.forms[0].addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target.value);
    const general = document.getElementById('general').value;
    const demography = document.getElementById('demography').value;
    const response = await fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            general,
            demography,
        }),
    });
    const result = await response.json();
    if (result.status) { window.location = '/upload';}
    else {
        document.getElementById('error-input').innerHTML = 'Введен неверный username или e-mail';
    }
});