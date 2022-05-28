export const MazeGenerator = (w: number = 10, h: number = 10) => {
  const random = (int: number) => {
    return Math.floor(Math.random() * int);
  };

  const cell = () => {
    return Array(w * h).fill({ top: 0, right: 0, bottom: 0, left: 0 });
  };

  const computed = (index: number) => {
    if (!history.includes(index)) {
      history.push(index);
      road.push(index);
    }

    const toTop = index - w;
    const toRight = index + 1;
    const toBottom = index + w;
    const toLeft = index - 1;

    const side = [];

    if (index - w > 0 && !history.includes(toTop)) side.push('top');
    if (index % w !== w - 1 && !history.includes(toRight)) side.push('right');
    if (index + w < w * h && !history.includes(toBottom)) side.push('bottom');
    if (index % w !== 0 && !history.includes(toLeft)) side.push('left');

    if (side.length === 0) {
      const last = road.pop();
      if (typeof last === 'number') {
        computed(last);
      } else {
        return;
      }
    }

    const toSide = side[random(side.length)];

    if (toSide === 'top') {
      map[index] = { ...map[index], top: 1 };
      map[toTop] = { ...map[toTop], bottom: 1 };
      computed(toTop);
    }

    if (toSide === 'right') {
      map[index] = { ...map[index], right: 1 };
      map[toRight] = { ...map[toRight], left: 1 };
      computed(toRight);
    }

    if (toSide === 'bottom') {
      map[index] = { ...map[index], bottom: 1 };
      map[toBottom] = { ...map[toBottom], top: 1 };
      computed(toBottom);
    }

    if (toSide === 'left') {
      map[index] = { ...map[index], left: 1 };
      map[toLeft] = { ...map[toLeft], right: 1 };
      computed(toLeft);
    }
  };

  const map = cell();
  const history: number[] = [];
  const road: number[] = [];
  computed(random(map.length));

  return map;
};
