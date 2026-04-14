// ===== SVG Chess Pieces =====
const PIECE_SVGS = {
  wK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#ccc" stroke-width="1.5" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linecap="round"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" stroke-linecap="butt"/><path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="#fff"/><path d="M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0"/></g></svg>`,
  wQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#ccc" stroke-width="1.5" stroke-linejoin="round"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-3.5-7-5 6.5-5-6.5-3.5 7-7.5-13.5L9 26z" stroke-linecap="butt"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/></g></svg>`,
  wR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#ccc" stroke-width="1.5" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" stroke-linecap="butt"/><path d="M14 29.5v-13h17v13H14z" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" stroke-linecap="butt"/></g></svg>`,
  wB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#ccc" stroke-width="1.5" stroke-linejoin="round"><g stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15" fill="none" stroke-linejoin="miter"/></g></svg>`,
  wN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#ccc" stroke-width="1.5" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#fff"/><path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z" fill="#ccc" stroke="#ccc"/><path d="M14.933 15.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z" fill="#ccc" stroke="#ccc" stroke-width="1.49997"/></g></svg>`,
  wP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15.41 27.09 11 31.58 11 39.5H34c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#ccc" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#1a1a2e" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="#1a1a2e"/><path d="M20 8h5" stroke-linejoin="miter"/><path d="M32 29.5s8.5-4 6.03-9.65C34.15 14 25 18 22.5 24.5v2.1-2.1C20 18 10.85 14 6.97 19.85 4.5 25.5 13 29.5 13 29.5" stroke="#fff" stroke-width="1"/><path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0" stroke="#fff" stroke-width="1"/></g></svg>`,
  bQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#1a1a2e" stroke="none"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/></g><g fill="#1a1a2e" stroke="#000"><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-3.5-7-5 6.5-5-6.5-3.5 7-7.5-13.5L9 26z" stroke-linecap="butt"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0" fill="none" stroke="#fff" stroke-width="1"/><path d="M12 33.5c6-1 15-1 21 0" fill="none" stroke="#fff" stroke-width="1"/></g></g></svg>`,
  bR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" fill="#1a1a2e" stroke-linecap="butt"/><path d="M14 29.5v-13h17v13H14z" fill="#1a1a2e" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" fill="#1a1a2e" stroke-linecap="butt"/><path d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23" fill="none" stroke="#fff" stroke-width="1" stroke-linejoin="miter"/></g></svg>`,
  bB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#1a1a2e" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15" stroke="#fff" stroke-linejoin="miter"/></g></svg>`,
  bN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#1a1a2e"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#1a1a2e"/><path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z" fill="#fff" stroke="#fff"/><path d="M14.933 15.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z" fill="#fff" stroke="#fff" stroke-width="1.49997"/></g></svg>`,
  bP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15.41 27.09 11 31.58 11 39.5H34c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#1a1a2e" stroke="#000" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

// Piece type to SVG key mapping
function pieceKey(piece) {
  return piece.color + piece.type.toUpperCase();
}

const FILES = 'abcdefgh';
const RANKS = '12345678';
const PIECE_ORDER = ['q', 'r', 'b', 'n', 'p'];
const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9 };

