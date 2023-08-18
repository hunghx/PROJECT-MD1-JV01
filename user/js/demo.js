let cart = [
    {id:1, price : 100,quantity : 10},
    {id:2, price : 110,quantity : 11},
    {id:3, price : 120,quantity : 12},
    {id:4, price : 130,quantity : 13},
    {id:5, price : 140,quantity : 14},
    {id:6, price : 150,quantity : 15}
]

// let order_details = cart.map((ci=>({...ci,name:`sản phẩm ${ci.id}`})));
let order_details = [];
for (let i = 0; i < cart.length; i++) {
    const od = cart[i];
    let new_order_detail = {...od,name: `sản phẩm ${od.id}`}
    order_details = [...order_details,new_order_detail]
}

console.log(order_details);


// let total = 0;

// for (let i = 0; i < order_details.length; i++) {
//     const element = order_details[i];
//     total+= element.price*element.quantity;
// }
// console.log(total);
