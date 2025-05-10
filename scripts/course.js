document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 231", name: "Front-end Development I", credits: 2, completed: false }
  ];

  const courseButtonsContainer = document.querySelector(".course-buttons");
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const totalCreditsElement = document.querySelector("#totalCredits"); // Elemento para mostrar o total de créditos

  // Função para calcular e exibir o total de créditos
  function calculateTotalCredits() {
    const totalCredits = courses
      .filter(course => course.completed)  // Filtra os cursos completados
      .reduce((acc, course) => acc + course.credits, 0); // Soma os créditos dos cursos completados

    // Exibe o total de créditos
    if (totalCreditsElement) {
      totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    }
  }

  function displayCourses(filteredCourses) {
    courseButtonsContainer.innerHTML = "";
    filteredCourses.forEach(course => {
      const button = document.createElement("button");
      button.textContent = `${course.code} (${course.credits} credits)`;  // Exibe o código do curso e os créditos

      // Adicionando classe baseada no código do curso
      if (course.code.startsWith("CSE")) {
        button.classList.add("cse");
      } else if (course.code === "WDD 231") {
        button.classList.add("w231");  // Classe específica para WDD 231
      } else {
        button.classList.add("wdd");
      }

      if (course.completed) {
        button.classList.add("completed");
      }
      courseButtonsContainer.appendChild(button);
    });
    
    // Recalcula o total de créditos após a exibição dos cursos
    calculateTotalCredits();
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.textContent;
      let filteredCourses;
      if (filter === "CSE") {
        filteredCourses = courses.filter(course => course.code.startsWith("CSE"));
      } else if (filter === "WDD") {
        filteredCourses = courses.filter(course => course.code.startsWith("WDD"));
      } else {
        filteredCourses = courses; // Todos
      }
      displayCourses(filteredCourses);
    });
  });

  // Exibe todos os cursos por padrão
  displayCourses(courses);
});
