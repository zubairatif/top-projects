import pageLoad from "./header/page_load";
import renderHomePage from "./home/home";
import renderMenuPage from "./menu/menu";
import renderContactPage from "./contact/contact";
import "./assets/style.css";
pageLoad();
renderHomePage();
const Container = document.getElementById("content");
let currentTab = "home";
const tabLinks = document.querySelectorAll(".tab");
tabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.dataset["tab"] === currentTab) return;
    console.log("e.target.dataset.tab: ", e.target.dataset["tab"]);
    while (Container.childNodes.length > 1) {
      if (Container.lastChild.tagName !== "HEADER") {
        content.removeChild(content.lastChild);
      } else {
        break;
      }
    }
    switch (e.target.dataset.tab) {
      case "menu":
        currentTab = "menu";
        renderMenuPage();
        e.target.setAttribute("aria-selected", true);
        break;
      case "contact":
        currentTab = "contact";
        renderContactPage();
        e.target.setAttribute("aria-selected", true);
        break;
      default:
        currentTab = "home";
        e.target.setAttribute("aria-selected", true);
        renderHomePage();
        break;
    }
  });
});

