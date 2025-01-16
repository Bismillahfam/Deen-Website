const NamazForm = document.querySelector(".NamazForm")
const CityInput = document.querySelector(".CityInput")

NamazForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = CityInput.value

    if (city) {
        try {
            const NamazData = await GetNamazData(city)
            DisplayNamazTimes(NamazData)

        } catch (error) { console.error(error) };
    }
})


async function GetNamazData(city) {
    let currentDate = new Date().toLocaleDateString();
    currentDate = currentDate.replace("/", "-")
    currentDate = currentDate.replace("/", "-")
    console.log(currentDate)

    const APIurl = `https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=${city}&country`
    const APIresponse = await (await fetch(APIurl)).json();
    console.log(APIresponse)

    const { data, ...rest } = APIresponse
    console.log(data)

    const { timings, ...rest2 } = data
    console.log(timings)

    let { Fajr, Dhuhr, Asr, Maghrib, Isha } = timings
    console.log(Fajr, Dhuhr, Asr, Maghrib, Isha)
    const NamazTimes = [Fajr, Dhuhr, Asr, Maghrib, Isha]
    return NamazTimes
}

function DisplayNamazTimes(NamazData) {
    const NamazNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]

    for (i in NamazNames) {
        this[NamazNames[i] + 'GMT'] = document.querySelector(eval("'.' + NamazNames[i] + 'GMT'")) //Apparently eval() is a substantial security risk, Create a backup patch should this be exploited
        this[NamazNames[i] + 'Time'] = document.querySelector(eval("'.' + NamazNames[i] + 'Time'"))
    }
    console.log(FajrGMT)

    FajrTime.textContent = NamazData[0]
    DhuhrTime.textContent = NamazData[1]
    AsrTime.textContent = NamazData[2]
    MaghribTime.textContent = NamazData[3]
    IshaTime.textContent = NamazData[4]
}
