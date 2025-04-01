export function normalizeVNode(vNode) {
  const exceptionCase = [null, undefined, true, false];
  vNode = !exceptionCase.includes(vNode) ? vNode : "";
  vNode =
    vNode === "" && typeof vNode === "string" ? vNode : JSON.stringify(vNode);
  return vNode;
}
