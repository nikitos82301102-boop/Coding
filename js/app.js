import { Chess } from 'https://esm.run/chess.js@1.4.0';
import { ChessBoard } from './board.js';
import { LEVEL_CONFIGS } from './engine.js';

// ===== Game State =====
let game = new Chess();
let board = null;
let worker = null;
let currentLevel = 5;
let playerColor = 'w';
let isThinking = false;
let moveHistory = [];
let capturedWhite = []; // pieces captured by white (black pieces taken)
let capturedBlack = []; // pieces captured by black (white pieces taken)

// ===== Sound Effects (Web Audio API) =====
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'move':
        osc.frequency.value = 200;
        osc.type = 'sine';
        gain.gain.value = 0.1;
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
        break;
      case 'capture':
        osc.frequency.value = 300;
        osc.type = 'triangle';
        gain.gain.value = 0.15;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
        break;
      case 'check':
        osc.frequency.value = 500;
        osc.type = 'square';
        gain.gain.value = 0.08;
        osc.start();
        osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.15);
        break;
      case 'gameOver':
        osc.frequency.value = 600;
        osc.type = 'sine';
        gain.gain.value = 0.12;
        osc.start();
        osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
        break;
    }
  } catch (e) { /* audio not supported */ }
}

// ===== Worker Setup =====
function initWorker() {
  if (worker) worker.terminate();
  worker = new Worker('./js/worker.js', { type: 'module' });

  worker.onmessage = (e) => {
    const { type, move, message } = e.data;

    if (type === 'thinking') {
      setStatus('thinking');
    }

    if (type === 'moveFound' && move) {
      makeAIMove(move);
    }

    if (type === 'error') {
      console.error('Engine error:', message);
      isThinking = false;
      setStatus('your-turn');
    }
  };
}

// ===== Board Setup =====
function initBoard() {
  board = new ChessBoard('board-container', {
    orientation: 'white',
    onMove: handlePlayerMove,
    getLegalMoves: (square) => game.moves({ verbose: true, square }),
  });
  board.init();
  board.setPlayerColor(playerColor);
  updateBoardState();
}

// ===== Game Logic =====

function handlePlayerMove(from, to) {
  if (isThinking || game.turn() !== playerColor) return;

  // Check if it's a promotion
  const moves = game.moves({ verbose: true }).filter(m => m.from === from && m.to === to);
  if (moves.length === 0) return;

  if (moves[0].promotion) {
    board.showPromotion(playerColor, to, (piece) => {
      executeMove(from, to, piece);
    });
    return;
  }

  executeMove(from, to);
}

function executeMove(from, to, promotion) {
  const move = game.move({ from, to, promotion: promotion || undefined });
  if (!move) return;

  // Track captures
  if (move.captured) {
    if (move.color === 'w') {
      capturedWhite.push(move.captured);
    } else {
      capturedBlack.push(move.captured);
    }
    playSound('capture');
  } else {
    playSound('move');
  }

  moveHistory.push(move);
  updateBoardState();
  updateMoveHistoryPanel();

  if (game.isGameOver()) {
    handleGameOver();
    return;
  }

  if (game.inCheck()) {
    playSound('check');
  }

  // AI turn
  requestAIMove();
}

function makeAIMove(moveData) {
  const move = game.move({ from: moveData.from, to: moveData.to, promotion: moveData.promotion || undefined });
  if (!move) {
    // Fallback: try any legal move
    const moves = game.moves({ verbose: true });
    if (moves.length > 0) {
      const fallback = moves[0];
      game.move(fallback);
      moveHistory.push(fallback);
    }
    isThinking = false;
    updateBoardState();
    return;
  }

  if (move.captured) {
    if (move.color === 'w') {
      capturedWhite.push(move.captured);
    } else {
      capturedBlack.push(move.captured);
    }
    playSound('capture');
  } else {
    playSound('move');
  }

  moveHistory.push(move);
  isThinking = false;
  updateBoardState();
  updateMoveHistoryPanel();

  if (game.isGameOver()) {
    handleGameOver();
    return;
  }

  if (game.inCheck()) {
    playSound('check');
  }

  setStatus('your-turn');
}

function requestAIMove() {
  isThinking = true;
  setStatus('thinking');
  board.setInteractive(false);

  worker.postMessage({
    type: 'findMove',
    fen: game.fen(),
    level: currentLevel,
  });
}

function updateBoardState() {
  board.updatePosition(game.fen());

  // Last move highlight
  if (moveHistory.length > 0) {
    const last = moveHistory[moveHistory.length - 1];
    board.highlightLastMove(last.from, last.to);
  } else {
    board.highlightLastMove(null, null);
  }

  // Check highlight
  if (game.inCheck()) {
    const turn = game.turn();
    const kingSquare = findKing(turn);
    board.highlightCheck(kingSquare);
  } else {
    board.highlightCheck(null);
  }

  // Captured pieces
  board.updateCapturedPieces(capturedWhite, capturedBlack);

  // Interactive state
  if (!isThinking && game.turn() === playerColor && !game.isGameOver()) {
    board.setInteractive(true);
    setStatus('your-turn');
  } else if (!isThinking && game.isGameOver()) {
    board.setInteractive(false);
  }

}

function findKing(color) {
  const boardArr = game.board();
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = boardArr[r][f];
      if (piece && piece.type === 'k' && piece.color === color) {
        return 'abcdefgh'[f] + (8 - r);
      }
    }
  }
  return null;
}

// ===== UI Updates =====

