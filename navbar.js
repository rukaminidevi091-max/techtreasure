function togggleMenu(){
    document
        .getElementById("tt-nav")
        .classList.toggle("active");
}

// Close menu after clicking link
document.querySelectorAll("#tt-nav a").forEach(link=>{
    link.addEventListener("click",()=>{
        document
            .getElementById("tt-nav")
            .classList.remove("active");
    });
});


fetch('/components/navbar.html')
.then(res => res.text())
.then(data => {
    document.getElementById(
        'navbar-container'
    ).innerHTML = data;
});