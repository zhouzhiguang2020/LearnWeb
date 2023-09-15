
import router from '@/router';

import { ElMessage, ElMessageBox } from 'element-plus';

// import { IUpload } from '@/components/Form/Upload/src/upload.type';
import { LocationQueryRaw } from 'vue-router';
import { column } from 'element-plus/es/components/table-v2/src/common';
export const eleRandomId = 'ele_' + (Math.random() * 1000000).toString();


/**
 *错误提示
 */
export function $msgError(msg: string) {
  document.querySelector('.el-message--error')?.remove();
  ElMessage.error(msg);
}
/**
 *成功提示
 */
export function $msgSuccess(msg: string) {
  ElMessage.success(msg);
}
/**
 *警告提示
 */
export function $msgWarning(msg: string) {
  ElMessage.warning(msg);
}
/**
 * 睡眠函数
 */
export async function messageBox(msg: string): Promise<void> {
  await new Promise<void>(resolve => {
    ElMessageBox.confirm(msg, '提示', {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(async () => {
      resolve();
    });
  });
}
/**
 * 睡眠函数
 */
export async function sleep(time: number): Promise<void> {
  await new Promise(resolve => {
    setTimeout(() => resolve, time);
  });
}
/**
 * 日期转时间搓
 */
export function getDateTime(date: string) {
  return new Date(date).getTime();
}


/**
 *本地存储
 */
export const setStorage = (key: string, params: object | string) => {
  try {
    if (typeof params === 'object') {
      return localStorage.setItem('sn_' + key, JSON.stringify(params));
    } else {
      return localStorage.setItem('sn_' + key, params);
    }
  } catch (e) {
    return null;
  }
};
// 下载文本流文件 data:文件流数据，fileName: 文件名
// export const downloadBlobFile = function (data: any, fileName: any) {
//   const dataBlob = new Blob([data]);
//   const url = window.URL.createObjectURL(dataBlob);
//   const link = document.createElement('a');
//   link.style.display = 'none';
//   link.href = url;
//   link.setAttribute('download', fileName);
//   document.body.appendChild(link);
//   link.click();
//   setTimeout(function () {
//     document.body.removeChild(link);
//   }, 500);
// };

/**
 *获取本地存储
 */
export const getStorage = (key: string) => {
  const target = localStorage.getItem('sn_' + key) || '';
  try {
    return JSON.parse(target);
  } catch (e) {
    return target;
  }
};
/**
 *删除本地存储
 */
export const removeStorage = (key: string) => {
  window.localStorage.removeItem('sn_' + key);
};
// 保存小数位
export function toFixed(num: number, decimal?: number) {
  if (!decimal) {
    decimal = 2;
  }
  num = Number(num);
  if (isNaN(num)) {
    num = 0;
  }
  const power = Math.pow(10, decimal);
  let temp = Math.round(num * power);
  temp = temp / power;
  return temp;
}
// 去重
export function unique(arr: any, key?: any) {
  if (!key) {
    key = 'id';
  }
  const result = [];
  const obj = {} as any;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) continue;
    const str: string = arr[i][key];
    if (!obj[str]) {
      result.push(arr[i]);
      obj[str] = true;
    }
  }
  return result;
}
// 数组扁平化
export function flat(arr: any, deep: number) {
  if (!arr) return;
  if (deep > 0)
    return arr.reduce(
      (pre: any, cur: any) =>
        pre.concat(Array.isArray(cur) ? flat(cur, deep - 1) : cur),
      []
    );
  return arr.slice();
}
// 获取数据ids
export const getArraryIds = (list: string[], key: string) => {
  if (list.length < 1) return '';
  const arr: string[] = [];
  list.forEach(item => {
    arr.push(item[(key as any) || 'id']);
  });
  return arr;
};
// 删除数组一行
export const reomveItem = (list: any, item: any, isRetain?: any, key?: any) => {
  if (list && list.length <= isRetain) {
    return $msgError(`至少保留 ${isRetain} 条数据!`);
  }
  if (!key) {
    key = 'id';
  }
  list.forEach((k: any, index: number) => {
    if (
      (item[key] && item[key] === k[key]) ||
      (item.random && item.random === k.random)
    ) {
      list.splice(index, 1);
    }
  });
};
// 获取数组names，逗号分隔离
export const getStringNames = function (arr: any, key?: string) {
  if (arr.length < 1) return '';
  let names = '';
  arr.forEach((item: any, index: number) => {
    if (index === 0) {
      names = item[key || 'name'];
    } else {
      names += '，' + item[key || 'name'];
    }
  });
  return names;
};
// 获取数组ids，逗号分隔离
export const getStringIds = function (arr: any, key?: string) {
  if (arr.length < 1) return '';
  let names = '';
  arr.forEach((item: any, index: number) => {
    if (index === 0) {
      names = item[key || 'id'];
    } else {
      names += ',' + item[key || 'id'];
    }
  });
  return names;
};

