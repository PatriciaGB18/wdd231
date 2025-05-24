const byuiCourse = {
  code: "CSE 121b",
  name: "JavaScript Language",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro. Jackson" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 25, days: "TTh", instructor: "Sis. Smith" },
    { sectionNum: 3, roomNum: "STC 103", enrolled: 30, days: "MWF", instructor: "Bro. Hansen" }
  ],
  changeEnrollment(sectionNum, add = true) {
    const section = this.sections.find(sec => sec.sectionNum == sectionNum);
    if (section) {
      if (add) {
        section.enrolled++;
      } else {
        section.enrolled--;
      }
    }
  }
};

export default byuiCourse;
