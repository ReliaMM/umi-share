import { Request, Response } from 'express';
import { ListItemDataType } from './data.d';

const titles = ['CSS', 'JS', 'TS', 'HTML', 'Git', 'React', 'Vue', 'HTPP', '安全', '职业', 'Node.js', '设计模式', '浏览器', '技巧', '成长'];
const names = ['CSS', 'JS', 'TS', 'HTML', 'Git', 'React', 'Vue', 'HTPP', '安全', '职业', 'Node.js', '设计模式', '浏览器', '技巧', '成长'];

const cover = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const subject = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

function fakeList(count: number): ListItemDataType[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      name: names[i % 8],
      cover: cover[i % 4],
      labels: titles[i % 8],
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subject: subject[i % 5],
    });
  }
  return list;
}

function getFakeList(req: Request, res: Response) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  return res.json(result);
}

export default {
  'GET  /api/fake_list': getFakeList,
};
