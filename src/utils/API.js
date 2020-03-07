
import employees from "../utils/employees";
// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getSearch: function(string) {
    // console.log("---array---", array); // returns full list of employees
    console.log("---string---", string); // returns string of input
    let searchEmp = [];
    employees.filter(obj => {
      let name = obj.name.toLowerCase();
      let email = obj.email.toLowerCase();
      let query = string.toLowerCase();
      if ( (name.includes(query)) || (email.includes(query)) ) {
        console.log(`---OBJ ${obj.id}---`, obj);
        searchEmp.push(obj);
        return obj;
      }
      else {
        return "no results";
      }
    });
    // searchEmp.push(filterName);
    // console.log("---filterName API---", filterName);

    console.log("---searchEmp API---", searchEmp);
    return searchEmp;
  },
  // getSortedList: function(employees, sort, toggle) {
  //   switch (toggle) {
  //     case "asc": 
  //       break;
  //     case "dsc":
  //       break;
  //   }
  // }
};
