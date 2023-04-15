function renderContactPage() {
  const Container = document.querySelector("#content");
  const Contact = document.createElement("div");
  const title = document.createElement("h1");
  title.innerText = "Contact Us";
  Contact.appendChild(title);
  Container.appendChild(Contact);
  console.log("Home");
}

export default renderContactPage;
