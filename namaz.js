const NamazForm = document.querySelector(".NamazForm");
const CityInput = document.querySelector(".CityInput");

NamazForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = CityInput.value;
    const invalidChars = /[\/.<>,":;@!]/; // Regex for invalid characters


    if (!city || invalidChars.test(city)) {
        alert("Invalid city name. Please avoid using '/', '.', '<', '>', '!', '@', ';' etc in the city name.");
        return;
    }

    try {
        const [NamazData, timezone] = await GetNamazData(city);
        DisplayNamazTimes(NamazData, timezone);
    } catch (error) {
        console.error(error);
    }
});



async function GetNamazData(city) {
    let currentDate = new Date().toLocaleDateString();
    currentDate = currentDate.replace("/", "-")
    currentDate = currentDate.replace("/", "-")
    console.log(currentDate)

    const APIurl = `https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=${city}&country`
    const APIresponse = await (await fetch(APIurl)).json();
    console.log(APIresponse)

    const { code, data, ...rest } = APIresponse
    console.log(data)
    console.log(code)

    const { timings, meta, ...rest2 } = data
    console.log(timings, meta)

    let { Fajr, Dhuhr, Asr, Maghrib, Isha } = timings
    let { timezone } = meta
    console.log(Fajr, Dhuhr, Asr, Maghrib, Isha, timezone)
    const NamazTimes = [Fajr, Dhuhr, Asr, Maghrib, Isha]

    return [NamazTimes, timezone]
}

function DisplayNamazTimes(NamazData, timezone) {
    const NamazNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
    timezone = timezone.split("/")[1]
    console.log(timezone)
    const timezoneOffsets = {
        "London": 0, // GMT
        "New_York": -5, // GMT-5
        "Los_Angeles": -8, // GMT-8
        "Tokyo": 9, // GMT+9
        "Sydney": 11, // GMT+11
        "Paris": 1, // GMT+1
        "Berlin": 1, // GMT+1
        "Moscow": 3, // GMT+3
        "Dubai": 4, // GMT+4
        "New Delhi": 5.5, // GMT+5:30
        "Hong Kong": 8, // GMT+8
        "Beijing": 8, // GMT+8
        "Singapore": 8, // GMT+8
        "Cape Town": 2, // GMT+2
        "Rio de Janeiro": -3, // GMT-3
        "Chicago": -6, // GMT-6
        "Vancouver": -8, // GMT-8
        "Buenos Aires": -3, // GMT-3
        "Seoul": 9, // GMT+9
        "Bangkok": 7, // GMT+7
        "Jakarta": 7, // GMT+7
        "Istanbul": 3, // GMT+3
        "Cairo": 2, // GMT+2
        "Athens": 2, // GMT+2
        "Mexico City": -6, // GMT-6
        "Honolulu": -10, // GMT-10
        "Anchorage": -9, // GMT-9
        "Riyadh": 3, // GMT+3
    }

    function convertToGMT(city, localTime) {
        if (!timezoneOffsets.hasOwnProperty(city)) {
            throw new Error(`City "${city}" is not in the timezone offsets dictionary.`);
        }

        const gmtOffset = timezoneOffsets[city];
        const [hours, minutes] = localTime.split(":").map(Number);
        let gmtHours = hours - gmtOffset;

        if (gmtHours >= 24) {
            gmtHours -= 24;
        } else if (gmtHours < 0) {
            gmtHours += 24;
        }

        return `${String(gmtHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    for (i in NamazNames) {
        this[NamazNames[i] + 'GMT'] = document.querySelector(eval("'.' + NamazNames[i] + 'GMT'")) //Apparently eval() is a substantial security risk, Create a backup patch should this be exploited
        this[NamazNames[i] + 'Time'] = document.querySelector(eval("'.' + NamazNames[i] + 'Time'"))
    }

    FajrTime.textContent = NamazData[0]
    DhuhrTime.textContent = NamazData[1]
    AsrTime.textContent = NamazData[2]
    MaghribTime.textContent = NamazData[3]
    IshaTime.textContent = NamazData[4]

    FajrGMT.textContent = convertToGMT(timezone, NamazData[0])
    DhuhrGMT.textContent = convertToGMT(timezone, NamazData[1])
    AsrGMT.textContent = convertToGMT(timezone, NamazData[2])
    MaghribGMT.textContent = convertToGMT(timezone, NamazData[3])
    IshaGMT.textContent = convertToGMT(timezone, NamazData[4])


}
