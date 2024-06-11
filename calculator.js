window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
function setupIntialValues() {
  document.getElementById("loan-amount").value = 0;
  document.getElementById("loan-years").value = 1;
  document.getElementById("loan-rate").value = 0;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues();
  let updateValues = {
    amount: !isNaN(values.amount) ? +(values.amount) : 0,
    years: !isNaN(values.years) ? (+(values.years) < 1 ? 1 : +(values.years)): 1,
    rate: !isNaN(values.rate) ? +(values.rate) : 0
  }
  let monthly = calculateMonthlyPayment(updateValues);
  updateMonthly(monthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if(values.rate !== 0) {
    let interestRate  = (values.rate / 12) * .01;
    let numPayments = values.years * 12;
    return ((values.amount * interestRate) / 
            (1 - Math.pow((1 + interestRate), -numPayments))).toFixed(2).toString();
  }
  return (values.amount / (values.years * 12)).toFixed(2).toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyPayent = monthly.toLocaleString(undefined, { maximumFractionDigits: 2 });
  let formatedMonthly = String(monthlyPayent).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById("monthly-payment").innerText = `$${formatedMonthly}`;
}
