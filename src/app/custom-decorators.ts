export function Dummy(target): any {
  target.prototype.foo = 'bar';
  return target;
}
