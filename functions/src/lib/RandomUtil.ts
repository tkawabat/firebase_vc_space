export function toHankaku(str: string): string {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}

export function toZenkaku(str: string): string {
  return str.replace(/[A-Za-z0-9]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}

export function getInt(n: number) {
  return Math.floor(Math.random() * n);
}

export function getText(length: number) {
  if (length < 7) {
    return 'x'.repeat(length);
  }

  return (
    toZenkaku(length.toString()) +
    'あ'.repeat(length - length.toString().length)
  );
}

export function getRandomLengthText(max: number) {
  return getText(getInt(max));
}

export function takeRandom<T>(
  list: Array<T>,
  probability = 0.5
): Array<T> {
  return list.filter(() => Math.random() < probability);
}
