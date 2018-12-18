import React from 'react';
import { connect } from 'react-redux';
import { selectLocaleMsgs } from '../redux/selector/index';
import { Row, Col, Card } from 'antd';
import '../assets/index.less';

const mapStateToProps = (state) => {
    return {
        msgs: selectLocaleMsgs(state)
    };
};

class Home extends React.Component {

    render() {
        const { cardInfo } = this.props.msgs;
        const dashCards = [
            {
                svg: '../static/svgs/kiss.svg',
                title: cardInfo.balance,
                data: 3456
            },
            {
                svg: '../static/svgs/tongueout.svg',
                title: cardInfo.products,
                data: 3456
            },
            {
                svg: '../static/svgs/mengb.svg',
                title: cardInfo.customers,
                data: 3456
            },
            {
                svg: '../static/svgs/throwup.svg',
                title: cardInfo.transactions,
                data: 3456
            }
        ];
        return (
            <div className="home_content">
                <Row type="flex" justify="space-between" gutter={16}>
                    {dashCards.map((item, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <Card bordered={false} className="dashboard_card">
                                <Row
                                    type="flex"
                                    justify="space-between"
                                    gutter={16}
                                    className="card_content"
                                >
                                    <Col xs={12} sm={12} md={12} className="left">
                                        <embed src={item.svg} />
                                    </Col>
                                    <Col xs={12} sm={12} md={12} className="right">
                                        <p className="title">{item.title}</p>
                                        <p className="data">{item.data}</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row type="flex" justify="space-between" gutter={16}>
                    <Col xs={24} sm={24} md={18}>
                        <Card bordered={false} className="chart" />
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                        <Card bordered={false} className="upper" />
                        <Card bordered={false} className="lower" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);
