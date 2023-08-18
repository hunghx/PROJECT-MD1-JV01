// lấy ra tài khoản đăng nhập hiện tại
let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
// lấy ra vị trí cần chèn tên và avatar
let divs = document.getElementsByClassName("account");
// console.log(divs); 
// kiẻm tra sự tồn tại
if (userLogin != null ){ // nếu có tài khoản đăng nhập
    for (let i = 0; i < divs.length; i++) {
        const element = divs[i];
        element.innerHTML = `<div class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         <img width="30" height="30" style="border-radius:50%; object-fit : cover" src="./user/img/${userLogin.avatar}" alt="">
         <span>${userLogin.username}</span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#">MyProfile</a></li>
          <li><a class="dropdown-item" href="#">ChangePass</a></li>
          <li><a class="dropdown-item" onclick="handleLogout()" href="#">Logout</a></li>
        </ul>
      </div>`
    }
}else{ // chưa có tài khoản đăng nhập
    for (let i = 0; i < divs.length; i++) {
        const element = divs[i];
        element.innerHTML = `<a href="./user/login.html"><i class="fa fa-user"></i> Login</a>`
    }
}


const handleLogout=()=>{
    // trước khi đăng xuất thì lưu giỏ hàng vào local
    let users = JSON.parse(localStorage.getItem("users"))||[];

    // tìm vị trí của userlogin
    let userLoginIndex = users.findIndex((user)=>user.user_id == userLogin.user_id);

    users[userLoginIndex] = userLogin;
    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users))

    // thực hiện đăng xuất tài khoản
    sessionStorage.removeItem("userlogin");
    // load lại trang
    location.reload();
}

// findListProductByCategory();

// dổ ra danh sách danh mục
let initArr =  [
    { category_id: 1, name: "Quần" },
    { category_id: 2, name: "Áo" },
    { category_id: 3, name: "Trang sức" },
  ];
let categories = JSON.parse(localStorage.getItem("categories"))||initArr;

let str = "<li onclick='findListProductByCategory()' class='active'>All</li>";
for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    str+=`<li onclick="findListProductByCategory(${element.category_id})">${element.name}</li>`
}

document.querySelector(".featured__controls>ul").innerHTML=str;

// xem chi tiet sp
const showProductDetail =(id)=>{
    sessionStorage.setItem("pro_id",id);
    location.href=`/user/shop-details.html`;
}

// lọc danh sách sản phẩm theo danh mục 

function findListProductByCategory(idCat=0){
    let products = JSON.parse(localStorage.getItem("products"))||[];
    let listProduct;
   if(idCat === 0){
    //  lấy tất cả
        listProduct = products;
   }else{
        // lấy theo từng danh mục
        listProduct = products.filter(product =>product.category_id==idCat)
   }

   let str = "";
   for (let i = 0; i < listProduct.length; i++) {
    const element = listProduct[i];
    str+= `<div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
    <div class="featured__item">
        <div class="featured__item__pic set-bg">
            <img src="${element.image[0]}" alt="#"/>
            <ul class="featured__item__pic__hover">
                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
            </ul>
        </div>
        <div class="featured__item__text">
            <h6><a onclick="showProductDetail(${element.product_id})" href="#">${element.name}</a></h6>
            <h5>$${element.unit_price}</h5>
        </div>
    </div>
</div>`
   }
   document.querySelector('.featured__filter').innerHTML = str;
}
findListProductByCategory()

