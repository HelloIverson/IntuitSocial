for (let i=0; i<5; i++) {
  console.log("<p" + i + "> TEST!! </p" + i + ">");
  document.body.innerHTML = "<p" + i + "> TEST!! </p" + i + ">";
}
document.body.innerHTML = "<p>Done</p>";

