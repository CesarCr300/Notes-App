function spinWords(string) {
    const words = string.split(" ")
    for (let i = 0; i < words.length; i++) {
        if (words[i].split("").length >= 5) {
            words[i] = words[i].split("").reverse().join("")
        }
    }
    return words.join(" ")
}

console.log(spinWords("Hey fellow warriors"))