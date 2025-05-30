document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    {
      code: "CSE 110",
      name: "Introduction to Programming",
      credits: 2,
      completed: true,
      description: "Learn the basics of programming and problem-solving.",
      certificate: "Web and Computer Programming",
      technology: ["Python"]
    },
    {
      code: "WDD 130",
      name: "Web Fundamentals",
      credits: 2,
      completed: true,
      description: "Learn the basics of web development including HTML and CSS.",
      certificate: "Web and Computer Programming",
      technology: ["HTML", "CSS"]
    },
    {
      code: "CSE 111",
      name: "Programming with Functions",
      credits: 2,
      completed: true,
      description: "Dive deeper into programming using functions and problem decomposition.",
      certificate: "Web and Computer Programming",
      technology: ["Python"]
    },
    {
      code: "CSE 210",
      name: "Programming with Classes",
      credits: 2,
      completed: true,
      description: "Learn object-oriented programming and how to design software with classes.",
      certificate: "Web and Computer Programming",
      technology: ["Python"]
    },
    {
      code: "WDD 131",
      name: "Dynamic Web Fundamentals",
      credits: 2,
      completed: true,
      description: "Learn to build dynamic web pages using JavaScript.",
      certificate: "Web and Computer Programming",
      technology: ["HTML", "CSS", "JavaScript"]
    },
    {
      code: "WDD 231",
      name: "Front-end Development I",
      credits: 2,
      completed: false,
      description: "Learn front-end development using modern JavaScript and CSS techniques.",
      certificate: "Web and Computer Programming",
      technology: ["HTML", "CSS", "JavaScript"]
    }
  ];

  const courseButtonsContainer = document.querySelector(".course-buttons");
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const totalCreditsElement = document.querySelector("#totalCredits");
  const courseDetails = document.querySelector("#course-details");

  function calculateTotalCredits() {
    const totalCredits = courses
      .filter(course => course.completed)
      .reduce((acc, course) => acc + course.credits, 0);

    if (totalCreditsElement) {
      totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    }
  }

  function displayCourses(filteredCourses) {
    courseButtonsContainer.innerHTML = "";
    filteredCourses.forEach(course => {
      const button = document.createElement("button");
      button.textContent = `${course.code} (${course.credits} credits)`;

      if (course.code.startsWith("CSE")) {
        button.classList.add("cse");
      } else if (course.code === "WDD 231") {
        button.classList.add("w231");
      } else {
        button.classList.add("wdd");
      }

      if (course.completed) {
        button.classList.add("completed");
      }

      // 🔥 Adiciona evento para abrir o modal com os detalhes
      button.addEventListener("click", () => {
        displayCourseDetails(course);
      });

      courseButtonsContainer.appendChild(button);
    });

    calculateTotalCredits();
  }

  // 🔥 Função que popula e abre o modal
  function displayCourseDetails(course) {
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.code}</h2>
      <h3>${course.name}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `;

    courseDetails.showModal();

    const closeModal = courseDetails.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
      courseDetails.close();
    });

    // Fecha se clicar fora do modal
    courseDetails.addEventListener("click", (e) => {
      const rect = courseDetails.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        courseDetails.close();
      }
    });
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
        filteredCourses = courses;
      }
      displayCourses(filteredCourses);
    });
  });

  displayCourses(courses);
});
