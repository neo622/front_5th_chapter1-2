// const eventMap = new Map(); // 이벤트 핸들러를 저장하는 Map 생성
// const isTestEnv = typeof process !== "undefined" && process.env?.NODE_ENV === "test";

// export function setupEventListeners(root) {
//     root.addEventListener("click", (e) => {
//         const elementEventId = e.target.dataset.eventId;
//         const handler = eventMap.get("click")?.get(elementEventId);

//         if (handler) {
//             e.preventDefault();
//             handler(e);
//         }
//     });
// }

// export function addEvent(element, eventType, handler) {
//     // console.log("button?", element.id)
//     // 같은 eventType이어도 요소마다 실행해야 할 핸들러가 다를 수 있기 때문에 랜던 eventID 생성
//     const targetEventId = crypto.randomUUID();

//     element.dataset.eventId = targetEventId; // 요소에 이벤트ID 부여
//     // 처음 받는 eventType일 경우 내부에 새로운 Map 생성
//     if (!eventMap.has(eventType)) {
//         eventMap.set(eventType, new Map());
//     }
//     eventMap.get(eventType).set(targetEventId, handler);
// };

// export function removeEvent(element, eventType, handler) {
//     // eventId는 이미 addEvent()할 때 element.dataset.eventId에 랜덤id로 넣어놨음
//     // eventMap.get(eventType)으로 타입 검색한 다음에 그 타입안에 있는 타겟 handler를 찾아서 remove
//     const eventId = element.dataset.eventId;
//     if (!eventId) return;

//     const targetType = eventMap.get(eventType);
//     if (!targetType) return;

//     const targetHandler = targetType.get(eventId);
//     if (targetHandler && targetHandler === handler) {
//         targetType.delete(eventId);
//     }
// }

// 수정
// eventId를 랜덤으로 부여해서 같은 타입의 이벤트에 서로 다른 handler를 등록하려 했는데 테스트 실패
//

const elementMap = new Map(); // Element → { click: fn, mouseover: fn, ... }
const registeredEventTypes = new Set(); // 중복 리스너 등록 방지용

// 공통 핸들러: 이벤트 위임 방식
const handleEvent = (e) => {
    const target = e.target;
    const eventType = e.type;

    const eventHandlerMap = elementMap.get(target);
    const handler = eventHandlerMap?.get(eventType);

    if (handler) {
        handler.call(target, e);
    }
};

export function setupEventListeners(root) {
    // 현재 등록된 이벤트 타입에 대해서만 루트에 위임 핸들러 등록
    for (const eventType of registeredEventTypes) {
        root.addEventListener(eventType, handleEvent);
    }
}

export function addEvent(element, eventType, handler) {
    if (!registeredEventTypes.has(eventType)) {
        registeredEventTypes.add(eventType);
    }

    let handlerMap = elementMap.get(element);
    if (!handlerMap) {
        handlerMap = new Map();
        elementMap.set(element, handlerMap);
    }

    handlerMap.set(eventType, handler);
}

// 어디에 쓰려나.. 컴포넌트를 정밀 제어할 때 쓰는거라 생각하고 일단 두자
export function removeEvent(element, eventType, handler) {
    const handlerMap = elementMap.get(element);
    if (!handlerMap) return;

    const currentHandler = handlerMap.get(eventType);
    if (currentHandler === handler) {
        handlerMap.delete(eventType);
    }

    if (handlerMap.size === 0) {
        elementMap.delete(element);
    }
}

export function clearEventMap(root) {
    for (const element of elementMap.keys()) {
        if (root.contains(element)) {
            elementMap.delete(element);
        }
    }
}


