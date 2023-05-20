import HeroImg from "./serve.webp";

function renderHomePage() {
  const Container = document.querySelector("#content");
  const title = document.querySelector("h1");
  title.innerText = "Eat. Code. Repeat.";

  const Home = document.createElement("div");

  const Hero = document.createElement("div");
  Hero.id = "hero";

  const heroText = document.createElement("div");
  heroText.id = "hero_text";

  const heroHeading = document.createElement("h2");
  heroHeading.textContent = "This is the juego bonito";
  heroText.appendChild(heroHeading);

  const heroDesc = document.createElement("p");
  heroDesc.textContent =
    "Lorem Ipsum is simply dummy text in the world. This line of text was generated using Tabnine";
  heroText.appendChild(heroDesc);

  Hero.appendChild(heroText);

  const heroImg = document.createElement("img");
  heroImg.id = "hero_image";
  heroImg.src = HeroImg;
  heroImg.alt = "Waiter serving a meal";
  Hero.appendChild(heroImg);

  Home.appendChild(Hero);
  Container.appendChild(Home);
}

export default renderHomePage;
