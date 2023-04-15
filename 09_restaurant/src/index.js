import pageLoad from "./header/page_load";
import renderHomePage from "./home/home";
import renderMenuPage from "./menu/menu";
import renderContactPage from "./contact/contact";
import "./style.css";
pageLoad();
renderHomePage();
const Container = document.getElementById("content");
let currentTab = "home";
const tabLinks = document.querySelectorAll(".tab");
tabLinks.forEach((link) => {
  link.parentNode.addEventListener("click", (e) => {
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
        break;
      case "contact":
        currentTab = "contact";
        renderContactPage();
        break;
      default:
        currentTab = "home";
        renderHomePage();
        break;
    }
  });
});