export class ChessBoard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onMove = options.onMove || (() => {});
    this.getLegalMoves = options.getLegalMoves || (() => []);
    this.orientation = options.orientation || 'white';
    this.playerColor = 'w';
    this.interactive = true;
    this.selectedSquare = null;
    this.legalMoves = [];
    this.isDragging = false;
    this.floatingPiece = null;
    this.boardEl = null;
    this.isFlipped = false;
    this.currentFen = null;
  }

  init() {
    this.container.innerHTML = '';

    // Board wrapper (for coordinates)
    const wrapper = document.createElement('div');
    wrapper.className = 'board-wrapper';

    // Coordinate labels - ranks (left side)
    const rankLabels = document.createElement('div');
    rankLabels.className = 'coord-ranks';
    for (let i = 0; i < 8; i++) {
      const label = document.createElement('span');
      label.className = 'coord-rank';
      label.textContent = this.isFlipped ? (i + 1) : (8 - i);
      rankLabels.appendChild(label);
    }
    wrapper.appendChild(rankLabels);

    // The board
    const board = document.createElement('div');
    board.className = 'chessboard';
    this.boardEl = board;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const sq = document.createElement('div');
        const file = FILES[col];
        const rank = 8 - row;
        const square = file + rank;
        const isLight = (row + col) % 2 === 0;

        sq.className = `square ${isLight ? 'light' : 'dark'}`;
        sq.dataset.square = square;
        sq.dataset.row = row;
        sq.dataset.col = col;

        sq.addEventListener('pointerdown', (e) => this._onPointerDown(e, square));
        board.appendChild(sq);
      }
    }

    wrapper.appendChild(board);

    // File labels (bottom)
    const fileLabels = document.createElement('div');
    fileLabels.className = 'coord-files';
    for (let i = 0; i < 8; i++) {
      const label = document.createElement('span');
      label.className = 'coord-file';
      label.textContent = this.isFlipped ? FILES[7 - i] : FILES[i];
      fileLabels.appendChild(label);
    }
    wrapper.appendChild(fileLabels);

    this.container.appendChild(wrapper);

    // Global pointer events for drag
    document.addEventListener('pointermove', (e) => this._onPointerMove(e));
    document.addEventListener('pointerup', (e) => this._onPointerUp(e));
  }

  updatePosition(fen) {
    this.currentFen = fen;
    const placement = fen.split(' ')[0];
    const rows = placement.split('/');

    // Clear all pieces
    this.boardEl.querySelectorAll('.piece').forEach(p => p.remove());
    this.boardEl.querySelectorAll('.square').forEach(sq => sq.classList.remove('has-piece'));

    for (let row = 0; row < 8; row++) {
      let col = 0;
      for (const ch of rows[row]) {
        if (ch >= '1' && ch <= '8') {
          col += parseInt(ch);
        } else {
          const color = ch === ch.toUpperCase() ? 'w' : 'b';
          const type = ch.toUpperCase();
          const file = FILES[col];
          const rank = 8 - row;
          const square = file + rank;
          const sqEl = this.getSquare(square);
          if (sqEl) {
            const key = color + type;
            const pieceEl = document.createElement('div');
            pieceEl.className = 'piece';
            pieceEl.dataset.piece = key;
            pieceEl.dataset.color = color;
            pieceEl.innerHTML = PIECE_SVGS[key] || '';
            sqEl.appendChild(pieceEl);
            sqEl.classList.add('has-piece');
          }
          col++;
        }
      }
    }
  }

  highlightLastMove(from, to) {
    this.boardEl.querySelectorAll('.last-move').forEach(sq => sq.classList.remove('last-move'));
    if (from) {
      const fromEl = this.getSquare(from);
      const toEl = this.getSquare(to);
      if (fromEl) fromEl.classList.add('last-move');
      if (toEl) toEl.classList.add('last-move');
    }
  }

  highlightCheck(kingSquare) {
    this.boardEl.querySelectorAll('.check').forEach(sq => sq.classList.remove('check'));
    if (kingSquare) {
      const el = this.getSquare(kingSquare);
      if (el) el.classList.add('check');
    }
  }

  clearHighlights() {
    this.boardEl.querySelectorAll('.square').forEach(sq => {
      sq.classList.remove('selected', 'legal-target', 'check');
    });
    this.selectedSquare = null;
    this.legalMoves = [];
  }

  showLegalMoves(moves) {
    this.boardEl.querySelectorAll('.legal-target').forEach(sq => sq.classList.remove('legal-target'));
    this.legalMoves = moves;
    for (const move of moves) {
      const el = this.getSquare(move.to);
      if (el) el.classList.add('legal-target');
    }
  }

  flipBoard() {
    this.isFlipped = !this.isFlipped;
    this.boardEl.classList.toggle('flipped');

    // Update coordinate labels
    const ranks = this.container.querySelectorAll('.coord-rank');
    const files = this.container.querySelectorAll('.coord-file');
    ranks.forEach((el, i) => {
      el.textContent = this.isFlipped ? (i + 1) : (8 - i);
    });
    files.forEach((el, i) => {
      el.textContent = this.isFlipped ? FILES[7 - i] : FILES[i];
    });
  }

  updateCapturedPieces(whiteCaptured, blackCaptured) {
    const topEl = document.getElementById('captured-top');
    const bottomEl = document.getElementById('captured-bottom');
    if (!topEl || !bottomEl) return;

    const renderCaptures = (pieces, el) => {
      el.innerHTML = '';
      const sorted = [...pieces].sort((a, b) => (PIECE_VALUES[b] || 0) - (PIECE_VALUES[a] || 0));
      for (const p of sorted) {
        const span = document.createElement('span');
        span.className = 'captured-piece';
        const color = el === topEl ? 'b' : 'w';
        span.innerHTML = PIECE_SVGS[color + p.toUpperCase()] || '';
        el.appendChild(span);
      }
    };

    // Material difference
    const wMat = whiteCaptured.reduce((s, p) => s + (PIECE_VALUES[p] || 0), 0);
    const bMat = blackCaptured.reduce((s, p) => s + (PIECE_VALUES[p] || 0), 0);

    // Top = opponent captured (pieces player took), Bottom = player captured (pieces opponent took)
    renderCaptures(blackCaptured, topEl);
    renderCaptures(whiteCaptured, bottomEl);

    const diff = bMat - wMat;
    const topBadge = topEl.querySelector('.material-diff') || document.createElement('span');
    topBadge.className = 'material-diff';
    topBadge.textContent = diff > 0 ? `+${diff}` : '';
    if (!topBadge.parentNode) topEl.appendChild(topBadge);

    const bottomBadge = bottomEl.querySelector('.material-diff') || document.createElement('span');
    bottomBadge.className = 'material-diff';
    bottomBadge.textContent = diff < 0 ? `+${Math.abs(diff)}` : '';
    if (!bottomBadge.parentNode) bottomEl.appendChild(bottomBadge);
  }

  showPromotion(color, square, callback) {
    // Remove existing popup
    this.container.querySelectorAll('.promotion-popup').forEach(p => p.remove());

    const sqEl = this.getSquare(square);
    if (!sqEl) return;

    const popup = document.createElement('div');
    popup.className = 'promotion-popup';

    const pieces = ['q', 'r', 'b', 'n'];
    for (const p of pieces) {
      const opt = document.createElement('div');
      opt.className = 'promotion-option';
      opt.innerHTML = PIECE_SVGS[color + p.toUpperCase()] || '';
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.remove();
        callback(p);
      });
      popup.appendChild(opt);
    }

    // Position relative to the square
    const boardRect = this.boardEl.getBoundingClientRect();
    const sqRect = sqEl.getBoundingClientRect();
    popup.style.left = (sqRect.left - boardRect.left) + 'px';

    if (color === 'w') {
      popup.style.top = (sqRect.top - boardRect.top) + 'px';
    } else {
      popup.style.bottom = (boardRect.bottom - sqRect.bottom) + 'px';
    }

    this.boardEl.appendChild(popup);

    // Close on outside click
    const closeHandler = (e) => {
      if (!popup.contains(e.target)) {
        popup.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);
  }

  setInteractive(interactive) {
    this.interactive = interactive;
    this.boardEl.style.pointerEvents = interactive ? 'auto' : 'auto';
    if (!interactive) {
      this.clearHighlights();
      this._removeFloatingPiece();
    }
  }

  setPlayerColor(color) {
    this.playerColor = color;
  }

  getSquare(notation) {
    return this.boardEl.querySelector(`[data-square="${notation}"]`);
  }

  // ===== Private: Pointer Events =====

  _onPointerDown(e, square) {
    if (!this.interactive) return;
    e.preventDefault();

    const sqEl = this.getSquare(square);
    const pieceEl = sqEl.querySelector('.piece');
    const pieceColor = pieceEl ? pieceEl.dataset.color : null;

    // If a piece is selected and clicking on a legal target -> move
    if (this.selectedSquare && this.legalMoves.some(m => m.to === square)) {
      this.onMove(this.selectedSquare, square);
      this.clearHighlights();
      return;
    }

    // If clicking on own piece -> select & show legal moves
    if (pieceEl && pieceColor === this.playerColor) {
      this.clearHighlights();
      this.selectedSquare = square;
      sqEl.classList.add('selected');

      // Fetch and show legal moves via callback
      const moves = this.getLegalMoves(square);
      this.showLegalMoves(moves);

      // Start drag
      this._startDrag(e, square, pieceEl);
      return;
    }

    // Clicking elsewhere -> deselect
    this.clearHighlights();
  }

  _startDrag(e, square, pieceEl) {
    this.isDragging = true;
    this.dragFrom = square;

    // Create floating piece
    const rect = pieceEl.getBoundingClientRect();
    const floating = document.createElement('div');
    floating.className = 'floating-piece';
    floating.innerHTML = pieceEl.innerHTML;
    floating.style.width = rect.width + 'px';
    floating.style.height = rect.height + 'px';
    floating.style.left = e.clientX + 'px';
    floating.style.top = e.clientY + 'px';
    document.body.appendChild(floating);
    this.floatingPiece = floating;

    // Ghost original
    pieceEl.classList.add('dragging');
  }

  _onPointerMove(e) {
    if (!this.isDragging || !this.floatingPiece) return;
    this.floatingPiece.style.left = e.clientX + 'px';
    this.floatingPiece.style.top = e.clientY + 'px';
  }

  _onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this._removeFloatingPiece();

    // Remove dragging ghost
    this.boardEl.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));

    // Find square under cursor
    const target = document.elementFromPoint(e.clientX, e.clientY);
    if (!target) return;

    const sqEl = target.closest('.square');
    if (sqEl && sqEl.dataset.square) {
      const toSquare = sqEl.dataset.square;
      if (this.legalMoves.some(m => m.to === toSquare)) {
        this.onMove(this.dragFrom, toSquare);
        this.clearHighlights();
        return;
      }
    }

    // If drag didn't land on legal square, keep selection
  }

  _removeFloatingPiece() {
    if (this.floatingPiece) {
      this.floatingPiece.remove();
      this.floatingPiece = null;
    }
  }
}
