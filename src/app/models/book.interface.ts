export interface BookInterface{

    /**
     * the picture url attached at this book
     */
    cover:string;
    /**
     * code isbn use for promotions
     */
    isbn:string;
    /**
     * price of the book
     */
    price:number;
    /**
     * description of the book cut in part
     */
    synopsis:Array<string>;
    /**
     * title of the book
     */
    title:string;

}