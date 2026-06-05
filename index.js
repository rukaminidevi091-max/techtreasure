function toggle(el){
  const content = el.nextElementSibling;
  const icon = el.querySelector("span");

  if(content.style.maxHeight){
    content.style.maxHeight = null;
    icon.textContent = "+";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    icon.textContent = "−";
  }
}

const searchInput = document.getElementById("toolSearch");
const searchBtn = document.getElementById("searchBtn");

function searchFeatures() {

    const searchText =
    searchInput.value.toLowerCase().trim();

    const features =
    document.querySelectorAll(".feature");

    let found = false;

    features.forEach(feature => {

        const text =
        feature.textContent.toLowerCase();

        if (text.includes(searchText)) {

            feature.style.display = "block";
            found = true;

        } else {

            feature.style.display = "none";
        }

    });

}

searchBtn.addEventListener(
    "click",
    searchFeatures
);

searchInput.addEventListener(
    "keyup",
    e => {

        if (e.key === "Enter") {
            searchFeatures();
        }

    }
);
