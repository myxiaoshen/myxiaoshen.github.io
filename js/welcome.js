function welcome(){

        welcome_text="小蓝盘目前出于维护状态开放时间待定~";
    swal({
        title: "欢迎！",
        imageUrl: "/img/hi.png",
        text: welcome_text="小蓝盘目前出于维护状态开放时间待定~", 
        timer: 2000,//弹出时间
        showConfirmButton: false
    });
}
$(document).ready(()=>{//若未引用JQuery，请引用
    welcome()
})
