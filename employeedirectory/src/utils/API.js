
import employees from "../utils/employees";
// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getSearch: function(string) {
    let searchEmp = [];
    employees.filter(obj => {
      let name = obj.name.toLowerCase();
      let email = obj.email.toLowerCase();
      let query = string.toLowerCase();
      if ( (name.includes(query)) || (email.includes(string)) ) {
        console.log(`---OBJ ${obj.id}---`, obj);
        searchEmp.push(obj);
        return obj;
      }
      else {
        return "no results";
      }
    });
    console.log("---searchEmp API---", searchEmp);
    return searchEmp;
  }
};
