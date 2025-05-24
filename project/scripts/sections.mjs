export function setSectionSelection(sections) {
  const select = document.getElementById("sectionNumber");

  sections.forEach(section => {
    const option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = section.sectionNum;
    select.appendChild(option);
  });
}
