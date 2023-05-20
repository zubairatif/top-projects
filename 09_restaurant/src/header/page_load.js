import Icon from "./icon.svg";
import Logo from "./logo.webp";

function renderHeader() {
  const Container = document.createElement("main");
  Container.id = "content";

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
  <li aria-selected="true" class="tab" data-tab="home">Home</li>
  <li aria-selected="false" class="tab" data-tab="menu">Menu</li>
  <li aria-selected="false" class="tab" data-tab="contact">Contact</li>
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

  document.body.appendChild(Header);

  const supportsNesting = document.createElement("div");
  supportsNesting.classList.add("supports_nesting");
  supportsNesting.textContent =
    "Please use the latest version of Chrome or Safari for optimal viewing experience.";
  document.body.insertBefore(supportsNesting, Header);

  if (!supportsNesting.offsetParent == null)
    console.log("Nesting is not supported");

  const title = document.createElement("h1");
  Container.appendChild(title);
  
  document.body.appendChild(Container);
}
export default renderHeader;
