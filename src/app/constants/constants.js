const Constants = {
    chartHeader: ["NEO NAME", "Min Estimated Diameter (KM)", "Max stimate Diameter (KM)"],
    chartOptions: {
        title: " ",
        bars: 'horizontal',
        width: 1300,
        height: 600,
        hAxis: {
            title:"Min Dstimated Diametr",
            viewWindow: {
                min: 0,
            }
        },
        vAxis: {
            title: 'Neo Name'
        },

        legend: {
            // moving the legend to the top
            position: 'top',
        }

    }
}

export default Constants;