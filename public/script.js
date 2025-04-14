document.querySelector("#menuToggle").addEventListener("click", function () {
  document.querySelector(".toggleMenu").classList.toggle("hidden");
});

document.getElementById("requestBtn").addEventListener("click", () => {
  window.location.href = "form.html";
});
