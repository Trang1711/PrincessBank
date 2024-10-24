// Function to show the selected section and hide the others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Login logic
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        showSection('withdraw');
    } else {
        alert('Incorrect username or password');
    }
});

// Register logic
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Registered successfully!');
    showSection('login');
});

// Withdraw logic
document.getElementById('withdrawForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    if (amount > 0) {
        alert(`You have withdrawn $${amount}`);
    } else {
        alert('Invalid amount');
    }
});

// Loan logic
document.getElementById('loanForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const loanAmount = document.getElementById('loanAmount').value;
    const loanTerm = document.getElementById('loanTerm').value;
    
    if (loanAmount > 0 && loanTerm > 0) {
        alert(`You have applied for a loan of $${loanAmount} for ${loanTerm} months.`);
    } else {
        alert('Invalid loan details');
    }
});
