import { Form, Input, Modal, Select } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from '../data.d';
export interface FormValsType extends Partial<TableListItem> {
  id?: number;
  name?: string;
  subject?: string;
  link?: string;
  cover?: string;
  labels?: string;
  status?: number;
}
const labels = ['CSS', 'JS', 'TS', 'HTML', 'Git', 'React', 'Vue', 'HTPP', '安全', '职业', 'Node.js', '设计模式', '浏览器', '技巧', '成长'];
const FormItem = Form.Item;
const { Option } = Select;
interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: FormValsType) => void;
  handleModalVisible: () => void;
  values: FormValsType
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible, values } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const fields = values.id ? {...fieldsValue, id: values.id } : fieldsValue;
      handleAdd(fields);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新增文章"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少五个字符的文章名称！', min: 2 }],
          initialValue: values.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原文地址">
        {form.getFieldDecorator('link', {
          rules: [{ required: true, message: '请输入至少五个字符的原文地址！', min: 2 }],
          initialValue: values.link,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片地址">
        {form.getFieldDecorator('cover', {
          rules: [{ required: true, message: '请输入至少五个字符的图片地址！', min: 2 }],
          initialValue: values.cover,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="简介">
        {form.getFieldDecorator('subject', {
          rules: [{ required: true, message: '请输入至少二十个字符的规则描述！', min: 3 }],
          initialValue: values.subject,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签">
        {form.getFieldDecorator('labels', {
          rules: [{ required: true, message: '请选择' }],
          initialValue: values.labels,
        })(
          <Select style={{ width: '100%' }}>
            {
              labels.map((item, index) => {
                return <Option value={item} key={index}>{ item }</Option>
              })
            }
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          rules: [{ required: true, message: '请选择' }],
          initialValue: values.status
        })(
          <Select style={{ width: '100%' }}>
            <Option value={0}>展示</Option>
            <Option value={1}>不展示</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
