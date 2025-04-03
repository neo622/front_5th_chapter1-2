import { addEvent } from "./eventManager";
import { normalizeVNode } from "./normalizeVNode";
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
    vNode
      .map(normalizeVNode) // virtualDOM 객체를 받을 수 있도록 전부 Normalize 진행
      .forEach((child) => fragment.appendChild(createElement(child)));
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

function updateAttributes($el, props) {
  if (!props || typeof props !== "object") return; // undefined, null, boolean 값에 대한 방어

  Object.entries(props).forEach(([attr, val]) => {
    if (val == null || val === false) return; // null, undefined, false 건너뜀
    if (attr.startsWith("on") && typeof val === "function") {
      // 이벤트 속성 처리 onClick > click > 위임 방식으로 처리
      const eventType = attr.slice(2).toLowerCase();
      addEvent($el, eventType, val);
    } else if (attr === "className") {
      $el.setAttribute("class", val); // JSX > HTML 속성 변환
    } else {
      $el.setAttribute(attr, val);
    }
  });
}
