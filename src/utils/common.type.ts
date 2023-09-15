//组织
export interface IFarm {
  address: string;
  area: string;
  code: string;
  coldStoreManager: string;
  coldStoreManagerName: string;
  coldStoreTel: string;
  contacts: string;
  contactsName: string;
  contactsPhone: string;
  createBy: string;
  createId: string;
  createTime: string;
  createdAt: string;
  deletedAt: number;
  fid: string;
  id: string;
  orgId: string;
  orgName: string;
  status: number;
  title: string;
  type: number;
  typeTitle: string;
  updateBy: string;
  updateId: string;
  updateTime: string;
  warehouseId: string;
  warehouseTitle: string;
  warehouseList: string[];
  warehouses: string;
}
// 用户 /user/page
export interface IUser {
  baseUserFlag: number | string;
  baseUserFlagName: string;
  code: string;
  createBy: string;
  createId: string;
  createTime: string;
  email: string;
  farmName: string;
  farmUserList: any;
  id: string;
  isAdmin: number;
  level: number;
  name: string;
  nickName: string;
  phone: string;
  status: number;
  updateBy: string;
  updateId: string;
  updateTime: string;
  username: string;
}
export interface IUserSuperiors {
  id: string;
  orgId: string;
  superiorUserId: string;
  superiorUserName: string;
  userId: string;
}
export interface IRoleList {
  code: string;
  flag: boolean;
  id: string;
  name: string;
}
// 人员 /personnel/page
export interface IPersonnel {
  bankNo: string;
  cardNo: string;
  createTime: string;
  id: string;
  idCard: string;
  isKq: false;
  lyd: string;
  mobile: string;
  name: string;
  orgId: string;
  orgName: string;
  personType: string;
  remark: string;
  sex: number;
  sourceType: string;
  state: true;
}
//基地下拉选择返回的数据
export interface IOrgSelect {
  orgId: string;
  value: string;
  label: string;
  modalValue: string;
}

// 列表请求参数 params
export interface IParams {
  query: {
    pageNum: number;
    pageSize: number;
    sqlOrderBy?: {
      create_time: number;
    };
  };
  entity: {
    keyword: string;
    groupId?: string;
    doneDate?: string;
    dataParams?: any;
    orgId?: string;
    orgIds?: string[];
    ids?: string[];
    workDate?: string;
    harvestDate?: string;
    state?: boolean;
    statusList?: any;
    categoryIds?: string | object;
    categoryId?: string;
    bizCode?: string;
    createDate: string[];
    orderDate?: string[];
    farmId?: string;
    farmName?: string;
    farmUserList?: object[];
    title: string;
  };
}

export interface IRequest {
  data: any;
  code: number;
  response: any;
}
export interface ISelect {
  id?: string;
  name?: string;
  label?: string;
  title?: string;
  value?: string | number;
  key?: string;
  checked?: boolean;
}
export interface IColumns {
  type?: string;
  label?: string;
  selectList?: object;
  labelWidth?: string;
  span?: number;
  key?: string;
  multiple?: boolean;
  beforeList?: any;
  dictCode?: object;
  placeholder?: string;
  required?: boolean;
  rules?: any;
  showTab?: string;
  formItemSlot: boolean;
}
export interface IOrder {
  assignee: string;
  bizCode: string;
  bizDetail: any;
  bizId: string;
  bizName: string;
  createBy: string;
  createTime: string;
  createTimeName: string;
  dailyWorkId: string;
  id: string;
  materialsNameSum: string;
  materialsSum: number;
  orgId: string;
  orgName: string;
  postName: string;
  signatureFile: string;
  signatureFileInfo: any;
  status: number;
  statusName: string;
  type: number;
  updateBy: string;
  updateTime: string;
  workDate: string;
  workTypeName: string;
  remark: string;
  materialsList: any[];
}

export interface IWarehouse {
  code: string;
  contactsName: string;
  createBy: string;
  createId: string;
  createTime: string;
  createdAt: string;
  deletedAt: number;
  farmId: string;
  farmTitle: string;
  id: string;
  sort: number;
  status: number;
  tel: string;
  title: string;
  type: number;
  typeTitle: string;
  updateBy: string;
  updateId: string;
  updateTime: string;
  wid: string;
}
