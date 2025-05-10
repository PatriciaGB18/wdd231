document.addEventListener("DOMContentLoaded", () => {
  
  const currentYearSpan = document.getElementById("currentyear");
  if (currentYearSpan) {
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
  }

  
  const lastModifiedParagraph = document.getElementById("lastModified");
  if (lastModifiedParagraph) {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    lastModifiedParagraph.textContent = `Last Update: ${currentDate.toLocaleDateString('en-US', options)}`;
  }
});
