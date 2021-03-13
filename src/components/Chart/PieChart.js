import React from 'react';
import { Pie } from 'react-chartjs-2';

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

function PieChart({ points }) {
    return (
        <Pie
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green'],
                datasets: [
                    {
                        label: '# of votes',
                        data: getPriorityScore(points),
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
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
                        fontSize: 25,
                    },
                },
            }}
        />
    );
}

export default PieChart;
