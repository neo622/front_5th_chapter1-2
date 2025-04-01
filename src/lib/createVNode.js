export function createVNode(type, props, ...children) {
  children = children
    .flat(2)
    .filter((son) => son && son !== null && son !== false);
  return { type, props, children };
}
