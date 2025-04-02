import { addEvent } from "./eventManager";
//virtualDOM -> realDOM
export function createElement(vNode) {
  // 예외 처리
  if (vNode == null || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  // 문자열 or 숫자 → TextNode
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  // 배열 → DocumentFragment
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement(child)); // 재귀 호출
    });
    return fragment;
  }

  // 일반 VNode 처리
  const $el = document.createElement(vNode.type);

  // 속성 처리
  updateAttributes($el, vNode.props);

  // 자식 처리
  (vNode.children || []).forEach((child) => {
    $el.appendChild(createElement(child));
  });

  return $el;
}

function updateAttributes($el, props = {}) {
  Object.entries(props).forEach(([attr, val]) => {
    if (val == null || val === false) return; // null, undefined, false 건너뜀

    if (attr === "className") {
      $el.setAttribute("class", val); // JSX → HTML 속성 변환
    } else {
      $el.setAttribute(attr, val);
    }
  });
}
