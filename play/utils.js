export async function sleep(time) {
  return new Promise(_ => setTimeout(_, time * 1000));
}

export function getElementByXPath(xpath) {
  return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
}