/**
 *是否为空判断
 */
export const isNull = (arg: any) => {
  return arg === null || arg === undefined || arg === '';
};
/**
 *数组长度是否为0
 */
export const isLengthZero = (list: any) => {
  return !isNull(list) && list.length === 0;
};
// 表单序列化
export const serialize = (data: any) => {
  const list: string[] = [];
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join('&');
};
export const getObjType = (obj: any) => {
  const toString = Object.prototype.toString;
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

// 转换key
export function transformKey(list: any, key?: string) {
  const obj = {} as any;
  for (const k of list) {
    obj[k[key || 'id']] = k;
  }
  return obj;
}
/**
 * 对象深拷贝
 */

export const deepClone = (data: any) => {
  const type = getObjType(data);
  let obj: any;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (const key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

//对象递归 返回⽗级节点id集合
//传⼊参数：需要匹配的id，获取所有的⽗级节点的Id
export const recursionId = function (
  data: any,
  id: any,
  children = 'children',
  level = 0
) {
  const arrRes = [] as any;
  const obj = {
    id: 0,
    [children]: data
  };
  const rev = (data: any, id: any, level: number) => {
    if (!data || !data[children] || !data[children].length) {
      return;
    }
    for (let i = 0; i < data[children].length; i++) {
      const item = data[children][i];
      if (item.id == id) {
        // 将匹配到的结果保存到数组
        arrRes.unshift(item.id);
        // 递归它的⽗级
        rev(obj, data.id, 0);
        break;
      } else if (item[children] && item[children].length > 0) {
        //如果有⼦集，则把⼦集作为参数重新执⾏本⽅法
        rev(item, id, level + 1);
      }
    }
  };
  rev(obj, id, level);
  return arrRes.toString();
};
// 获取url上的参数
export function getUrlParams(tempUrl?: any) {
  let url = decodeURIComponent(window.location.href);
  if (tempUrl) {
    url = decodeURIComponent(tempUrl);
  }
  const params = url.substr(url.indexOf('?') + 1);
  const param = params.split('&');
  const parameterMap: any = {};
  for (let i = 0; i < param.length; i++) {
    const current = param[i].split('=');

    // 转成key=value对像
    const key = current[0];
    let value = current[1];
    if (!value) value = '';
    parameterMap[key] = value;
  }
  return parameterMap;
}
// 升序排序
export function sortAscBy(arr: any, key?: any) {
  return arr.sort((x: any, y: any) => {
    return x[key || 'sortOrder'] - y[key || 'sortOrder'];
  });
}
// 必填验证设置
export function required(msg: string) {
  return [
    {
      required: true,
      message: msg + '必填项',
      trigger: ['blur', 'change']
    }
  ];
}
// 数字转大写
export function chineseNumber(n?: number) {
  if (!n) return '';
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  const head = n < 0 ? '负' : '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
}
// 获取数字index
export function getListIndex(list: any, row: any) {
  let indexValue = 0;
  list.forEach((item: any, index: number) => {
    if (item.id === row.id) {
      indexValue = index;
    }
  });
  return indexValue;
}
export function letterSort(data: any) {
  //使用reverse反转排序条件，否则第二次的结果会影响第一次
  data.sort(compare('name', 'asc'));
  function compare(key: string, order: string) {
    return function (m: any, n: any) {
      //遇到字母转成ascii码判断，如果是字符串可以截取首字母再转ascii再排序
      const value1 = typeof m[key] == 'number' ? m[key] : m[key].charCodeAt();
      const value2 = typeof n[key] == 'number' ? n[key] : n[key].charCodeAt();
      if (order === 'desc') return value2 - value1;
      else return value1 - value2;
    };
  }
  return data;
}


// key传点操作符类型转换 类型转换 keyName:key的label名
export function getPropValue(row: any, column: any, keyName: string) {
  keyName = keyName || 'prop';
  if (!column[keyName]) return '';
  const keys = column[keyName]?.split('.') || [];
  let value = false as any;
  for (const k of keys) {
    value = value ? value[k] : row[k];
  }
  switch (column.type) {
    case 'status':
      return value === 1 ? '启用' : '停用';
    case 'minute':
      return (value && value.substring(0, 16)) || '';
    case 'date':
      return (value && value.substring(0, 10)) || '';
    case 'price':
      if (value == 0) return value + '元';
      value = Number(value).toFixed(2) + '元';
      return value;
    default:
      if (column.unit) value += column.unit;
      if (column.unitKey) value += ' ' + row[column.unitKey];
      return value;
  }
}
