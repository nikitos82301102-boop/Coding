import { Chess } from 'https://esm.run/chess.js@1.4.0';

// ===== Piece Values (centipawns) =====
const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

// ===== Piece-Square Tables =====
// Indexed [0..63] where index 0 = a8 (top-left from white's view)
// For white: index = (7 - rank) * 8 + file
// For black: index = rank * 8 + file

const PST_PAWN = [
   0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0,
];

const PST_KNIGHT = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
];

const PST_BISHOP = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20,
];

const PST_ROOK = [
   0,  0,  0,  0,  0,  0,  0,  0,
   5, 10, 10, 10, 10, 10, 10,  5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
   0,  0,  0,  5,  5,  0,  0,  0,
];

const PST_QUEEN = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20,
];

const PST_KING_MG = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20,
];

const PST_KING_EG = [
  -50,-40,-30,-20,-20,-30,-40,-50,
  -30,-20,-10,  0,  0,-10,-20,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-30,  0,  0,  0,  0,-30,-30,
  -50,-30,-30,-30,-30,-30,-30,-50,
];

const PST = {
  p: PST_PAWN, n: PST_KNIGHT, b: PST_BISHOP,
  r: PST_ROOK, q: PST_QUEEN, k: PST_KING_MG,
};

// ===== Level Configurations =====
export const LEVEL_CONFIGS = [
  { name: 'Beginner',      elo: 200,  depth: 1, evalTier: 1, randomness: 0.80, quiescence: 0, moveOrdering: 'none' },
  { name: 'Novice',        elo: 400,  depth: 1, evalTier: 1, randomness: 0.50, quiescence: 0, moveOrdering: 'none' },
  { name: 'Casual',        elo: 600,  depth: 2, evalTier: 1, randomness: 0.30, quiescence: 0, moveOrdering: 'none' },
  { name: 'Club Beginner', elo: 800,  depth: 2, evalTier: 2, randomness: 0.15, quiescence: 0, moveOrdering: 'mvvlva' },
  { name: 'Club Player',   elo: 1000, depth: 3, evalTier: 2, randomness: 0.08, quiescence: 0, moveOrdering: 'mvvlva' },
  { name: 'Intermediate',  elo: 1200, depth: 3, evalTier: 2, randomness: 0.04, quiescence: 1, moveOrdering: 'mvvlva' },
  { name: 'Advanced',      elo: 1400, depth: 4, evalTier: 2, randomness: 0.02, quiescence: 2, moveOrdering: 'killers' },
  { name: 'Expert',        elo: 1600, depth: 4, evalTier: 3, randomness: 0,    quiescence: 3, moveOrdering: 'history' },
  { name: 'Master',        elo: 1800, depth: 5, evalTier: 3, randomness: 0,    quiescence: 4, moveOrdering: 'full' },
  { name: 'Grandmaster',   elo: 2000, depth: 5, evalTier: 3, randomness: 0,    quiescence: 5, moveOrdering: 'full', iterativeDeepening: true, timeLimit: 3000, nullMove: true },
];

// ===== Helpers =====
const FILES = 'abcdefgh';

function sqToIndex(sq, isWhite) {
  const file = FILES.indexOf(sq[0]);
  const rank = parseInt(sq[1]) - 1;
  return isWhite ? (7 - rank) * 8 + file : rank * 8 + file;
}

function isEndgame(board) {
  let wMat = 0, bMat = 0;
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const sq = FILES[f] + (r + 1);
      const piece = board.get(sq);
      if (!piece || piece.type === 'k' || piece.type === 'p') continue;
      if (piece.color === 'w') wMat += PIECE_VALUES[piece.type];
      else bMat += PIECE_VALUES[piece.type];
    }
  }
  return wMat < 1300 && bMat < 1300;
}

// ===== Evaluation Functions =====

function evaluateTier1(game) {
  const board = game.board();
  let score = 0;
  const turn = game.turn();

  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (!piece) continue;
      const val = PIECE_VALUES[piece.type];
      score += piece.color === turn ? val : -val;
    }
  }
  return score;
}

