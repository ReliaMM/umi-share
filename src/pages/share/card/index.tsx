import { Card, Col, Form, List, Row, Typography, Input, Tag } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const FormItem = Form.Item;
const { Paragraph } = Typography;
const labels = ['CSS', 'JS', 'TS', 'HTML', 'Git', 'React', 'Vue', 'HTPP', '安全', '职业', 'Node.js', '设计模式', '浏览器', '技巧', '成长'];

interface ProjectsProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  listSearchProjects: StateType;
  loading: boolean;
}

class Projects extends Component<ProjectsProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listSearchProjects/fetch',
      payload: {
        pageSize: 'all'
      }
    });
  }

  render() {
    const {
      listSearchProjects: { list = [] },
      loading,
      form,
    } = this.props;
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
              cover={<img className={styles.cardImg} alt={item.name} src={item.cover} />}
            >
              <Card.Meta
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
                  <Tag color="gold">{item.labels}</Tag>
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
            <StandardFormRow title="所属标签" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    {
                      labels.map((item, index) => {
                      return <TagSelect.Option key={index} value={item}>{item}</TagSelect.Option>
                      })
                    }
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="题目">
                    {getFieldDecorator('name')(<Input placeholder="请输入" />)}
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
      type: 'listSearchProjects/fetch',
      payload: {
        ...allValues
      },
    });
  },
})(Projects);

export default connect(
  ({
    listSearchProjects,
    loading,
  }: {
    listSearchProjects: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    listSearchProjects,
    loading: loading.models.listSearchProjects,
  }),
)(WarpForm);
