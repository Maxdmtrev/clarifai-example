document.forms[0].addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const result = await response.json();
    if (result.status) { window.location = '/channel';}
    else {
        document.getElementById('error-input').innerHTML = 'Введен неверный username или e-mail';
    }
});