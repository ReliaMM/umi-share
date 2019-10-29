import { Form, Input, Modal, Select } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem as TypeTableListItem } from '../../type/data.d';
import { TableListItem } from '../data.d';

export interface FormValsType extends Partial<TableListItem> {
  id?: number;
  name?: string;
  subject?: string;
  labels?: string;
}
const FormItem = Form.Item;
const { Option } = Select;
interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  option: TypeTableListItem[];
  handleAdd: (fieldsValue: FormValsType) => void;
  handleModalVisible: () => void;
  values: FormValsType
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible, values, option : opt } = props;
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
      title="新增标签"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少二个字符的文章名称！', min: 2 }],
          initialValue: values.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签简介">
        {form.getFieldDecorator('subject', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          initialValue: values.subject,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属类别">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择' }],
          initialValue: values.type,
        })(
          <Select style={{ width: '100%' }}>
            {
              opt.map((item, index) => {
                return <Option value={item.id} key={index}>{ item.name }</Option>
              })
            }
          </Select>
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
