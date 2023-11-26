let secretNumber;
let balance = 100;
let attempts = 0;

function generateSecretNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function addBalance() {
  const selectedNote = document.getElementById('add-balance');
  const amount = parseInt(selectedNote.value);
  const noteImage = selectedNote.options[selectedNote.selectedIndex].getAttribute('data-image');

  if (isNaN(amount) || amount <= 0 || amount > 100) {
    alert('Entrada inválida. Por favor, insira um valor válido entre 1 e 100.');
    return;
  }

  balance += amount;
  updateBalance();

  const selectedNoteContainer = document.getElementById('selected-note-container');
  const selectedNoteImage = document.getElementById('selected-note-image');

  selectedNoteImage.src = noteImage;
  selectedNoteContainer.classList.remove('hidden');

  alert(`Adicionado com sucesso €${amount} ao seu saldo com uma nota de €${amount}.`);
}

function updateBalance() {
  document.getElementById('balance').innerText = balance;
}

function makeGuess() {
  const guessInput = parseInt(document.getElementById('guess').value);
  const betInput = parseInt(document.getElementById('bet').value);
  const enableHints = document.getElementById('hints').checked;

  secretNumber = secretNumber || generateSecretNumber();
  attempts++;
  updateAttempts();

  const result = checkGuess(guessInput);

  const historyTable = document.getElementById('history');
  const newRow = historyTable.insertRow(-1);
  newRow.innerHTML = `<td>${guessInput}</td><td>${betInput}</td><td>${result}</td><td>${enableHints ? provideHint(guessInput) : 'N/A'}</td>`;

  if (result === 'Correto') {
    handleCorrectGuess(betInput);
  } else {
    handleIncorrectGuess(betInput);
  }
}

function provideHint(playerGuess) {
  const difference = Math.abs(playerGuess - secretNumber);
  return `Tu estás ${difference} números longe da resposta certa.`;
}

function checkGuess(guess) {
  if (guess === secretNumber) {
    return 'Correto';
  } else if (guess > secretNumber) {
    return 'Muito alto';
  } else {
    return 'Muito baixo';
  }
}

function handleCorrectGuess(bet) {
  const enableHints = document.getElementById('hints').checked;

  if (enableHints) {
    bet = applyHintDiscount(bet);
  }

  balance += bet;
  updateBalance();
  document.getElementById('guess-btn').disabled = true;
  document.getElementById('guess').disabled = true;
  document.getElementById('bet').disabled = true;
  document.getElementById('game-container').style.backgroundColor = 'green';

  const playerName = document.getElementById('player-name').value || 'Player';
  const chequeContainer = document.getElementById('cheque-container');
  chequeContainer.classList.remove('hidden');
  document.getElementById('cheque-text').innerText = `${playerName}, parabéns!!! Tu  ganhaste $${bet}. O teu novo saldo é $${balance}.`;
}

function applyHintDiscount(originalBet) {
  const discount = 0.1; // 10%
  const discountedAmount = originalBet * (1 - discount);
  return Math.round(discountedAmount);
}

function handleIncorrectGuess(bet) {
  balance -= bet;
  updateBalance();
  document.getElementById('game-container').style.backgroundColor = 'red';

  if (balance <= 0) {
    alert('Fim de jogo! Ficaste sem saldo.');
    document.getElementById('guess-btn').disabled = true;
    document.getElementById('guess').disabled = true;
    document.getElementById('bet').disabled = true;
  }
}

function updateAttempts() {
  document.getElementById('attempts').innerText = attempts;
}