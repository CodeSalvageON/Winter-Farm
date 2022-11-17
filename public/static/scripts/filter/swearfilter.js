// Not really efficient but it gets the job done.
const swearList = ["fuck", "shit", "cunt", "nigger", "nigga", "kike", "beaner", "zipperhead", "bitch", "kaffir", "gook"];

function filterSwears (sentence) {
  let lowerSentence = sentence.toLowerCase();
  let split_sentence = lowerSentence.split(" ");

  for (i = 0; i < split_sentence.length; i++) {
    let splitSentencer = split_sentence[i];

    for (i = 0; i < swearList.length; i++) {
      if (splitSentencer.includes(swearList[i])) {
        splitSentencer = splitSentencer.replace(swearList[i], "***");
      }
    }
  }
}