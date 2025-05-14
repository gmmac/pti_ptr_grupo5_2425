import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function CustomProgressBar({ current = 0, total = 1 }) {
  const percent = total > 0
    ? Math.min(100, Math.max(0, Math.round((current / total) * 100)))
    : 0;
  const isDone = percent >= 100;
  const barHeight = '1.3rem'; // ajuste aqui para alterar altura

  return (
    <div className="position-relative" style={{ height: barHeight }}>
      <ProgressBar
        now={percent}
        variant={isDone ? 'success' : 'info'}
        animated={!isDone}
        striped={!isDone}
        style={{ height: barHeight }}
      />
      <div
        className={`position-absolute top-50 start-50 translate-middle w-100 text-center ${
          isDone ? 'text-light' : 'text-dark'
        }`}
        style={{ pointerEvents: 'none' }}
      >
        {isDone ? 'Done' : `${percent}%`}
      </div>
    </div>
  );
}
