let pjsklogo;
function preload() {
  size(700, 400);
  pjsklogo = loadImage("images/pjskLogoPrototype.png");
}

function draw() {
  image(pjsklogo, 0, 0);
}

function regFuc() {
  window.location.href = "IntuitSocial/pages/register.html";
}