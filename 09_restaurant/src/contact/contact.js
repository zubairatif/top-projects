function renderContactPage() {
  const Container = document.querySelector("main");
  const title = document.querySelector("h1");
  title.innerText = "Contact Us";

  const Contact = document.createElement("div");
  
  Container.appendChild(Contact);
}

export default renderContactPage;
