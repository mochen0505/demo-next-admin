import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Form, Input, Icon, Button } from 'antd';
import { selectLoading } from '../redux/selector/index';
import { handleSignIn } from '../redux/actions/authAction';
import utils from '../libs/utils';
import '../assets/login.less';
import { withNamespaces } from '../i18n';

const FormItem = Form.Item;

const mapStateToProps = (state) => {
  return {
    isLoading: selectLoading(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignIn: (params) => dispatch(handleSignIn(params))
  };
};

class Login extends React.Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['login', 'layout']
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values) {
        this.props
          .handleSignIn(values)
          .then((res) => {
            if (res === -1) {
              utils.nMessage.error(this.props.t('messages.loginFail'));
            } else {
              utils.nMessage.success(this.props.t('messages.loginSuccess'));
              window.location.href = '/';
            }
          })
          .catch((err) => {
            utils.nMessage.error(this.props.t('messages.loginFail'));
          });
      }
    });
  };

  render() {
    const { isLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItems = [
      {
        key: 'mobile',
        required: true,
        emptyMessage: this.props.t('loginForm.emptyMobile'),
        pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
        errorMessage: this.props.t('loginForm.errorMobile'),
        icon: 'mobile',
        type: 'text',
        placeholder: this.props.t('loginForm.phMobile'),
        title: this.props.t('loginForm.phMobile')
      },
      {
        key: 'password',
        required: true,
        emptyMessage: this.props.t('loginForm.emptyPassword'),
        pattern: '',
        errorMessage: '',
        icon: 'lock',
        type: 'password',
        placeholder: this.props.t('loginForm.phPassword'),
        title: this.props.t('loginForm.phPassword')
      }
    ];
    return (
      <Row type="flex" justify="space-around" className="login_content">
        <Col xs={0} sm={0} md={10} className="login_intro">
          <h2>{this.props.t('loginIntro.title')}</h2>
          <p>{this.props.t('loginIntro.details')}</p>
        </Col>
        <Col xs={18} sm={12} md={6} className="login_wrapper">
          <Card className="login_card" title={this.props.t('loginForm.title')}>
            <Form>
              {formItems.map((item, i) => (
                <FormItem
                  className="form_item"
                  key={i}
                  label={null /*item.label*/}
                >
                  {getFieldDecorator(item.key, {
                    validate: [
                      {
                        trigger: ['onBlur'],
                        rules: [
                          {
                            required: item.required,
                            message: item.emptyMessage
                          }
                        ]
                      },
                      {
                        trigger: ['onBlur', 'onChange'],
                        rules: [
                          { pattern: item.pattern, message: item.errorMessage }
                        ]
                      }
                    ]
                  })(
                    <Input
                      addonBefore={<Icon type={item.icon} />}
                      type={item.type}
                      placeholder={item.placeholder}
                      title={item.title}
                      onPressEnter={this.handleClick}
                    />
                  )}
                </FormItem>
              ))}
              <FormItem className="login_button">
                <Button
                  type="primary"
                  onClick={this.handleClick}
                  loading={isLoading}
                >
                  {this.props.t('loginForm.button')}
                </Button>
              </FormItem>
            </Form>
            {/*<Link className="login_footer" to="/signup">*/}
            {/*{loginForm.signup}*/}
            {/*</Link>*/}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(
  withNamespaces('login')(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Login)
  )
);
