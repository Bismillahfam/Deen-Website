const NamazForm = document.querySelector(".NamazForm")
const CityInput = document.querySelector(".CityInput")

NamazForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = CityInput.value

    if (city) {
        try {
            const NamazData = await GetNamazData(city)
            console
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

GetNamazData()
