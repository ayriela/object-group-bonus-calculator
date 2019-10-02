const employees = [
  {
    name: 'Atticus',
    employeeNumber: '2405',
    annualSalary: '47000',
    reviewRating: 3
  },
  {
    name: 'Jem',
    employeeNumber: '62347',
    annualSalary: '63500',
    reviewRating: 4
  },
  {
    name: 'Scout',
    employeeNumber: '6243',
    annualSalary: '74750',
    reviewRating: 5
  },
  {
    name: 'Robert',
    employeeNumber: '26835',
    annualSalary: '66000',
    reviewRating: 1
  },
  {
    name: 'Mayella',
    employeeNumber: '89068',
    annualSalary: '35000',
    reviewRating: 1
  }
];

// YOU SHOULD NOT NEED TO CHANGE ANYTHING ABOVE THIS POINT

// Take small steps! Don't write a for loop and two functions that do all of the calculations right away.
// This problem is massive! Break the problem down. Use the debugger.
// What is the fewest lines of code I can write and test to get just a little closer?

// This is not a race. Everyone on your team should understand what is happening.
// Ask questions when you don't.

//retrieve bonus info when user clicks the button 

//call within ready function to make sure DOM is loaded 
//use getEmployeeBonus reference name instead of function call so you don't accidentally call before click action
//event trigger needs to be within function call though to use that reference name 
$(document).ready(function(){
  $('#getBonus').on('click', getEmployeeBonus) 
});




function getEmployeeBonus(){
  let finalEmployee=[];
  for (i in employees){
    console.log( newEmployeeData(employees[i]));
    //build new array to use for display
    finalEmployee.push(newEmployeeData(employees[i]));
  } 
  displayEmployeeBonuses(finalEmployee);
}//end getEmployeeBonus


function newEmployeeData(employee){
  //create object to be filled
  let=updateEmployee={};
  if (employee.reviewRating >= 3){
    //set bonus percent constant
    const bonusPer=calculateBonus(employee);
    updateEmployee={
        name: employee.name,
        bonusPercent: bonusPer,
        totalCompensation: Math.round(employee.annualSalary * (1 + bonusPer)),
        totalBonus: Math.round(bonusPer * employee.annualSalary)
    };
   
  } else{
     updateEmployee = {
        name: employee.name,
        bonusPercent: 0,
        totalCompensation: Number(employee.annualSalary),
        totalBonus: 0
     };//set new object for employees with no bonus
  }
  return updateEmployee;
}//end newEmployeeData

function calculateBonus(employee){
  //set initial bonus percentage based on rating
  let bonusPercent= 0;
  if(employee.reviewRating === 5){
    bonusPercent = 0.1;
  } else if (employee.reviewRating === 4){
    bonusPercent = 0.06;
  } else {
    bonusPercent = 0.04;
  }
  //check if employee has 15 years and add 5 percent
  if (employee.employeeNumber.length===4){
    bonusPercent += 0.05;
  } 
  //check if the salary is already over 65000 and lose 1 percent
  if (Number(employee.annualSalary) > 65000){
    bonusPercent -= 0.01;
  }
  //check to see if it's fallen outside the boundaries of allowed bonuses
  if (bonusPercent > 0.13){
    bonusPercent= 0.13;
  } else if (bonusPercent<0){
    bonusPercent=0;
  }
  //for debugconsole.log(bonusPercent);
  return bonusPercent;
}//end calculateBonus

function displayEmployeeBonuses(employeeList){
  let str = '<ul>';
  for (i in employeeList){
      //build list to display employee data
      str += '<li>' + employeeList[i].name + 
      //create sub-list to display additional details
      '<ul><li> Bonus Percentage: ' + 
      //format percent as whole number
      Number(employeeList[i].bonusPercent) * 100 + '% </li>' +
       //format total bonus as money
       '<li> Total Bonus: $' + (employeeList[i].totalBonus).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</li>' +
      //format total compensation as money
      '<li> Total Compensation: $' + (employeeList[i].totalCompensation).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</li></ul></li>'
    }
    str += '</ul>';
    document.getElementById("employeeData").innerHTML = str;
}


