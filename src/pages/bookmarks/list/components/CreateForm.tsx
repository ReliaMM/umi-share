import { Form, Input, Modal, Select, Cascader } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem, CascaderOption } from '../data.d';
export interface FormValsType extends Partial<TableListItem> {
  id?: number;
  name?: string;
  subject?: string;
  type?: number;
  tag?: number;
  link?: string;
  icon?: string;
}
const FormItem = Form.Item;
interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: FormValsType) => void;
  handleModalVisible: () => void;
  values: FormValsType
}
const options = [
  {
    id: '1',
    name: '前端',
    children: [
      {
        id: '1',
        name: '学习平台',
      },
      {
        id: '2',
        name: '在线编程',
      },
    ],
  },
  {
    id: '2',
    name: '产品',
    children: [
      {
        id: '3',
        name: '原型设计',
      },
      {
        id: '4',
        name: '文档编辑',
      },
    ],
  }
]

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
 const onChange  = (value: string[]) =>{
    console.log(value)
  }
  const cascaderFilter = (inputValue: string, path: CascaderOption[]): boolean | undefined => {
    return path.some(option => option.id.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }
  return (
    <Modal
      destroyOnClose
      title="新增技能"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="技能名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少二个字符的技能名称！', min: 2 }],
          initialValue: values.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="技能简介">
        {form.getFieldDecorator('subject', {
          rules: [{ required: true, message: '请输入至少三个字符的技能简介！', min: 3 }],
          initialValue: values.subject,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="技能icon">
        {form.getFieldDecorator('icon', {
          rules: [{ required: true, message: '请输入至少三个字符的icon！', min: 3 }],
          initialValue: values.icon,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="技能link">
        {form.getFieldDecorator('link', {
          rules: [{ required: true, message: '请输入至少三个字符的link！', min: 3 }],
          initialValue: values.link,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="技能类别">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择' }],
          initialValue: values.type,
        })(
          <Cascader
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            options={options}
            onChange={onChange}
            placeholder="请选择"
            showSearch={cascaderFilter}
            changeOnSelect />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
