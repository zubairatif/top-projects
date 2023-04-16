function renderMenuPage() {
  const Container = document.querySelector("#content");
  const Menu = document.createElement("div");
  const title = document.createElement("h1");
  title.innerText = "View Our Delicious Menu";
  Menu.appendChild(title);
  Container.appendChild(Menu);
  console.log("Home");
}
export default renderMenuPage;
