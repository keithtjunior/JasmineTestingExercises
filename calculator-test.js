
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount: 5000, years: 2, rate: 5})).toEqual('219.36');
  expect(calculateMonthlyPayment({amount: 12400, years: 5, rate: 0})).toEqual('206.67');
  expect(calculateMonthlyPayment({amount: 0, years: 1, rate: 0})).toEqual('0.00');
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount: 8200, years: 4, rate: 14})
      .split(".")[1]?.length == 2).toEqual(true);
});


