    // Select DOM Elements
    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expense");
    const transactionList = document.getElementById("transaction-list");
    const transactionForm = document.getElementById("transaction-form");
    const nameInput = document.getElementById("name");
    const amountInput = document.getElementById("amount");

    let transactions = [];

    function updateUI() {
      // Calculate totals
      const income = transactions
        .filter(t => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);
      const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);
      const balance = income - expense;

      // Update DOM
      balanceEl.textContent = `$${balance.toFixed(2)}`;
      incomeEl.textContent = `$${income.toFixed(2)}`;
      expenseEl.textContent = `$${expense.toFixed(2)}`;

      // Update transaction list
      transactionList.innerHTML = "";
      if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transactions.</li>";
      } else {
        transactions.forEach((t, index) => {
          const li = document.createElement("li");
          li.classList.add(t.type);
          li.innerHTML = `
            ${t.name} <span>$${t.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${index})" style="background: red; color: white; border: none; border-radius: 5px; padding: 5px; width: 30px;">X</button>
          `;
          transactionList.appendChild(li);
        });
      }
    }

    function deleteTransaction(index) {
      transactions.splice(index, 1);
      updateUI();
    }

    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const amount = parseFloat(amountInput.value.trim());
      const type = transactionForm.type.value;

      if (name && !isNaN(amount)) {
        transactions.push({ name, amount, type });
        nameInput.value = "";
        amountInput.value = "";
        transactionForm.reset();
        updateUI();
      }
    });

    updateUI();