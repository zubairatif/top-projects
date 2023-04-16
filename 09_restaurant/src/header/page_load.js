import Icon from "./icon.svg";
import Logo from "./logo.webp";

function renderHeader() {
  //container
  const Container = document.querySelector("#content");
  const Header = document.createElement("header");
  const supportsNesting = document.createElement("div");
  supportsNesting.classList.add("supports_nesting");
  Header.appendChild(supportsNesting);

  setTimeout(function () {
    if (supportsNesting.offsetParent == null) {
      alert(
        "Your Browser doesn't Support CSS Nesting so the Styling will not work.\n Please use the latest version of a Chromium-based browser or Safari"
      );
    }
  }, 2000);

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

  Container.appendChild(Header);
}
export default renderHeader;
