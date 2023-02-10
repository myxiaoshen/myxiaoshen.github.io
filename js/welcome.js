function welcome(){

        welcome_text="小蓝盘目前出于维护状态开放时间待定~";//获取用户来源域名
    swal({
        title: "欢迎来到破站",
        imageUrl: "/img/hi.png",//图片，自行修改位置
        text: welcome_text="小蓝盘目前出于维护状态开放时间待定~",//欢迎文本，可自行修改
        timer: 2000,//弹出时间
        showConfirmButton: false
    });
}
$(document).ready(()=>{//若未引用JQuery，请引用
    welcome()
})