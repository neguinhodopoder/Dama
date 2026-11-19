const boardElement = document.getElementById('board');

// Representação do tabuleiro (8x8)
// 'r' = peça vermelha, 'b' = peça preta, null = casa vazia
let boardState = [
  [null, 'b', null, 'b', null, 'b', null, 'b'],
  ['b', null, 'b', null, 'b', null, 'b', null],
  [null, 'b', null, 'b', null, 'b', null, 'b'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['r', null, 'r', null, 'r', null, 'r', null],
  [null, 'r', null, 'r', null, 'r', null, 'r'],
  ['r', null, 'r', null, 'r', null, 'r', null]
];

let selectedPiece = null;

function renderBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      
      const isDark = (row + col) % 2 === 1;
      square.classList.add(isDark ? 'dark' : 'light');
      square.dataset.row = row;
      square.dataset.col = col;

      const pieceType = boardState[row][col];
      if (pieceType) {
        const piece = document.createElement('div');
        piece.classList.add('piece', pieceType === 'r' ? 'red' : 'black');
        piece.addEventListener('click', (e) => onPieceClick(e, row, col));
        square.appendChild(piece);
      } else {
        square.addEventListener('click', () => onSquareClick(row, col));
      }

      boardElement.appendChild(square);
    }
  }
}

function onPieceClick(e, row, col) {
  e.stopPropagation();
  selectedPiece = { row, col };
  renderBoard();
  // Lógica visual de seleção pode ser aprimorada aqui
}

function onSquareClick(row, col) {
  if (!selectedPiece) return;

  // Movimento simples diagonal (exemplo básico)
  const { row: sRow, col: sCol } = selectedPiece;
  const piece = boardState[sRow][sCol];

  // Move a peça para a nova posição se a casa estiver vazia
  if (boardState[row][col] === null) {
    boardState[row][col] = piece;
    boardState[sRow][sCol] = null;
    selectedPiece = null;
    renderBoard();
  }
}

renderBoard();
