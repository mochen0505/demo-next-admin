import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import '../assets/index.less';
import {withNamespaces} from "../i18n";
import {Menu} from "antd/lib/menu";

const mapStateToProps = (state) => {
    return {

    };
};

class Home extends React.Component {
    static async getInitialProps() {
        return {
            namespacesRequired: ['home']
        }
    }

    render() {
        const dashCards = [
            {
                svg: '../static/svgs/kiss.svg',
                title: this.props.t('cardInfo.balance'),
                data: 3456
            },
            {
                svg: '../static/svgs/tongueout.svg',
                title: this.props.t('cardInfo.products'),
                data: 3456
            },
            {
                svg: '../static/svgs/mengb.svg',
                title: this.props.t('cardInfo.customers'),
                data: 3456
            },
            {
                svg: '../static/svgs/throwup.svg',
                title: this.props.t('cardInfo.transactions'),
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

export default withNamespaces('home')(connect(mapStateToProps)(Home));
