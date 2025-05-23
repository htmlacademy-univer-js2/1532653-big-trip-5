function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, capitalizeFirstLetter, updateItem};
