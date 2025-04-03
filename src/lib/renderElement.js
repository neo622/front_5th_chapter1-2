import { setupEventListeners, clearEventMap } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

export function renderElement(vNode, container) {
  container.innerHTML = "";
  clearEventMap(container)
  const normalizedNode = normalizeVNode(vNode);
  const element = createElement(normalizedNode);
  container.appendChild(element);
  setupEventListeners(container);
}
