export const convertToBRDate = (date: Date) => {
    return date.toLocaleString("pt-br");
};

export const convertToBRL = (price: number) => {
    return new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
    }).format(price);
};

export const convertToPercentage = (percent: number) => {
    return (percent + "%").replace(".", ",");
};
