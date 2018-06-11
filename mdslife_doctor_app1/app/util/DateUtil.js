export function formatDate(ts) {
    let currentTs = new Date().getTime();
    let diffTs = currentTs - ts;

    //year
    let years = diffTs / (365 * 24 * 3600 * 1000);

    if (years >= 1.0) {
        return Math.ceil(years) +' ' + (years>1?'years':'year')+ ' ago';
    }

    //days
    let days = diffTs / (24 * 3600 * 1000);
    if (days >= 1.0) {
        return Math.ceil(days) +' ' + (days>1?'days':'day')+ ' ago';
    }

    //hours
    let hours = diffTs / (3600 * 1000);
    if (hours >= 1.0) {
        return Math.ceil(hours) +' ' + (hours>1?'hours':'hour')+ ' ago';
    }

    //minutes
    let minutes = diffTs / (60 * 1000);
    if (minutes >= 1.0) {
        return Math.ceil(minutes) + ' ' + (minutes>1?'minutes':'minute')+' ago';
    }

    return 'a moment ago';

}
