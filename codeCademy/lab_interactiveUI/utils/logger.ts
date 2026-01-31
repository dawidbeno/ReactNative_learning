import { Product } from "../types";

class Logger {
    private logs: { productId: number; timeAdded: string }[] = [];

    public logCartItem(item: Product): void {
        const entry = {
        productId: item.id,
        timeAdded: new Date().toISOString()
        };
        this.logs.push(entry);
        console.log('[Logger] Cart item logged:', entry);
    }

}


export const logger = new Logger();
