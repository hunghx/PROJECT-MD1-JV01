let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
if (userLogin == null) {
  alert("Vui lòng đăng nhập đề xem giở hàng");
  location.href = "/user/login.html";
}
// danh sách sp
let products = JSON.parse(localStorage.getItem("products")) || [];

// hiển thị danh sách giỏ hàng

const showCart = () => {
    let total = 0;
  let listCartItem = userLogin.cart.reduce((string, ct, index) => {
    // lấy thông tin sp theo id
    let product = products.find((p) => p.product_id == ct.idProduct);

    total+= product.unit_price * ct.quantity;
    return (
      string +
      `<tr>
    <td>${index + 1}</td>
    <td>${product.name}</td>
    <td><img src="${
      product.image
    }" width="50" height="50" style="object-fit: cover;" alt=""></td>
    <td>${product.unit_price} $</td>
    <td><input id="quantity_${ct.idProduct}" type="number" min="1" value="${ct.quantity}"/></td>
    <td>${product.unit_price * ct.quantity} $</td>
    <td><a onclick="handleDelete(${ct.idProduct})" href="#"><i class="bi bi-trash"></i></a></td>
    <td><a onclick="handleUpdate(this,${ct.idProduct})"  href="#"><i class="bi bi-pencil-square"></i></a></td>
</tr>`
    );
  }, "");

  document.querySelector("tbody").innerHTML = listCartItem;
  document.querySelector("tfoot").innerHTML = ` <tr>
  <td colspan="8" style="text-align: center;">Tổng tiền : ${total}$</td>  
</tr>`;


};

showCart();

// XỬ lí xóa
const handleDelete=(idPro)=>{
    if(confirm("Are you sure you want to delete")){
        let indexDelete = userLogin.cart.findIndex(ct=>ct.idProduct == idPro)
        userLogin.cart.splice(indexDelete,1);
        sessionStorage.setItem("userlogin",JSON.stringify(userLogin))
        showCart();
    }
}

// hàm sử lí cập nhật
const handleUpdate=(e,idPro)=>{
    // lấy ra số lượng cần cập nhật
    let quantity  =  +document.querySelector(`#quantity_${idPro}`).value
// Láy ra vị trí cần cập nhật
    let indexCartItem = userLogin.cart.findIndex(
    (cartIt) => cartIt.idProduct == idPro
  );
  userLogin.cart[indexCartItem].quantity = quantity;
  sessionStorage.setItem("userlogin",JSON.stringify(userLogin))
  showCart();
}