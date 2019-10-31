import { Card, Col, Form, List, Row, Typography, Input, Tag, Avatar, Cascader } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import { ListItemDataType, CascaderOption } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import styles from './style.less';

const FormItem = Form.Item;
const { Paragraph } = Typography;
interface ProjectsProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  bookmarksCard: StateType;
  loading: boolean;
}

class Projects extends Component<ProjectsProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookmarksCard/fetch'
    });
    dispatch({
      type: 'bookmarksCard/cascader'
    });
  }
  onChange (value: string[]) {
    console.log(value)
  }
  cascaderFilter (inputValue: string, path: CascaderOption[]): boolean | undefined {
    return path.some(option => option.id.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }
  render() {
    const {
      bookmarksCard: { list = [], opt },
      loading,
      form,
    } = this.props;
    const options = opt.list
    const { getFieldDecorator } = form;
    const cardList = list ? (
      <List<ListItemDataType>
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
            >
              <Card.Meta
                avatar={<Avatar src={item.icon} />}
                title={<a href={item.link} target="_blank">{item.name}</a>}
                description={
                  <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                    {item.subject}
                  </Paragraph>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <Tag color="gold">{item.bookmark_type.name}</Tag>
                  <Tag color="gold">{item.bookmark_tag.name}</Tag>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="题目">
                    {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('subject')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="" grid last>
              <Row gutter={20}>
                <Col lg={10} md={10} sm={10} xs={24}>
                <FormItem label="技能类别">
                  {getFieldDecorator('type')(
                    <Cascader
                      fieldNames={{ label: 'name', value: 'id', children: 'bookmark_tags' }}
                      options={options}
                      onChange={this.onChange}
                      placeholder="请选择"
                      showSearch={this.cascaderFilter}
                      changeOnSelect />
                  )}
                </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}

const WarpForm = Form.create<ProjectsProps>({
  onValuesChange(props, _, allValues) {
    const { dispatch } = props
    dispatch({
      type: 'bookmarksCard/fetch',
      payload: {
        ...allValues
      },
    });
  },
})(Projects);

export default connect(
  ({
    bookmarksCard,
    loading,
  }: {
    bookmarksCard: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    bookmarksCard,
    loading: loading.models.bookmarksCard,
  }),
)(WarpForm);
