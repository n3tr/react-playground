const number = 10;
function fn() {
  number;
}
__rpRun(number, {
  start: 5,
  end: 5
});
__rpRun(number + 1, {
  start: 6,
  end: 6
});
__rpRun(fn(number), {
  start: 7,
  end: 7
});
__rpRun(fn(number), {
  start: 8,
  end: 10
});
