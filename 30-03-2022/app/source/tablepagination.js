function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));
  var input = document.createElement("input");
  input.setAttribute("onchange", "calculateSum()");
  e.target.appendChild(input);
}

function allowDrop(e) {
  e.preventDefault();
}

function calculateSum() {
  var inputs = document.getElementsByTagName("input");
  var sum = 0;
  for (index = 0; index < inputs.length; ++index) {
    sum +=
      Number(inputs[index].value) *
      Number(inputs[index].previousElementSibling.value);
  }
  document.getElementById("sum").innerHTML = sum;
}
