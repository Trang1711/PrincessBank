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


        // Toggle dropdown menu
        function toggleDropdown() {
            const dropdown = document.getElementById('dropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }

        // Hide dropdown if clicked outside
        window.onclick = function(event) {
            if (!event.target.matches('.avatar')) {
                const dropdown = document.getElementById('dropdown');
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                }
            }
        }
        let transactionHistory = []; // Mảng để lưu lịch sử giao dịch

       let isBalanceVisible = false;
        let balanceAmount = 1000000000; // Số dư tài khoản mặc định
        const creditDebtAmount = 2000000; // Số tiền nợ tín dụng mặc định

        let stateStack = []; // Stack để lưu trữ trạng thái trước khi thực hiện thao tác
        let redoStack = []; // Stack cho redo
        let incorrectPasswordAttempts = 0; // Counter for incorrect password attempts
        const MAX_ATTEMPTS = 3; // Maximum allowed attempts before account lock
        let isAccountLocked = false; // Flag to check if account is locked

        const correctPassword = "your_password"; // Replace with actual password for checking


// Hàm lưu trạng thái hiện tại trước khi thực hiện giao dịch mới
        function saveState() {
            stateStack.push({
                balanceAmount: balanceAmount,
                creditDebtAmount: creditDebtAmount,
                isBalanceVisible: isBalanceVisible
            });
            redoStack = []; // Reset redo stack khi có thao tác mới
        }

// Hàm Undo - quay lại trạng thái trước đó
function undoAction() {
    if (stateStack.length > 0) {
        redoStack.push({
            balanceAmount: balanceAmount,
            creditDebtAmount: creditDebtAmount,
            isBalanceVisible: isBalanceVisible
        });
        const lastState = stateStack.pop();
        balanceAmount = lastState.balanceAmount;
        creditDebtAmount = lastState.creditDebtAmount;
        isBalanceVisible = lastState.isBalanceVisible;
        updateBalanceDisplay();
    } else {
        alert("Không có thao tác nào để hoàn tác.");
    }
}

// Hàm Redo - lặp lại trạng thái sau khi đã Undo
function redoAction() {
    if (redoStack.length > 0) {
        stateStack.push({
            balanceAmount: balanceAmount,
            creditDebtAmount: creditDebtAmount,
            isBalanceVisible: isBalanceVisible
        });
        const nextState = redoStack.pop();
        balanceAmount = nextState.balanceAmount;
        creditDebtAmount = nextState.creditDebtAmount;
        isBalanceVisible = nextState.isBalanceVisible;
        updateBalanceDisplay();
    } else {
        alert("Không có thao tác nào để làm lại.");
    }
}

// Hàm cập nhật số dư và nợ tín dụng lên giao diện
function updateBalanceDisplay() {
    document.getElementById('balance').innerText = isBalanceVisible ? balanceAmount.toLocaleString() : '********';
}

        function registerUser() {
            const username = document.getElementById('reg-username').value;
            const cccd = document.getElementById('reg-cccd').value;
            const phone = document.getElementById('reg-phone').value;
            const address = document.getElementById('reg-address').value;
            const password = document.getElementById('reg-password').value;
            
            if (username && cccd && phone && address && password) {
                alert("Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.");
                
                // Chuyển sang form đăng nhập
                toggleForms();
            } else {
                alert("Vui lòng điền đầy đủ thông tin.");
            }
        }

        function showAccount() {
            const username = document.getElementById('username').value;
            document.getElementById('greeting').innerText = `Xin chào, ${username}`;
            document.getElementById('login').classList.remove('active');
            document.getElementById('account').classList.add('active');
            updateBalanceDisplay();
        }

        function toggleForms() {
            const registerForm = document.getElementById('register');
            const loginForm = document.getElementById('login');
            registerForm.classList.toggle('active');
            loginForm.classList.toggle('active');
        }

        function toggleBalance() {
            saveState();
            isBalanceVisible = !isBalanceVisible;
            updateBalanceDisplay();
        }


        function openModal(type) {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalInput = document.getElementById('modal-input');
            const modalDescription = document.getElementById('modal-description');
            
            modal.style.display = 'flex';
            modalInput.value = '';
            modalInput.placeholder = 'Nhập số tiền';

            switch (type) {
                case 'withdraw':
                    modalTitle.innerText = 'Rút tiền';
                    modalDescription.innerText = 'Nhập số tiền bạn muốn rút:';
                    break;
                case 'transfer':
                    modalTitle.innerText = 'Chuyển tiền';
                    modalDescription.innerText = 'Nhập số tiền bạn muốn chuyển:';
                    break;
                case 'payDebt':
                    modalTitle.innerText = 'Sao kê';
                    showTransactionHistory(); // Hiển thị sao kê
                    break;
                case 'payCredit':
                    modalTitle.innerText = 'Thanh toán tín dụng';
                    modalDescription.innerText = 'Nhập số tiền bạn muốn thanh toán tín dụng:';
                    break;
                case 'precharge':   
                    modalTitle.innerText = 'Nạp tiền ';
                    modalDescription.innerText = 'Nhập số tiền bạn muốn chuyển vào tài khoản:';
                    break;
                  
            }
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // Hàm hiển thị sao kê
        function showTransactionHistory() {
            const transactionList = document.getElementById('transaction-list');
            transactionList.innerHTML = '';

            transactionHistory.forEach(transaction => {
                const listItem = document.createElement('li');
                listItem.innerText = `${transaction.time}: ${transaction.type} - ${transaction.amount.toLocaleString()} VND`;
                transactionList.appendChild(listItem);
            });

                document.getElementById('transaction-history').style.display = 'block';
            }

            let password = "123"; // Nhập đúng mật khẩu 
            let failedAttempts = 0; // Đếm số lần nhập sai mật khẩu

            function handleTransaction() {
                    if (!promptPassword()) {
                alert("Giao dịch bị hủy do nhập sai mật khẩu quá 3 lần.");
                return; // Hủy giao dịch nếu sai mật khẩu 3 lần
            }

            const inputAmount = parseFloat(document.getElementById('modal-input').value);
            if (isNaN(inputAmount) || inputAmount <= 0) {
                alert('Số tiền không hợp lệ.');
                return;
    }


            saveState(); // Lưu trạng thái trước khi thực hiện giao dịch
            const modalTitle = document.getElementById('modal-title').innerText;

            switch (modalTitle) {
        case 'Rút tiền':
            if (inputAmount > balanceAmount) {
                alert('Số dư không đủ để rút số tiền này.');
                return;
            } else {
                balanceAmount -= inputAmount;
                transactionType = 'Rút tiền';
                alert(`Bạn đã rút ${inputAmount.toLocaleString()} VND.`);
            }
            break;

        case 'Chuyển tiền':
            if (inputAmount > balanceAmount) {
                alert('Số dư không đủ để chuyển số tiền này.');
                return;
            } else {
                balanceAmount -= inputAmount;
                transactionType = 'Chuyển tiền';
                alert(`Bạn đã chuyển ${inputAmount.toLocaleString()} VND.`);
            }
            break;

        case 'Thanh toán tín dụng':
            if (inputAmount > balanceAmount) {
                alert('Số dư không đủ để thanh toán tín dụng.');
                return;
            } else {
                balanceAmount -= inputAmount;
                transactionType = 'Thanh toán tín dụng';
                alert(`Bạn đã thanh toán tín dụng ${inputAmount.toLocaleString()} VND.`);
            }
            break;

        case 'Nạp tiền':
            balanceAmount += inputAmount;
            transactionType = 'Nạp tiền';
            alert(`Bạn đã nạp ${inputAmount.toLocaleString()} VND vào tài khoản.`);
            break;

        default:
            alert('Giao dịch không hợp lệ.');
            return;
    }

    // Thêm giao dịch vào transactionHistory
    transactionHistory.push({
        type: transactionType,
        amount: inputAmount,
        time: getFormattedDate()
    });
       // Hiển thị hóa đơn sau mỗi giao dịch
        generateInvoice(transactionType, inputAmount);
        updateBalanceDisplay();
        closeModal();
        }
    // Update generateInvoice to include bank name if provided
    function generateInvoice(transactionType, amount, accountNumber = '', bankName = '') {
        const transactionTime = new Date().toLocaleString();
        const invoiceNumber = 'HD' + Math.floor(Math.random() * 1000000);

        let invoiceDetails = `Hóa Đơn: ${invoiceNumber}\n`;
        invoiceDetails += `Loại giao dịch: ${transactionType}\n`;
        invoiceDetails += `Số tiền: ${amount.toLocaleString()} VND\n`;
        invoiceDetails += `Thời gian giao dịch: ${transactionTime}\n`;

        if (transactionType === 'Chuyển tiền' && accountNumber) {
            invoiceDetails += `Số tài khoản nhận: ${accountNumber}\n`;
            invoiceDetails += `Ngân hàng nhận: ${bankName}\n`;
        }

        alert(invoiceDetails); // Display the invoice
    }    
    // khóa mk
    function promptPassword() {
    for (let i = 0; i < 3; i++) {
        const inputPassword = prompt("Nhập mật khẩu của bạn:");
        if (verifyPassword(inputPassword)) {
            return true; // Nếu mật khẩu đúng, tiếp tục giao dịch
        } else {
            alert("Mật khẩu không chính xác.");
            failedAttempts++;
            if (failedAttempts >= 3) {
                return false; // Nếu sai 3 lần, hủy giao dịch
            }
        }
    }
    return false;
}

function verifyPassword(inputPassword) {
    return inputPassword === password;
}
        let invoiceCounter = 1; // Khởi tạo bộ đếm số hóa đơn

function getFormattedDate() {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

function generateInvoice(transactionType, amount) {
    const transactionTime = new Date().toLocaleString();
    const invoiceNumber = 'HD' + Math.floor(Math.random() * 1000000);

    // Tạo chi tiết hóa đơn
    let invoiceDetails = `Hóa Đơn: ${invoiceNumber}\n`;
    invoiceDetails += `Loại giao dịch: ${transactionType}\n`;
    invoiceDetails += `Số tiền: ${amount.toLocaleString()} VND\n`;
    invoiceDetails += `Thời gian giao dịch: ${transactionTime}\n`;

    // Hiển thị hóa đơn
    alert(invoiceDetails); // Hiển thị hóa đơn qua alert
}


function showInvoice(type, amount) {
        const invoiceSection = document.getElementById('invoice-section');
        const invoiceDetails = document.getElementById('invoice-details');

        invoiceSection.style.display = 'block'; // Hiển thị phần hóa đơn
        invoiceDetails.innerText = `Loại giao dịch: ${type}\nSố tiền: ${amount.toLocaleString()} VND\nThời gian: ${getFormattedDate()}`;
    }


    function showInvoice(type, amount) {
        const invoiceSection = document.getElementById('invoice-section');
        const invoiceDetails = document.getElementById('invoice-details');
        
        invoiceSection.style.display = 'block'; // Hiển thị phần hóa đơn
        invoiceDetails.innerText = `Loại giao dịch: ${type}\nSố tiền: ${amount.toLocaleString()} VND\nThời gian: ${getFormattedDate()}`;
    
    function getFormattedDate() {
        const now = new Date();
        return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }

    function generateInvoice(transactionType, amount, accountNumber = '') {
        const transactionTime = new Date().toLocaleString();
        const invoiceNumber = 'HD' + Math.floor(Math.random() * 1000000); // Generate random invoice number

        let invoiceDetails = `Hóa Đơn: ${invoiceNumber}\n`;
        invoiceDetails += `Loại giao dịch: ${transactionType}\n`;
        invoiceDetails += `Số tiền: ${amount.toLocaleString()} VND\n`;
        invoiceDetails += `Thời gian giao dịch: ${transactionTime}\n`;

        if (transactionType === 'Chuyển tiền' && accountNumber) {
            invoiceDetails += `Số tài khoản nhận: ${accountNumber}\n`;
        }

        alert(invoiceDetails); // Display or log the invoice
    }
    closeModal();
}
function showInvoice(type, amount) {
        const invoiceSection = document.getElementById('invoice-section');
        const invoiceDetails = document.getElementById('invoice-details');

        invoiceSection.style.display = 'block'; // Hiển thị phần hóa đơn
        invoiceDetails.innerText = `Loại giao dịch: ${type}\nSố tiền: ${amount.toLocaleString()} VND\nThời gian: ${getFormattedDate()}`;
    }
    
        function updateBalanceDisplay() {
            document.getElementById('balance').innerText = isBalanceVisible ? balanceAmount.toLocaleString() : '********';
        }

       function showTransactionHistory() {
    let historyContent = "Sao Kê Giao Dịch:\n";
    transactionHistory.forEach((transaction, index) => {
        historyContent += `\nGiao dịch #${index + 1}\n`;
        historyContent += `Loại: ${transaction.type}\n`;
        historyContent += `Số tiền: ${transaction.amount.toLocaleString()} VND\n`;
        historyContent += `Thời gian: ${transaction.time}\n`;
    });

    if (transactionHistory.length === 0) {
        historyContent += "Không có giao dịch nào được ghi nhận.";
    }

    alert(historyContent);
} 
