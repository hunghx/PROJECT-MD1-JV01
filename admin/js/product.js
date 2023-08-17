// lấy ra danh sách sp
let products = JSON.parse(localStorage.getItem("products")) || [];


// lấy ra danh sách danh mục
let categories = [
  { category_id: 1, name: "Quần" },
  { category_id: 2, name: "Áo" },
  { category_id: 3, name: "Trang sức" },
];

// Tìm kiếm tên danh mục theo id danh mục
const getCategoryNameByCategoryId = (id) => {
    // tim danh muc theo id
    // returrn vee teen 
  return categories.find((cat) => cat.category_id == id).name;
};
// hàm id tự tăng
const getNewId = ()=>{
    let max = 0;
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if(max<element.product_id){
            max = element.product_id;
        }
    }
    return max+1;
}
// tính toán tổng số trang ;
let totalProduct = products.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalProduct/count); // tổng số trang
console.log(totalPage); 


// đổ ra giao diện
const showPagination = ()=>{
    let links = "";
for (let i = 0; i < totalPage; i++) {
   links+= `<li class="page-item ${i==pageCurrent?'active':''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i+1}</a></li>`
}

document.querySelector(".pagination").innerHTML=  links
}


// phần trang  : số trang hiện tại / số phần tử trên 1 trang
const handlePagination= (page = 0)=>{
    pageCurrent  = page
    products.sort((a, b) =>b.product_id - a.product_id);
    let productPaginate = products.filter((p,index)=>(index>=(pageCurrent*count)&&index<(pageCurrent+1)*count))
    showListProduct(productPaginate)
    showPagination()
}


// đổ danh sách danh mục ra 
let str = "";
for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    str += `<option value="${element.category_id}">${element.name}</option>`;
}
document.getElementById("category").innerHTML = str;
document.getElementById("category_edit").innerHTML = str;



// Chức năng hiển thị
const showListProduct = (list = products) => {
    list.sort((a, b) =>b.product_id - a.product_id);
  let string = "";
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    string += `<tr>
    <td>${element.product_id}</td>
    <td>${element.name}</td>
    <td><img src="${element.image}" width="150" height="150" style="object-fit:cover" alt="#"></td>
    <td>${element.description.substring(0, 30)}</td>
    <td>${element.unit_price} $</td>
    <td>${element.stock}</td>
    <td>${getCategoryNameByCategoryId(element.category_id)}</td>
    <td>
        <button type="button"  data-bs-toggle="modal" data-bs-target="#editModal" onclick ="showProductEdit(${element.product_id})" class="btn btn-warning">Edit</button>
    </td>
    <td>
        <button type="button" onclick ="handleDeleteProduct(${element.product_id})" class="btn btn-danger">Delete</button>
    </td>
</tr>`;
  }
  document.getElementById("products").innerHTML = string;
};
// gọi hàm 1 lần khi tải trang 
showListProduct();

// chức năng thêm mới
const handleAddNewProduct=()=>{
    // lấy đươc toàn bộ dữ liệu của ô input
    let product_id = getNewId();
    let name = document.getElementById("product_name").value;
    let image = getImage();
    let description = document.getElementById("description").value;
    let unit_price = document.getElementById("product_price").value;
    let stock = document.getElementById("stock").value;
    let category_id = document.getElementById("category").value;
    let error = "";
    if(name.trim()==""){
        error = "Tên không được để trống"
        document.getElementById("error").innerHTML = error;
        return
    }

    if(unit_price <=0){
        error = "Đơn giá phải lớn hơn 0";
        document.getElementById("error").innerHTML = error;
        return
    }
    if(stock <=0){
        error = "Số lượng phải lớn hơn 0";
        document.getElementById("error").innerHTML = error;
        return
    }

    let newProduct = {
        product_id,
        name,
        image,
        description,
        unit_price,
        stock,
        category_id
    }
    // thêm vào mảng
    products = [...products, newProduct];
    localStorage.setItem("products",JSON.stringify(products));
    // tắt modal sử dụng js (jquery)
    // $('#addModal').modal('hide');
    // document.getElementsByTagName("body")[0].classList.remove("modal-open");
    // showListProduct();
     location.reload();
    
}

//  chức năng xóa 
const handleDeleteProduct=(id)=>{ 
if(confirm("bạn có chắc chắn muốn xóa sp này không?")){
     let indexDelete = products.findIndex(p=> p.product_id === id);
    products.splice(indexDelete,1);
    localStorage.setItem("products",JSON.stringify(products));
    location.reload();
}

   
}

// chức năng sửa 
// lấy toàn bộ thông tin cũ và đổ ra modal
const showProductEdit=(id)=>{
    let proEdit = products.find(product =>product.product_id===id);
        // đổ toàn bộ dữ liệu ra forrm
        document.getElementById("product_id").value = proEdit.product_id;
        document.getElementById("product_name_edit").value = proEdit.name;
        document.querySelector("#old_image img").src = proEdit.image;
        document.getElementById("description_edit").value = proEdit.description;
        document.getElementById("product_price_edit").value = proEdit.unit_price;
        document.getElementById("stock_edit").value = proEdit.stock;
        document.getElementById("category_edit").value = proEdit.category_id;
       
 }



// chúc năng cập nhật lại và lưu thay dổi
const handleUpdateProduct=()=>{
    // lấy đươc toàn bộ dữ liệu của ô input
    let product_id = document.getElementById("product_id").value;
    let name = document.getElementById("product_name_edit").value;
    let image = getImage();
    let description = document.getElementById("description_edit").value;
    let unit_price = document.getElementById("product_price_edit").value;
    let stock = document.getElementById("stock_edit").value;
    let category_id = document.getElementById("category_edit").value;
    // let error = "";
    // if(name.trim()==""){
    //     error = "Tên không được để trống"
    //     document.getElementById("error_edit").innerHTML = error;
    //     return
    // }

    // if(unit_price <=0){
    //     error = "Đơn giá phải lớn hơn 0";
    //     document.getElementById("error_edit").innerHTML = error;
    //     return
    // }
    // if(stock <=0){
    //     error = "Số lượng phải lớn hơn 0";
    //     document.getElementById("error_edit").innerHTML = error;
    //     return
    // }
    // lấy vị trí cần sửa 
    let indexUpdate = products.findIndex(p=>p.product_id===product_id);
    products[indexUpdate] = {...products[indexUpdate],name,image,unit_price,stock,description,category_id}
    
    console.log(products[indexUpdate]);
    localStorage.setItem("products",JSON.stringify(products));
    // tắt modal sử dụng js (jquery)
    // $('#addModal').modal('hide');
    // document.getElementsByTagName("body")[0].classList.remove("modal-open");
    // showListProduct();
     location.reload();
    
}


// chức năng tìm kiếm 
const handleSearch =()=>{
    // lấy ra được chuỗi tìm kiếm 
    let name = document.getElementById("search").value
    console.log(name);
    let productsSearch = products.filter(product =>product.name.toLowerCase().includes(name.toLowerCase()))
    showListProduct(productsSearch)
}
handlePagination(0);

