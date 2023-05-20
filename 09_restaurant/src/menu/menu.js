function renderMenuPage() {
  const Container = document.querySelector("#content");
  const title = document.querySelector("h1");
  title.innerText = "View Our Delicious Menu";

  const Menu = document.createElement("div");

  Container.appendChild(Menu);
}
export default renderMenuPage;
