export interface OfferInterface{

    /**
     * type of the best offer
     */
    type:string;
    /**
     * Value of the best offer to deduce at the total
     */
    value:number;
    /**
     * Total value of the cart
     */
    totalPrice:number;

}