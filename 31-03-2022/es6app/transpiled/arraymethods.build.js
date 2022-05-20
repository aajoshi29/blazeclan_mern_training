"use strict";

var employees = [{
  empNo: 1,
  empName: "Alice",
  deptName: "IT",
  designation: "Clerk",
  salary: 10000
}, {
  empNo: 2,
  empName: "Bob",
  deptName: "Admin",
  designation: "Clerk",
  salary: 15000
}, {
  empNo: 3,
  empName: "Charlie",
  deptName: "IT",
  designation: "Manager",
  salary: 20000
}, {
  empNo: 4,
  empName: "David",
  deptName: "Admin",
  designation: "Manager",
  salary: 25000
}, {
  empNo: 5,
  empName: "Eve",
  deptName: "HR",
  designation: "Manager",
  salary: 25000
}, {
  empNo: 6,
  empName: "Fox",
  deptName: "IT",
  designation: "Operator",
  salary: 8000
}];
var employees_by_dept = employees.reduce(function (prevRec, curRec) {
  if (curRec.deptName in prevRec) {
    prevRec[curRec.deptName]++;
  } else {
    prevRec[curRec.deptName] = 1;
  }

  return prevRec;
}, {});
console.log("Number of employees grouped by department: ");
console.log(employees_by_dept);
var count_of_designations = employees.reduce(function (prevRec, curRec) {
  if (curRec.designation in prevRec) {
    prevRec[curRec.designation]++;
  } else {
    prevRec[curRec.designation] = 1;
  }

  return prevRec;
}, {});
console.log("Number of Managers, Clerks, Operators are in the array: ");
console.log(count_of_designations);
