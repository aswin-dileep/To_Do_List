const { text } = require("body-parser");

function underline() {
    const btnc = document.getElementById('dataInput');
    const checkBtn =document.getElementById('checkBtn')
    if(checkBtn.checked==true){
        btnc.style="text-decoration:line-through";
    }else{
        btnc.style="text-decoration:none";
    }

      

}