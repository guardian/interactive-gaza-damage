import moment from 'moment'

export function volumeFormatter(tickValues) {
    const length = tickValues.length;    
    return (d, i) => {
        const isTopTick = i === length - 1;
        const formattedNumber = d.toLocaleString("en-GB");
        if (isTopTick) {
            return `${formattedNumber} (l/s)`;
        }

        return formattedNumber;
    }
}

export function percentFormatter(tickValues) {
    const length = tickValues.length;    
    return (d, i) => {
        const isTopTick = i === length - 1;
        
        if (isTopTick) {
            return `${d}%`;
        }

        return d;
    }
}

export function dateFormatter(tickValues) {
    const length = tickValues.length;    
    return (d, i) => {
        if (i === 0 || i === length - 1) {
            return moment(d).utc().format("D MMM YY")
        }

        return moment(d).utc().format("MMM")
    }
}
