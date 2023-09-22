const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const form = document.querySelector(".sign-up-form");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});


form.addEventListener('submit', (e) => {
    e.preventDefault(); //Prevent HTML submission

    const fd = new FormData(form);

    const urlEncoded = new URLSearchParams(fd).toString();

    //const urlEncode = new URLSearchParams(fd).toString();

    fetch('http://localhost:3000/api/users', {
        method: "POST",
        body: urlEncoded,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        }
    })
})
