import { renderChart } from "./chart.js";
import { getReadings, groupByDay, sortByTime, compute } from "./reading";

thirtyCb();


// 监听按钮的切换

const thiryButton = document.querySelector('.last-30');
const twteenFourButton = document.querySelector('.last-24');

thiryButton.addEventListener('click', () => {
    thirtyCb()
    twteenFourButton.classList.remove('active');
    thiryButton.classList.add('active');
})

twteenFourButton.addEventListener('click', () => {
    twteenFourCb();
    twteenFourButton.classList.add('active');
    thiryButton.classList.remove('active');
})


async function thirtyCb() {
    const readings = await getReadings();
    const _readings = sortByTime(groupByDay(readings)).slice(-30);
    renderChart(_readings);
    compute(_readings, true);
}

async function twteenFourCb() {
    const readings = await getReadings(24);
    renderChart(readings.reverse(), false);
    compute(readings, false);
}