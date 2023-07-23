import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Box, useTheme } from '@mui/material';
import { useGetExpensesQuery } from 'state/api';
import moment from 'moment';
import { useMemo } from 'react';

const PieChart = () => {
 
    const { data } = useGetExpensesQuery();

    const theme = useTheme();
    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ]

    const transformedData = useMemo( () => {
        if(!data) return [];

        const today = moment();
        const latePayment = {
            id: "latePayment",
            label: "latePayment",
            value: 0,
            color: "hsl(0, 100%, 50%)"
        }
        const onTimePayments = {
            id: "onTimePayments",
            label: 'onTimePayments',
            value: 0,
            color: 'hsl(144, 100%, 50%)'
        }
        const pastDueUnpaid = {
            id: " pastDueUnpaid ",
            label: 'pastDueUnpaid',
            value: 0,
            color: 'hsl(13, 42%, 56%)'
        }

        data.forEach( (expense) => {

            if(expense.actualPaymentDate) {
                console.log(expense)
                if(new Date(expense.actualPaymentDate) < new Date(expense.expectedPaymentDate)) {
                    onTimePayments.value = onTimePayments.value +1
                } else {
                    latePayment.value = latePayment.value +1
                }
            } else {
                if(new Date(expense.expectedPaymentDate) < today) {
                    pastDueUnpaid.value = pastDueUnpaid.value +1
                }
            }

        })

        return [latePayment,onTimePayments , pastDueUnpaid ]
    }, [data]);
    
    return(
        <Box 
            mt='40px'
            height='75vh'
            borderRadius='4px'
        >
            <ResponsivePie
                data={transformedData}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[200]
                            }
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[200]
                            }
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: theme.palette.secondary[200]
                            }
                        }
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[200]
                        }
                    },
                    tooltip: {
                        container: {
                            color: theme.palette.primary.main
                        }
                    }
                }}
                colors={{ datum: 'data.color' }}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor= {theme.palette.secondary[200]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </Box>
    )
}

export default PieChart
