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