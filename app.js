const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = [
        { username: 'admin', password: 'admin123', userType: 'admin' },
        { username: 'user', password: 'user123', userType: 'user' }
    ];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        if (user.userType === 'admin') {
            window.location.href = '/admin-user/admin.html';
        } else {
            window.location.href = '/admin-user/user.html';
        }
    } else {
        alert('Usuario o contraseña incorrecta');
    }
});
