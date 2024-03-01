function getEnding(count) {
    if (count === 1) {
        return "продукт";
    } else if (count >= 2 && count <= 4) {
        return "продукта";
    } else {
        return "продуктов";
    }
}

export default getEnding;
