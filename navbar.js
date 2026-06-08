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
    // ensure pwa.js is loaded on pages that don't include it statically
    if (!document.querySelector('script[src="/pwa.js"]')){
        const s = document.createElement('script');
        s.src = '/pwa.js';
        s.async = true;
        document.body.appendChild(s);
    } else {
        // if script already present and exposes initPWA, call init if available
        if (window.initPWA) try{ window.initPWA(); } catch(e){}
    }
});