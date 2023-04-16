function renderHomePage() {
  //container
  const Container = document.querySelector("#content");

  const Home = document.createElement("div");
  const title = document.createElement("h1");
  title.innerText = "Eat. Code. Repeat";
  Home.appendChild(title);
  Container.appendChild(Home);
}

export default renderHomePage;
