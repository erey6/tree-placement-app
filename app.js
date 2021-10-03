const comAreas = ["",
    "Rogers Park",
    "West Ridge",
    "Uptown",
    "Lincoln Square",
    "North Center",
    "Lake View",
    "Lincoln Park",
    "Near North Side",
    "Edison Park",
    "Norwood Park",
    "Jefferson Park",
    "Forest Glen",
    "North Park",
    "Albany Park",
    "Portage Park",
    "Irving Park",
    "Dunning",
    "Montclare",
    "Belmont Cragin",
    "Hermosa",
    "Avondale",
    "Logan Square",
    "Humboldt Park",
    "West Town",
    "Austin",
    "West Garfield Park",
    "East Garfield Park",
    "Near West Side",
    "North Lawndale",
    "South Lawndale",
    "Lower West Side",
    "(The) Loop",
    "Near South Side",
    "Armour Square",
    "Douglas",
    "Oakland",
    "Fuller Park",
    "Grand Boulevard",
    "Kenwood",
    "Washington Park",
    "Hyde Park",
    "Woodlawn",
    "South Shore",
    "Chatham",
    "Avalon Park",
    "South Chicago",
    "Burnside",
    "Calumet Heights",
    "Roseland",
    "Pullman",
    "South Deering",
    "East Side",
    "West Pullman",
    "Riverdale",
    "Hegewisch",
    "Garfield Ridge",
    "Archer Heights",
    "Brighton Park",
    "McKinley Park",
    "Bridgeport",
    "New City",
    "West Elsdon",
    "Gage Park",
    "Clearing",
    "West Lawn",
    "Chicago Lawn",
    "West Englewood",
    "Englewood",
    "Greater Grand Crossing",
    "Ashburn",
    "Auburn Gresham",
    "Beverly",
    "Washington Heights",
    "Mount Greenwood",
    "Morgan Park",
    "O'Hare",
    "Edgewater"]

const readableDate = (date) => {

    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const d = new Date(date)
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}/${day}/${year}`

}


$(() => {
    let search = ''
    $('input').on('click', (e) => {
        const selection = $(e.target).val();
        if (selection === "Open tree requests") {
            search = 'Open'
        } else {
            search = 'Completed'
        }
    }

    )

    $('form').on('submit', (event) => {
        event.preventDefault();
        const zipCode = $('input[type="text"]').val();
        $('form').trigger('reset');
        downloadData(zipCode)
    })

    const renderData = (data, zipCode) => {
        //render the .reminder her 34 results for 60630
        $('.results').empty();
        $('.reminder p').text(`${data.length} results for ${zipCode}`)
        for (const request of data) {
             const $div = $('<div>').addClass('row-result')
            $div.append($('<p>').text(`${request.street_address}`))
            if (search === "completed") {
                const dateString = readableDate(request.closed_date)
                $div.append($('<p>').text(`${dateString}`))
            } else {
                const dateString = readableDate(request.created_date)
                $div.append($('<p>').text(`${dateString}`))
            }
            $div.append($('<p>').addClass('community-area').text(`${comAreas[request.community_area]}`))
            $('.results').append($div)
            // console.log(request.status);
        }
    }

    const downloadData = (zipCode) => {

        $.ajax({
            url: `https://data.cityofchicago.org/resource/v6vf-nfxy.json?sr_type=Tree%20Planting%20Request&duplicate=false&status=${search}&zip_code=${zipCode}&$order=created_date%20DESC`,
            type: "GET",
            data: {
                "$limit": 600,
            }
        }).then(
            (data) => {

                renderData(data, zipCode)
            },
            () => {
                console.log('bad request');
            }
        )

    }
})