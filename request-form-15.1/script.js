const form = document.getElementById("request-form");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

form.onsubmit = e => {
    e.preventDefault();
    input1.value = ""
    input2.value = ""
    fetch("http://localhost:8000/").then(res => {
        return res.text();
    }).then(text => {
        console.log(text)
    }).catch(err => {
        console.log('Fetch Error :-S', err);
    });
};