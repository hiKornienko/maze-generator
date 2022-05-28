export const MazeGenerator = (w = 10, h = 10) => {
    const random = (int) => {
        return Math.floor(Math.random() * int);
    };
    const cell = () => {
        return Array(w * h).fill({ top: 0, right: 0, bottom: 0, left: 0 });
    };
    const computed = (index) => {
        if (!history.includes(index)) {
            history.push(index);
            road.push(index);
        }
        const toTop = index - w;
        const toRight = index + 1;
        const toBottom = index + w;
        const toLeft = index - 1;
        const side = [];
        if (index - w > 0 && !history.includes(toTop))
            side.push('top');
        if (index % w !== w - 1 && !history.includes(toRight))
            side.push('right');
        if (index + w < w * h && !history.includes(toBottom))
            side.push('bottom');
        if (index % w !== 0 && !history.includes(toLeft))
            side.push('left');
        if (side.length === 0) {
            const last = road.pop();
            if (typeof last === 'number') {
                computed(last);
            }
            else {
                return;
            }
        }
        const toSide = side[random(side.length)];
        if (toSide === 'top') {
            map[index] = Object.assign(Object.assign({}, map[index]), { top: 1 });
            map[toTop] = Object.assign(Object.assign({}, map[toTop]), { bottom: 1 });
            computed(toTop);
        }
        if (toSide === 'right') {
            map[index] = Object.assign(Object.assign({}, map[index]), { right: 1 });
            map[toRight] = Object.assign(Object.assign({}, map[toRight]), { left: 1 });
            computed(toRight);
        }
        if (toSide === 'bottom') {
            map[index] = Object.assign(Object.assign({}, map[index]), { bottom: 1 });
            map[toBottom] = Object.assign(Object.assign({}, map[toBottom]), { top: 1 });
            computed(toBottom);
        }
        if (toSide === 'left') {
            map[index] = Object.assign(Object.assign({}, map[index]), { left: 1 });
            map[toLeft] = Object.assign(Object.assign({}, map[toLeft]), { right: 1 });
            computed(toLeft);
        }
    };
    const map = cell();
    const history = [];
    const road = [];
    computed(random(map.length));
    return map;
};
