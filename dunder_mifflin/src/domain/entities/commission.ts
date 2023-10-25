class Commission {
    id: number;
    seller: string;
    totalCommission: number;
    totalQuantity: number;

    constructor(
        id: number,
        seller: string,
        totalCommission: number,
        totalQuantity: number
    ) {
        this.id = id;
        this.seller = seller;
        this.totalCommission = totalCommission;
        this.totalQuantity = totalQuantity;
    }
}