function evaluateTier2(game) {
  const board = game.board();
  let score = 0;
  const turn = game.turn();
  const eg = isEndgame(game);

  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (!piece) continue;

      const val = PIECE_VALUES[piece.type];
      const sq = FILES[f] + (8 - r);
      const isWhite = piece.color === 'w';

      let pst;
      if (piece.type === 'k') {
        pst = eg ? PST_KING_EG : PST_KING_MG;
      } else {
        pst = PST[piece.type];
      }

      const pstVal = pst[sqToIndex(sq, isWhite)];
      const totalVal = val + pstVal;
      score += piece.color === turn ? totalVal : -totalVal;
    }
  }
  return score;
}

function evaluateTier3(game, includeMobility) {
  let score = evaluateTier2(game);
  const turn = game.turn();
  const board = game.board();

  // Pawn structure analysis
  const wPawnFiles = [];
  const bPawnFiles = [];

  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (!piece || piece.type !== 'p') continue;
      if (piece.color === 'w') wPawnFiles.push(f);
      else bPawnFiles.push(f);
    }
  }

  // Doubled pawns
  for (let f = 0; f < 8; f++) {
    const wCount = wPawnFiles.filter(pf => pf === f).length;
    const bCount = bPawnFiles.filter(pf => pf === f).length;
    if (wCount > 1) score += turn === 'w' ? -20 * (wCount - 1) : 20 * (wCount - 1);
    if (bCount > 1) score += turn === 'b' ? -20 * (bCount - 1) : 20 * (bCount - 1);
  }

  // Isolated pawns
  const wFileSet = new Set(wPawnFiles);
  const bFileSet = new Set(bPawnFiles);
  for (const f of wFileSet) {
    if (!wFileSet.has(f - 1) && !wFileSet.has(f + 1)) {
      score += turn === 'w' ? -15 : 15;
    }
  }
  for (const f of bFileSet) {
    if (!bFileSet.has(f - 1) && !bFileSet.has(f + 1)) {
      score += turn === 'b' ? -15 : 15;
    }
  }

  // Passed pawns
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (!piece || piece.type !== 'p') continue;
      const rank = 8 - r;
      let passed = true;

      if (piece.color === 'w') {
        for (let pr = r - 1; pr >= 0; pr--) {
          for (let pf = Math.max(0, f - 1); pf <= Math.min(7, f + 1); pf++) {
            const bp = board[pr][pf];
            if (bp && bp.type === 'p' && bp.color === 'b') { passed = false; break; }
          }
          if (!passed) break;
        }
        if (passed) {
          const bonus = 25 + (rank - 2) * 5;
          score += turn === 'w' ? bonus : -bonus;
        }
      } else {
        for (let pr = r + 1; pr < 8; pr++) {
          for (let pf = Math.max(0, f - 1); pf <= Math.min(7, f + 1); pf++) {
            const wp = board[pr][pf];
            if (wp && wp.type === 'p' && wp.color === 'w') { passed = false; break; }
          }
          if (!passed) break;
        }
        if (passed) {
          const bonus = 25 + (7 - rank) * 5;
          score += turn === 'b' ? bonus : -bonus;
        }
      }
    }
  }

  // Bishop pair
  let wBishops = 0, bBishops = 0;
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (!piece || piece.type !== 'b') continue;
      if (piece.color === 'w') wBishops++;
      else bBishops++;
    }
  }
  if (wBishops >= 2) score += turn === 'w' ? 30 : -30;
  if (bBishops >= 2) score += turn === 'b' ? 30 : -30;

  // Rook on open/semi-open files
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (!piece || piece.type !== 'r') continue;
      const hasOwnPawn = piece.color === 'w' ? wFileSet.has(f) : bFileSet.has(f);
      const hasEnemyPawn = piece.color === 'w' ? bFileSet.has(f) : wFileSet.has(f);

      if (!hasOwnPawn && !hasEnemyPawn) {
        score += piece.color === turn ? 15 : -15;
      } else if (!hasOwnPawn) {
        score += piece.color === turn ? 10 : -10;
      }
    }
  }

  // King safety - pawn shield
  const kingColor = turn;
  let kingFile = -1, kingRank = -1;
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (piece && piece.type === 'k' && piece.color === kingColor) {
        kingFile = f; kingRank = r; break;
      }
    }
    if (kingFile >= 0) break;
  }

  if (kingFile >= 0) {
    const shieldRank = kingColor === 'w' ? kingRank - 1 : kingRank + 1;
    if (shieldRank >= 0 && shieldRank < 8) {
      for (let sf = Math.max(0, kingFile - 1); sf <= Math.min(7, kingFile + 1); sf++) {
        const sp = board[shieldRank][sf];
        if (sp && sp.type === 'p' && sp.color === kingColor) {
          score += 15;
        }
      }
    }
  }

  // Mobility (levels 9-10 only)
  if (includeMobility) {
    const moves = game.moves().length;
    score += moves * 2;
  }

  return score;
}

