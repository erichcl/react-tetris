export const Action = {
  Rotate: 'Rotate',
  SlowDrop: 'SlowDrop',
  Left: 'Left',
  Right: 'Right',
  Quit: 'Quit',
  Pause: 'Pause',
  FastDrop: 'FastDrop',
};

export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
};

export const actionForKey = (keyCode) => Key[keyCode];
