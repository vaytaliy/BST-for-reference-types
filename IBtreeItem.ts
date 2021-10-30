interface IBtreeItem {
    //return 1 if larger, 0 if same, -1 if smaller
    compareTo(object: any, id?: number | string): number;
    test : string;
}

export default IBtreeItem;