import { useState, useContext, useEffect } from 'react';

/* import components */
import { LabeledCard, List, Token } from 'components/common';
import { Section, TabbedChartCard } from 'components/layout';
/* import context */
import { UIContext, TokenDataContext, TokenHistoryContext } from 'contexts';
/* import styles */
import { StyledDashboardView, StyledStatisticsGrid, StyledChartsGrid } from './dashboard-view.styles';

const extractTimeRange = (arr, days) => {
    return arr.slice(Math.max(arr.length - days, 0));
};

const DashboardView = ()  => {

    const [ debaseListData, setDebaseListData ] = useState(null);
    const [ degovListData, setDegovListData ] = useState(null);

    const [ debasePriceChart, setDebasePriceChart ] = useState(null);
    const [ debaseMarketcapChart, setDebaseMarketcapChart ] = useState(null);
    const [ debaseTotalSupplyChart, setDebaseTotalSupplyChart ] = useState(null);
    const [ debaseRebaseChart, setDebaseRebaseChart ] = useState(null);

    const { ui } = useContext(UIContext);
    const { tokenData } = useContext(TokenDataContext);
    const { tokenHistory } = useContext(TokenHistoryContext);

    /* set token data list values */
    useEffect(() => {
        if (!tokenData) {return}
        const { debasePrice, debaseCircSupply, debaseMarketcap, degovPrice, degovCircSupply, degovMarketcap } = tokenData;
        setDebaseListData([
            {
                label: 'Price',
                value: debasePrice,
                valueType: 'dai'
            },
            {
                label: 'Circulating supply',
                value: debaseCircSupply,
                valueType: 'debase'
            },
            {
                label: 'Marketcap',
                value: debaseMarketcap,
                valueType: 'dai'
            }
        ]);
        setDegovListData([
            {
                label: 'Price',
                value: degovPrice,
                valueType: 'dai'
            },
            {
                label: 'Circulating supply',
                value: degovCircSupply,
                valueType: 'degov'
            },
            {
                label: 'Marketcap',
                value: degovMarketcap,
                valueType: 'dai'
            }
        ]);
    }, [tokenData]);

    /* set token history chart values */
    useEffect(() => {
        if (!tokenHistory || tokenHistory.length === 0) {return}
        const priceChartData = [];
        const marketcapChartData = [];
        const totalSupplyChartData = [];
        const rebaseHistoryChartData = [];

        tokenHistory.forEach((day, i) => {
            const { date, price, marketcap, totalSupply, rebasePercentage } = day;
            priceChartData.push([date, price]);
            marketcapChartData.push([date, marketcap]);
            totalSupplyChartData.push([date, totalSupply]);
            rebaseHistoryChartData.push([date, rebasePercentage]);
        });

        setDebasePriceChart([
            {
                tabKey: '1w',
                labelX: 'Date',
                labelY: 'Price',
                graphData: extractTimeRange(priceChartData, 7)
            },
            {
                tabKey: '1m',
                labelX: 'Date',
                labelY: 'Price',
                graphData: extractTimeRange(priceChartData, 30)
            },
            {
                tabKey: '1y',
                labelX: 'Date',
                labelY: 'Price',
                graphData: priceChartData
            }
        ]);
        setDebaseMarketcapChart([
            {
                tabKey: '1w',
                labelX: 'Date',
                labelY: 'Marketcap',
                graphData: extractTimeRange(marketcapChartData, 7)
            },
            {
                tabKey: '1m',
                labelX: 'Date',
                labelY: 'Marketcap',
                graphData: extractTimeRange(marketcapChartData, 30)
            },
            {
                tabKey: '1y',
                labelX: 'Date',
                labelY: 'Marketcap',
                graphData: marketcapChartData
            }
        ]);
        setDebaseTotalSupplyChart([
            {
                tabKey: '1w',
                labelX: 'Date',
                labelY: 'Total supply',
                graphData: extractTimeRange(totalSupplyChartData, 7)
            },
            {
                tabKey: '1m',
                labelX: 'Date',
                labelY: 'Total supply',
                graphData: extractTimeRange(totalSupplyChartData, 30)
            },
            {
                tabKey: '1y',
                labelX: 'Date',
                labelY: 'Total supply',
                graphData: totalSupplyChartData
            }
        ]);
        setDebaseRebaseChart([
            {
                tabKey: '1w',
                labelX: 'Date',
                labelY: 'Rebase',
                graphData: extractTimeRange(rebaseHistoryChartData, 7)
            },
            {
                tabKey: '1m',
                labelX: 'Date',
                labelY: 'Rebase',
                graphData: extractTimeRange(rebaseHistoryChartData, 30)
            },
            {
                tabKey: '1y',
                labelX: 'Date',
                labelY: 'Rebase',
                graphData: rebaseHistoryChartData
            }
        ]);

    }, [tokenHistory]);

    return (
        <StyledDashboardView>
            <Section
				color="secundary"
                label="current statistics"
			>
                <StyledStatisticsGrid>
                    <LabeledCard
                        isLoading={ui.isLoading.tokenData}
                        label="debase"
                        gutter={0}
                        color="primary"
                    >
                        <List data={debaseListData} />
                    </LabeledCard>
                    <LabeledCard
                        isLoading={ui.isLoading.tokenData}
                        label="degov"
                        gutter={0}
                        color="primary"
                    >
                        <List data={degovListData} />
                    </LabeledCard>
                </StyledStatisticsGrid>
			</Section>
            <Section
				color="secundary"
                label="charts"
			>
                <StyledChartsGrid>
                    <TabbedChartCard 
                        isLoading={ui.isLoading.tokenHistory}
                        label="price"
                        color="primary"
                        gutter={20}
                        minHeight={420}
                        defaultTabKey="1m"
                        symbol={<Token type="dai" gutter={0} />}
                        tabsData={debasePriceChart}
                    />
                    <TabbedChartCard 
                        isLoading={ui.isLoading.tokenHistory}
                        label="marketcap"
                        color="primary"
                        gutter={20}
                        minHeight={420}
                        defaultTabKey="1m"
                        symbol={<Token type="dai" gutter={0} />}
                        tabsData={debaseMarketcapChart}
                    />
                    <TabbedChartCard 
                        isLoading={ui.isLoading.tokenHistory}
                        label="total supply"
                        color="primary"
                        gutter={20}
                        minHeight={420}
                        defaultTabKey="1m"
                        symbol={<Token type="debase" gutter={0} />}
                        tabsData={debaseTotalSupplyChart}
                    />
                    <TabbedChartCard 
                        isLoading={ui.isLoading.tokenHistory}
                        label="rebase history"
                        color="primary"
                        gutter={20}
                        minHeight={420}
                        defaultTabKey="1m"
                        symbol="%"
                        tabsData={debaseRebaseChart}
                    />
                </StyledChartsGrid>
			</Section>
        </StyledDashboardView>
    );

};

export default DashboardView;