function evaluate(game, config) {
  if (game.isCheckmate()) return -100000;
  if (game.isDraw() || game.isStalemate()) return 0;

  switch (config.evalTier) {
    case 1: return evaluateTier1(game);
    case 2: return evaluateTier2(game);
    case 3: return evaluateTier3(game, config.evalTier === 3 && config.depth >= 5);
    default: return evaluateTier1(game);
  }
}

// ===== Move Ordering =====
let killerMoves = {};
let historyTable = {};

function resetSearchTables() {
  killerMoves = {};
  historyTable = {};
}

function scoreMove(move, config, depth) {
  let score = 0;

  // Captures: MVV-LVA
  if (move.captured) {
    score += 10000 + PIECE_VALUES[move.captured] * 10 - PIECE_VALUES[move.piece];
  }

  // Promotions
  if (move.promotion) {
    score += PIECE_VALUES[move.promotion] * 10;
  }

  const ordering = config.moveOrdering;

  // Killer moves
  if (ordering === 'killers' || ordering === 'history' || ordering === 'full') {
    const key = depth;
    if (killerMoves[key]) {
      const km = killerMoves[key];
      if (km[0] === move.from + move.to) score += 5000;
      else if (km[1] === move.from + move.to) score += 4000;
    }
  }

  // History heuristic
  if (ordering === 'history' || ordering === 'full') {
    const hKey = move.color + move.piece + move.to;
    score += (historyTable[hKey] || 0);
  }

  return score;
}

function orderMoves(moves, config, depth) {
  if (config.moveOrdering === 'none') return moves;

  return moves.map(m => ({ move: m, score: scoreMove(m, config, depth) }))
    .sort((a, b) => b.score - a.score)
    .map(x => x.move);
}

function storeKiller(move, depth) {
  if (!killerMoves[depth]) killerMoves[depth] = [null, null];
  const key = move.from + move.to;
  if (killerMoves[depth][0] !== key) {
    killerMoves[depth][1] = killerMoves[depth][0];
    killerMoves[depth][0] = key;
  }
}

function storeHistory(move, depth) {
  const hKey = move.color + move.piece + move.to;
  historyTable[hKey] = (historyTable[hKey] || 0) + depth * depth;
}

// ===== Search =====

function quiescence(game, depth, alpha, beta, config) {
  const standPat = evaluate(game, config);
  if (standPat >= beta) return beta;
  if (alpha < standPat) alpha = standPat;
  if (depth <= 0) return alpha;

  const moves = game.moves({ verbose: true }).filter(m => m.captured || m.promotion);
  const ordered = moves.sort((a, b) => {
    const aVal = (a.captured ? PIECE_VALUES[a.captured] : 0) + (a.promotion ? PIECE_VALUES[a.promotion] : 0);
    const bVal = (b.captured ? PIECE_VALUES[b.captured] : 0) + (b.promotion ? PIECE_VALUES[b.promotion] : 0);
    return bVal - aVal;
  });

  for (const move of ordered) {
    game.move(move);
    const score = -quiescence(game, depth - 1, -beta, -alpha, config);
    game.undo();

    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
  }

  return alpha;
}