function setStatus(status) {
  const statusEl = document.getElementById('status-text');
  const thinkingEl = document.getElementById('thinking-indicator');
  if (!statusEl) return;

  switch (status) {
    case 'your-turn':
      statusEl.textContent = 'Your turn';
      if (thinkingEl) thinkingEl.classList.remove('active');
      break;
    case 'thinking':
      statusEl.textContent = 'AI is thinking';
      if (thinkingEl) thinkingEl.classList.add('active');
      break;
    case 'game-over':
      statusEl.textContent = '';
      if (thinkingEl) thinkingEl.classList.remove('active');
      break;
  }
}

function updateMoveHistoryPanel() {
  const panel = document.getElementById('move-list');
  if (!panel) return;

  panel.innerHTML = '';

  for (let i = 0; i < moveHistory.length; i += 2) {
    const row = document.createElement('div');
    row.className = 'move-row';

    const num = document.createElement('span');
    num.className = 'move-number';
    num.textContent = Math.floor(i / 2) + 1 + '.';

    const whiteMove = document.createElement('span');
    whiteMove.className = 'move-entry';
    whiteMove.textContent = moveHistory[i].san;

    row.appendChild(num);
    row.appendChild(whiteMove);

    if (i + 1 < moveHistory.length) {
      const blackMove = document.createElement('span');
      blackMove.className = 'move-entry';
      blackMove.textContent = moveHistory[i + 1].san;
      row.appendChild(blackMove);
    }

    panel.appendChild(row);
  }

  // Auto scroll
  panel.scrollTop = panel.scrollHeight;
}

function handleGameOver() {
  setStatus('game-over');
  board.setInteractive(false);
  playSound('gameOver');

  const overlay = document.getElementById('game-over-overlay');
  const resultEl = document.getElementById('game-over-result');
  const subEl = document.getElementById('game-over-sub');

  if (!overlay) return;

  let result = '';
  let sub = '';

  if (game.isCheckmate()) {
    const winner = game.turn() === 'w' ? 'Black' : 'White';
    if ((winner === 'White' && playerColor === 'w') || (winner === 'Black' && playerColor === 'b')) {
      result = 'You Win!';
      sub = 'Checkmate';
    } else {
      result = 'You Lose';
      sub = 'Checkmate';
    }
  } else if (game.isStalemate()) {
    result = 'Stalemate';
    sub = 'Draw';
  } else if (game.isDraw()) {
    result = 'Draw';
    sub = game.isThreefoldRepetition() ? 'Threefold repetition' :
          game.isInsufficientMaterial() ? 'Insufficient material' : 'Fifty-move rule';
  }

  if (resultEl) resultEl.textContent = result;
  if (subEl) subEl.textContent = sub;
  overlay.classList.add('active');
}

// ===== Level Selection =====

function showLevelModal() {
  const modal = document.getElementById('level-modal');
  if (modal) modal.classList.add('active');
}

function hideLevelModal() {
  const modal = document.getElementById('level-modal');
  if (modal) modal.classList.remove('active');
}

function initLevelSelection() {
  const grid = document.getElementById('level-grid');
  if (!grid) return;

  grid.innerHTML = '';

  LEVEL_CONFIGS.forEach((config, index) => {
    const card = document.createElement('div');
    card.className = `level-card ${index + 1 === currentLevel ? 'selected' : ''}`;
    if (index >= 7) card.classList.add('high-level');

    card.innerHTML = `
      <span class="level-number">Level ${index + 1}</span>
      <span class="level-name">${config.name}</span>
      <span class="level-elo">~${config.elo} ELO</span>
    `;

    card.addEventListener('click', () => {
      grid.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      currentLevel = index + 1;
    });

    grid.appendChild(card);
  });
}

// ===== Controls =====

function newGame() {
  const overlay = document.getElementById('game-over-overlay');
  if (overlay) overlay.classList.remove('active');

  game = new Chess();
  moveHistory = [];
  capturedWhite = [];
  capturedBlack = [];
  isThinking = false;

  if (worker) worker.terminate();
  initWorker();

  board.setPlayerColor(playerColor);
  updateBoardState();
  updateMoveHistoryPanel();
  setStatus('your-turn');

  // Update level badge
  const badge = document.getElementById('level-badge');
  if (badge) {
    const config = LEVEL_CONFIGS[currentLevel - 1];
    badge.textContent = `Lvl ${currentLevel} · ${config.name}`;
  }
}

function undoMove() {
  if (isThinking || moveHistory.length < 2) return;

  // Undo AI move
  const aiMove = game.undo();
  if (aiMove) {
    moveHistory.pop();
    if (aiMove.captured) {
      if (aiMove.color === 'w') capturedWhite.pop();
      else capturedBlack.pop();
    }
  }

  // Undo player move
  const playerMove = game.undo();
  if (playerMove) {
    moveHistory.pop();
    if (playerMove.captured) {
      if (playerMove.color === 'w') capturedWhite.pop();
      else capturedBlack.pop();
    }
  }

  updateBoardState();
  updateMoveHistoryPanel();
}

// ===== Initialize =====

function init() {
  initWorker();
  initBoard();
  initLevelSelection();

  // Button handlers
  document.getElementById('btn-new-game')?.addEventListener('click', () => showLevelModal());
  document.getElementById('btn-undo')?.addEventListener('click', undoMove);
  document.getElementById('btn-flip')?.addEventListener('click', () => board.flipBoard());

  document.getElementById('btn-start-game')?.addEventListener('click', () => {
    hideLevelModal();
    newGame();
  });

  document.getElementById('game-over-new')?.addEventListener('click', () => {
    showLevelModal();
  });

  // Close modal on backdrop click
  document.getElementById('level-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'level-modal') {
      hideLevelModal();
      newGame();
    }
  });

  // Show level modal on start
  showLevelModal();
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
