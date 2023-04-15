function renderMenuPage() {
  //container
  const Container = document.querySelector("#content");

  const Menu = document.createElement("div");
  Menu.classList.add("content");
  Container.appendChild(Menu);
  console.log("Menu");
}
export default renderMenuPage;