function negamax(game, depth, alpha, beta, config, startTime) {
  // Time check for iterative deepening
  if (config.timeLimit && Date.now() - startTime > config.timeLimit) {
    return evaluate(game, config);
  }

  if (game.isGameOver()) {
    if (game.isCheckmate()) return -100000 + (config.depth - depth);
    return 0;
  }

  if (depth <= 0) {
    if (config.quiescence > 0) {
      return quiescence(game, config.quiescence, alpha, beta, config);
    }
    return evaluate(game, config);
  }

  // Null-move pruning (level 10)
  if (config.nullMove && depth >= 3 && !game.inCheck()) {
    // Simulate null move by making a dummy position eval
    const nullScore = -evaluate(game, config);
    if (nullScore >= beta + 200) {
      return beta;
    }
  }

  const moves = game.moves({ verbose: true });
  const ordered = orderMoves(moves, config, depth);
  let bestScore = -Infinity;

  for (const move of ordered) {
    game.move(move);
    const score = -negamax(game, depth - 1, -beta, -alpha, config, startTime);
    game.undo();

    if (score > bestScore) bestScore = score;
    if (score > alpha) alpha = score;

    if (alpha >= beta) {
      if (!move.captured) {
        storeKiller(move, depth);
        storeHistory(move, depth);
      }
      break;
    }
  }

  return bestScore;
}

function searchRoot(game, depth, config, startTime) {
  const moves = game.moves({ verbose: true });
  const ordered = orderMoves(moves, config, depth);

  let bestMove = ordered[0];
  let bestScore = -Infinity;
  let alpha = -Infinity;
  const beta = Infinity;

  for (const move of ordered) {
    game.move(move);
    const score = -negamax(game, depth - 1, -beta, -alpha, config, startTime);
    game.undo();

    if (config.timeLimit && Date.now() - startTime > config.timeLimit) break;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
    if (score > alpha) alpha = score;
  }

  return { move: bestMove, score: bestScore };
}

// ===== Randomness / Blunder Model =====

function pickWeightedRandom(game, config) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  // For very low levels, sometimes pick truly random
  if (config.randomness >= 0.5 && Math.random() < 0.3) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // Evaluate all moves at depth 1
  const scored = moves.map(move => {
    game.move(move);
    const score = -evaluate(game, config);
    game.undo();
    return { move, score };
  });

  // Softmax selection
  const maxScore = Math.max(...scored.map(s => s.score));
  const temperature = 200 + (1 - config.randomness) * 300;
  const weights = scored.map(s => Math.exp((s.score - maxScore) / temperature));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let rand = Math.random() * totalWeight;
  for (let i = 0; i < scored.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return scored[i].move;
  }
  return scored[scored.length - 1].move;
}

// ===== Main Export =====

export function findBestMove(fen, level) {
  const game = new Chess(fen);
  const config = LEVEL_CONFIGS[level - 1];

  if (!config) throw new Error(`Invalid level: ${level}`);

  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  if (moves.length === 1) return { from: moves[0].from, to: moves[0].to, promotion: moves[0].promotion };

  resetSearchTables();

  // Randomness check
  if (config.randomness > 0 && Math.random() < config.randomness) {
    const move = pickWeightedRandom(game, config);
    if (move) return { from: move.from, to: move.to, promotion: move.promotion };
  }

  let bestMove;
  const startTime = Date.now();

  // Iterative deepening (level 10)
  if (config.iterativeDeepening) {
    let lastBest = null;
    for (let d = 1; d <= config.depth + 3; d++) {
      const iterConfig = { ...config, depth: d };
      const result = searchRoot(game, d, iterConfig, startTime);
      lastBest = result.move;

      if (Date.now() - startTime > config.timeLimit) break;

      // Checkmate found
      if (result.score >= 99000) break;
    }
    bestMove = lastBest;
  } else {
    const result = searchRoot(game, config.depth, config, startTime);
    bestMove = result.move;
  }

  if (!bestMove) bestMove = moves[0];

  return { from: bestMove.from, to: bestMove.to, promotion: bestMove.promotion || undefined };
}
