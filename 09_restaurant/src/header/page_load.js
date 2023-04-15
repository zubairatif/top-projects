import Icon from "./icon.svg";
import Logo from "./logo.webp";

function renderHeader() {
  //container
  const Container = document.querySelector("#content");
  const Header = document.createElement("header");

  const logo = document.createElement("div");
  logo.classList.add("logo");

  const icon = document.createElement("img");
  icon.src = Icon;
  icon.alt = "icon";
  logo.appendChild(icon);

  const logoText = document.createElement("img");
  logoText.classList.add("logo_text");
  logoText.src = Logo;
  logoText.alt = "Dev Food";
  logo.appendChild(logoText);

  Header.appendChild(logo);

  const nav = document.createElement("nav");
  nav.innerHTML = `<ul>
  <li class="tab" data-tab="home"><a href="#">Home</a></li>
  <li class="tab" data-tab="menu"><a href="#">Menu</a></li>
  <li class="tab" data-tab="contact"><a href="#">Contact</a></li>
</ul>`;
  Header.appendChild(nav);

  const linksDiv = document.createElement("div");

  const igLink = document.createElement("a");
  igLink.innerHTML = '<a class="social_link" href="meta.com">FB</a>';
  linksDiv.appendChild(igLink);

  const fbLink = document.createElement("a");
  fbLink.innerHTML = '<a class="social_link" href="meta.com">IG</a>';
  linksDiv.appendChild(fbLink);

  Header.appendChild(linksDiv);

  Container.appendChild(Header);
}
export default renderHeader;
