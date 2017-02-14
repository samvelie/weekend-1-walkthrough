//waits for DOM to completely load
$(document).ready(function(){

  //event listener for click on submitNewEmployee button
  $('form').on('submit', function(event){
    //stops us from going to a new page
    event.preventDefault();
    //logging the created array of inputs. the inputs are converted to objects by this serializeArray method, with two key-value pairs each, coming from the name of the input and the user-submitted value, e.g. {name: 'jobTitle', value: 'Instructor'}
    console.log('form values: ', $(this).serializeArray());

    var submissionArray = $(this).serializeArray(); // [{},{},...]
    var newEmployeeObject = {}; //wanting {firstName: 'Luke', lastName: 'Schlangen', ...}

    /*explanation of below forEach operation:
    newEmployeeObject starts at {}
    on first time through, this is the same as assigning newEmployeeObject.firstName = 'Luke'
    1st time through newEmployeeObject is {firstName: 'Luke'}
    2nd time through newEmployeeObject is {firstName: 'Luke', lastName} */
    submissionArray.forEach(function(inputField){
      newEmployeeObject[inputField.name] = inputField.value;
    })

    // example of working for loop version of above
    // for (var i = 0; i < submissionArray.length; i++) {
    //   newEmployeeObject[submissionArray[i].name] = submissionArray[i].value;
    // }

    console.log(newEmployeeObject);


    //adds new employee row to the DOM
    $('#employeeTableBody').append(
      '<tr>' +
      '<td>' + newEmployeeObject.firstName + '</td>' +
      '<td>' + newEmployeeObject.lastName + '</td>' +
      '<td>' + newEmployeeObject.idNumber + '</td>' +
      '<td>' + newEmployeeObject.jobTitle + '</td>' +
      '<td>' + newEmployeeObject.annualSalary + '</td>' +
      '<td><button class="deleteEmployeeButton" data-salary="' + newEmployeeObject.annualSalary + '">Delete '+ newEmployeeObject.firstName + '</button></td>' +
      '</tr>'
    );

    //add monthly salary expenses to the DOM
    var newEmployeeMonthlyExpenses = annualSalary/12;
    var previousMonthlyExpenses = $('#monthlyExpenses').text(); // goes to DOM, not the HTML to grab the updated number
    var totalMonthlyExpenses = parseFloat(previousMonthlyExpenses) + newEmployeeMonthlyExpenses;
    $('#monthlyExpenses').text(totalMonthlyExpenses); //replaces the text of the span with the id monthlyExpenses on the DOM

    //clear out input boxes
    $('.employeeFormInput').val('');
  });

  // listens for click on table on deleteEmployeeButton
  $('#employeeTableBody').on('click', '.deleteEmployeeButton', function(){
      var deletedEmployeeSalary = $(this).data('salary'); //grabbing deleted employee salary to remove from total
      var deletedEmployeeMonthlyExpenses = deletedEmployeeSalary/12; //dividing to make it monthly
      var previousMonthlyExpenses = $('#monthlyExpenses').text(); //grabbing the current value from the DOM
      var newTotalMonthlyExpenses = previousMonthlyExpenses - deletedEmployeeMonthlyExpenses; //creating number that will replace current number for expenses
      $('#monthlyExpenses').text(newTotalMonthlyExpenses); //replacing text with updated number

      $(this).parent().parent().remove(); //selecting the row of the clicked delete button and removing it
  });
});
