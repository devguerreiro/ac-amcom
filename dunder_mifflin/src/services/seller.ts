import Seller, { SellerFactory } from "@/domain/entities/seller";

export default class SellerService {
    static fromAPIList(data: any): Array<Seller> {
        return data.map((item: any) => {
            return SellerFactory.createSeller(
                item.id,
                item.name,
                item.email,
                item.phone
            );
        });
    }
}
