let getString = (st) => {
    return st.replace(/-/g, '').replace(/:/g, '').split('.')[0] + 'Z';
};
export default function calendarURLGen(quote) {
    console.log(quote);
    let title = quote.content;
    let desc = '';
    if (quote.priority === 1) {
        desc = 'high importance and urgent';
    } else if (quote.priority === 2) {
        desc = 'high importance and not urgent';
    } else if (quote.priority === 3) {
        desc = 'low importance and urgent';
    } else {
        desc = 'low importance and not urgent';
    }
    let start = quote.schedule;

    if (quote.isSchedule) {
        let duration = quote.duration;

        const end = new Date(
            new Date(start).getTime() + duration * 60000
        ).toISOString();
        let s = getString(new Date(start).toISOString());
        let e = getString(end.toString());
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${desc}&dates=${s}%2F${e}`;
    } else {
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${desc}`;
    }
}
