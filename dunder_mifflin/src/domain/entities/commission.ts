class Commission {
    id: number;
    seller: string;
    total_commission: number;
    total_quantity: number;

    constructor(
        id: number,
        seller: string,
        total_commission: number,
        total_quantity: number
    ) {
        this.id = id;
        this.seller = seller;
        this.total_commission = total_commission;
        this.total_quantity = total_quantity;
    }
}
