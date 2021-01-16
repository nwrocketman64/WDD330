function displayText(){
    let value = document.getElementById("input1").value;
    document.getElementById("output1").textContent = "Output: " + value;
};

const addUp = function(){
    let endValue = document.getElementById("input2").value;
    let sum = 0
    if (isFinite(endValue)){
        for (i = 1; i <= endValue; i++){
            sum = sum + i;
        };
        document.getElementById("output2").textContent = "Output: " + sum;
    } else {
        document.getElementById("output2").textContent = "Not a number"
    };
};

const addValues = () => {
    let number1 = parseInt(document.getElementById("num1").value);
    let number2 = parseInt(document.getElementById("num2").value);
    let sum = number1 + number2;
    document.getElementById("output3").textContent = "Output: " + sum;
}; 