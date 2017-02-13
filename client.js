//waits for DOM to completely load
$(document).ready(function(){
  //event listener for click on submitNewEmployee button
  $('#submitNewEmployee').on('click', function(){
    // declares variables and retrieving values from input boxes
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var idNumber = $('#idNumber').val();
    var jobTitle = $('#jobTitle').val();
    var annualSalary = $('#annualSalary').val();

    //adds new employee row to the DOM
    $('#employeeTableBody').append(
      '<tr>' +
      '<td>' + firstName + '</td>' +
      '<td>' + lastName + '</td>' +
      '<td>' + idNumber + '</td>' +
      '<td>' + jobTitle + '</td>' +
      '<td>' + annualSalary + '</td>' +
      '<td><button class="deleteEmployeeButton">Delete '+ firstName + '</button></td>' +
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
      $(this).parent().parent().remove(); //selecting the row of the clicked delete button
  });
});
