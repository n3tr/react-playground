const number = 10;
function fn() {
  number;
}
run(number, {
  start: 5,
  end: 5
});
run(number + 1, {
  start: 6,
  end: 6
});
run(fn(number), {
  start: 7,
  end: 7
});
run(fn(number), {
  start: 8,
  end: 10
});
