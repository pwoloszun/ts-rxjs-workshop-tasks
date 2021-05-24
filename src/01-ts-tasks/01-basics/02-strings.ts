/*
 * Usage:
 * reverse("abc") => "cba"
 * */
function reverse(input: string): string {
  let result: string = "";
  for (let i: number = input.length - 1; i >= 0; i--) {
    result += input[i];
  }
  return result;
}

/*
 * Usage:
 * reverseEachWord("abc xyz") => "cba zyx"
 * */
function reverseEachWord(input: string): string {
  let words: string[] = input.split(" ");
  let reversedWords: string[] = [];
  for (let i: number = 0; i < words.length; i++) {
    reversedWords.push(reverse(words[i]));
  }
  return reversedWords.join(" ");
}

export function stringsApp() {
  console.log("reverse:", reverse("abc"));
  console.log("reverseEachWord:", reverseEachWord("abc xyz"));
}
