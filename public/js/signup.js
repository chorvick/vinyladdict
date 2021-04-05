async function signupFormHandler(event) {
    event.preventDefault();


    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/mdodels/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');

        } else {
            alert(response.statusText);
            alert('Failed to sign up')
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);