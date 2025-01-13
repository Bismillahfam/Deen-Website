async function GetNamazData() {
    let currentDate = new Date().toLocaleDateString();
    currentDate = currentDate.replace("/", "-")
    currentDate = currentDate.replace("/", "-")
    console.log(currentDate)

    const APIurl = `https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=Glasgow&country=GB`
    const APIresponse = await (await fetch(APIurl)).json();
    console.log(APIresponse)

    const { data, ...rest } = APIresponse
    console.log(data)

    const { timings, ...rest2 } = data
    console.log(timings)

    let { Fajr, Dhuhr, Asr, Maghrib, Isha } = timings
    console.log(Fajr, Dhuhr, Asr, Maghrib, Isha)
}

GetNamazData()
