function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

if(document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/))
{
  console.log("User identified as logged in");
  removeElement("registerLink");
  removeElement("loginLink");
  document.getElementById('logoutLink').onclick = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href= window.location.host
  }
}else{
  console.log("User identified as logged out");
  removeElement("logoutLink");
  removeElement("paneLink");
};
