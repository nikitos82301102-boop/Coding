import { Chess } from 'https://esm.run/chess.js@1.4.0';
import { findBestMove, LEVEL_CONFIGS } from './engine.js';

self.onmessage = function (e) {
  const { type, fen, level } = e.data;

  if (type === 'findMove') {
    try {
      self.postMessage({ type: 'thinking' });
      const move = findBestMove(fen, level);
      self.postMessage({ type: 'moveFound', move });
    } catch (err) {
      self.postMessage({ type: 'error', message: err.message });
    }
  }

  if (type === 'getLevels') {
    self.postMessage({ type: 'levels', levels: LEVEL_CONFIGS });
  }
};
