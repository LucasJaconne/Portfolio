// Scroll para seção de projetos ao clicar no ícone
function scrollToProjects() {
  const projectsSection = document.getElementById("section-projects");
  projectsSection.scrollIntoView({ behavior: "smooth" });
}

// Scroll automático ao dar scroll para baixo estando no topo
let autoScrolled = false;

window.addEventListener("wheel", function (e) {
  if (window.scrollY === 0 && !autoScrolled && e.deltaY > 0) {
    e.preventDefault();
    autoScrolled = true;
    scrollToProjects();
  }
}, { passive: false });
