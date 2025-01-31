const HadithText = document.querySelector("#HadithOfTheDayText")
const HadithArray = [

    "Whoever misses Asr (Intentionally) then it is as if he has lost his family and property",
    "Beware of suspicion for it is the most untruthful type of speech.",
    "Whoever stands [for night prayer] in Ramadan out of faith and hope for reward will be forgiven his past sins.",
    "One Umrah to the next is an expiation for whatever happened between them and the only reward for an accepted Hajj is paradise."

]

const Hadith = Math.floor(Math.random() * 4)
showHadith(Hadith)

function showHadith(Hadith) {
    HadithText.textContent = ("\"" + HadithArray[Hadith] + "\"")
}
