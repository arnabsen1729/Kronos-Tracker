import { red } from '@material-ui/core/colors';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const getPriorityScore = (points) => {
    let priorityScore = [0, 0, 0, 0];
    if (points === undefined || points.length === 0) {
        return priorityScore;
    } else {
        points.forEach((pt) => {
            pt.count.forEach((val, index) => {
                priorityScore[index] += val;
            });
        });
        return priorityScore;
    }
};

function BarChart({ points }) {
    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        function updateWidth() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateWidth);
    });

    return (
        <Bar
            data={{
                labels: ['1', '2', '3', '4'],
                datasets: [
                    {
                        label: 'Priority score',
                        data: getPriorityScore(points),
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',

                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',

                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 2,
                        hoverBorderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',

                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                    },
                ],
            }}
            height={screenWidth <= 768 ? 150 : 400}
            width={screenWidth <= 768 ? 225 : 600}
            options={{
                maintainAspectRatio: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
                legend: {
                    labels: {
                        fontSize: 15,
                    },
                },
            }}
        />
    );
}

export default BarChart;
