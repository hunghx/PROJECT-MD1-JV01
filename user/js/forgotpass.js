let users = JSON.parse(localStorage.getItem("users"))||[];
const form1 =document.getElementById("form-1");
const form2 =document.getElementById("form-2");
let email;

// ham hien thi form
const showForm = (check)=>{
if(check){
    form1.style.display = "block";
    form2.style.display = "none";
}else{
    form1.style.display = "none";
    form2.style.display = "block";
}
}
showForm(true);

const handleForgotPass = ()=>{
    email = document.getElementById('email').value;
    // kieemr tra email co ton tai khong
    if(checkExistEmail(email)){
        // email dung
        showForm(false);
    }else{
        // email sai
        document.getElementById('error').innerText = "Email không tồn tại, vui lòng thử lại";
        return
    }
}

const checkExistEmail =(email)=>{
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if(element.email ===  email){ 
            // 1000 - 9999
            let random = Math.round(Math.random()*8999) +1000
            localStorage.setItem("code",random);
            return true;
        }
    }
    return false

}
// xác thực code 
const confirmCode =()=>{
    //  lấy ra giá trị nhập vào
    let code = document.getElementById("code").value;
    // lấy codeowr trên local
    let codeLocal = localStorage.getItem("code")
    if(codeLocal !=code){
        // không khớp 
        document.getElementById('errcode').innerText = "Code không hợp lệ, thử lại";
        return;
    }else{
        // đổi pass và hiển thị cho người dùng
        let newPassword = "123456";
        // tìm kiếm vị trí cần sửa
        let indexEdit = users.findIndex(user => user.email === email)
        // sửa pass
        users[indexEdit].password = newPassword;
        // lưu lên local 
        localStorage.setItem('users',JSON.stringify(users));
        //hiển thị mật khẩu mới
        alert("Mật khẩu của bạn là "+ newPassword +", vui lòng đăng nhập và đổi mật khẩu")
        location.href = "/user/login.html"
    }
}