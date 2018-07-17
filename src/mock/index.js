import Mock from "mockjs";
const Random = Mock.Random;

// 中心数据消息
const control_center = () => {
  return Mock.mock({
    "id|+1": 0,
    "message_type": "2",
    "fault_type|1": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 50, 52, 54, 100, 102, 104, 106, 108, 110, 112, 114],
    "memo": "@csentence(5, 10)",
    "level": "@integer(0, 5)",
    "crossing_name": "@csentence(5, 10)",
    "create_time": "@datetime"
  })
};
// 故障原因
const current_fault = () => {
  return Mock.mock({
    "id|1": 100,
    "dev_code": "2000",
    "type": 1,
    "crossing_name": Random.csentence(5, 10),
    "fault_type": 50,
    "memo": Random.csentence(5, 10),
    "create_time": "2018-06-11 09:49:08",
    "is_dispatch": 0,
    "screen_type": 0,
    "screen_reason": null,
    "level": Random.integer(0, 5),
    "o_id": "6e7a863a-5ffc-11e8-b047-7085c2388a55",
    "alert_level": 5,
    "fault_img_url": "",
    "is_auto_repair": 1,
    "dev_name": "测试相机_1"
  })
};
// 自动修复
const fault_repair = () => {
  return Mock.mock({
    "auto_radio": 100,		//自动修复率
    "automatic": Random.integer(0, 99999),  // 自动修复数
    "artificial": Random.integer(0, 99999)			//人工修复数
  })
};
// 节点数
const node_number = () => {
  return Mock.mock({
    "sum": "@integer(0, 99999)",
    "online": "@integer(0, 99999)"
  })
};
// 在线离线率
const online_radio = () => {
  let p = Random.float(0, 100, 0, 2);
  return Mock.mock({
    on_radio: p,
    off_radio: parseFloat((100 - p).toFixed(2))
  })
};
// 资产统计
const count_assets = () => {
  return Mock.mock({
    "data": [{
      category_num: "1",
      "count": "@integer(0, 99999)",
      name: "视频设备"
    }, {
      category_num: "2",
      "count": "@integer(0, 99999)",
      name: "服务器"
    }, {
      category_num: "3",
      "count": "@integer(0, 99999)",
      name: "动环设备"
    }, {
      category_num: "4",
      "count": "@integer(0, 99999)",
      name: "机箱设备"
    }, {
      category_num: "5",
      "count": "@integer(0, 99999)",
      name: "网络设备"
    }]
  }).data
};
// 组织结构
const organize_show = () => {
  return Mock.mock({
    "o_id": "@guid",
    "name": "@name"
  })
};

// 初始加载
const indexAllData = () => {
  return Mock.mock({
    data: {
      "control_center|4": [control_center],
      "current_fault|4": [current_fault],
      fault_repair: fault_repair,
      node_number: node_number,
      online_radio: online_radio,
      count_assets: count_assets,
      "organize_show|16": [organize_show]
    },
    status: "1"
  })
};


Mock.mock("/api/Ma_zong/indexAllData", /post|get/i, indexAllData);
Mock.mock("/api/Ma_zong/controlCenter", /post|get/i, { data: control_center, status: "1" });
