// 苗木库存数据集中放在这里。后期新增树种，优先复制一条对象再修改字段。
const stockData = [
  {
    name: "碧桃",
    spec: "5-10cm",
    quantity: "800棵",
    note: "常用花灌木，适合景观节点",
    level: "",
    image: "",
  },
  {
    name: "朴树",
    spec: "20-23cm",
    quantity: "15棵",
    note: "大规格乔木，适合重点景观",
    level: "",
    image: "",
  },
  {
    name: "丛生巨紫荆",
    spec: "5-8m",
    quantity: "700棵",
    note: "丛生树形，适合庭院和项目组团",
    level: "",
    image: "",
  },
  {
    name: "国槐（金枝）",
    spec: "16-20cm",
    quantity: "200棵",
    note: "金枝品种，采购前建议确认树形",
    level: "",
    image: "",
  },
  {
    name: "【待核对树种A】",
    spec: "14-18cm",
    quantity: "700棵",
    note: "树种名称待后续核对",
    level: "",
    image: "",
  },
  {
    name: "黄山栾",
    spec: "13-18cm",
    quantity: "260棵",
    note: "工程绿化常用品种",
    level: "",
    image: "",
  },
  {
    name: "绚丽海棠",
    spec: "15-18cm",
    quantity: "200棵",
    note: "观花品种，适合景观搭配",
    level: "",
    image: "",
  },
  {
    name: "绚丽海棠（二级）",
    spec: "12-18cm",
    quantity: "400棵",
    note: "二级苗，建议现场确认树形",
    level: "二级",
    image: "",
  },
  {
    name: "早樱",
    spec: "10-15cm，分枝1.4-1.5m",
    quantity: "300棵",
    note: "分枝高度已标注，适合按项目要求沟通",
    level: "",
    image: "",
  },
  {
    name: "柿树",
    spec: "20-25cm",
    quantity: "100棵",
    note: "果树景观类，适合特色绿化",
    level: "",
    image: "",
  },
  {
    name: "榉树",
    spec: "12-16cm",
    quantity: "550棵",
    note: "常用乔木，适合道路和园区绿化",
    level: "",
    image: "",
  },
  {
    name: "娜塔栎",
    spec: "12-20cm",
    quantity: "600棵",
    note: "彩叶乔木，适合景观项目",
    level: "",
    image: "",
  },
  {
    name: "丝棉木（二级）",
    spec: "10-15cm",
    quantity: "150棵",
    note: "二级苗，采购前建议确认等级标准",
    level: "二级",
    image: "",
  },
  {
    name: "丛生丝棉木",
    spec: "高5m左右",
    quantity: "100棵",
    note: "丛生树形，高度约 5m",
    level: "",
    image: "",
  },
  {
    name: "丛生【待核对树种B】（二级）",
    spec: "高6-7m",
    quantity: "100棵",
    note: "树种名称待后续核对",
    level: "二级",
    image: "",
  },
  {
    name: "丛生【待核对树种B】（一级）",
    spec: "高6-6.5m",
    quantity: "20棵",
    note: "树种名称待后续核对",
    level: "一级",
    image: "",
  },
  {
    name: "独杆巨紫荆",
    spec: "12-18cm",
    quantity: "500棵",
    note: "独杆树形，适合工程绿化",
    level: "",
    image: "",
  },
  {
    name: "二乔玉兰",
    spec: "8-14cm",
    quantity: "300棵",
    note: "观花乔木，适合景观节点",
    level: "",
    image: "",
  },
  {
    name: "紫玉兰",
    spec: "7-9cm",
    quantity: "100棵",
    note: "观花树种，适合庭院和项目搭配",
    level: "",
    image: "",
  },
  {
    name: "油松",
    spec: "高3.5m左右 / 规格待核对",
    quantity: "800棵",
    note: "规格需要后续核对补充",
    level: "",
    image: "",
  },
];

const INQUIRY_STORAGE_KEY = "meisen_inquiries";

const stockList = document.querySelector("#stock-list");
const stockSearch = document.querySelector("#stock-search");
const stockSummary = document.querySelector("#stock-summary");
const inquiryForm = document.querySelector("#inquiry-form");
const formMessage = document.querySelector("#form-message");
const adminList = document.querySelector("#admin-list");
const adminSummary = document.querySelector("#admin-summary");
const clearInquiriesButton = document.querySelector("#clear-inquiries");

function createStockRow(item) {
  const needsVerify = item.name.includes("待核对") || item.spec.includes("待核对");
  const verifyClass = needsVerify ? " verify" : "";

  return `
    <article class="stock-row">
      <strong>${item.name}</strong>
      <span data-label="规格" class="${verifyClass}">${item.spec}</span>
      <span data-label="数量" class="quantity">${item.quantity}</span>
      <span data-label="等级">${item.level || "常规"}</span>
      <span data-label="备注" class="${verifyClass}">${item.note}</span>
    </article>
  `;
}

function renderStock(list) {
  const tableHead = `
    <div class="stock-row stock-head" aria-hidden="true">
      <span>树种名称</span>
      <span>规格</span>
      <span>数量</span>
      <span>等级</span>
      <span>备注</span>
    </div>
  `;

  if (stockList && stockSummary) {
    stockList.innerHTML = tableHead + list.map(createStockRow).join("");
    stockSummary.textContent = `当前显示 ${list.length} 个品种，共录入 ${stockData.length} 条库存信息。`;
  }
}

function handleSearch() {
  const keyword = stockSearch.value.trim();
  const filteredStock = stockData.filter((item) => item.name.includes(keyword));
  renderStock(filteredStock);
}

function getInquiries() {
  const saved = localStorage.getItem(INQUIRY_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveInquiries(inquiries) {
  localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
}

function formatTime(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function handleInquirySubmit(event) {
  event.preventDefault();

  const formData = new FormData(inquiryForm);
  const newInquiry = {
    id: Date.now().toString(),
    createdAt: formatTime(new Date()),
    treeName: formData.get("treeName").trim(),
    spec: formData.get("spec").trim(),
    quantity: formData.get("quantity").trim(),
    contactName: formData.get("contactName").trim(),
    phone: formData.get("phone").trim(),
    region: formData.get("region").trim(),
    remark: formData.get("remark").trim(),
    status: "新询价",
  };

  const inquiries = getInquiries();
  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);

  inquiryForm.reset();
  formMessage.textContent = "询价已提交成功，我们会根据库存情况尽快联系您。";
}

function createAdminRow(item) {
  return `
    <article class="admin-row" data-id="${item.id}">
      <span data-label="提交时间">${item.createdAt}</span>
      <strong data-label="树种名称">${item.treeName}</strong>
      <span data-label="规格要求">${item.spec}</span>
      <span data-label="数量需求">${item.quantity}</span>
      <span data-label="联系人">${item.contactName}</span>
      <span data-label="手机号"><a href="tel:${item.phone}">${item.phone}</a></span>
      <span data-label="地区">${item.region || "未填写"}</span>
      <span data-label="备注">${item.remark || "无"}</span>
      <label data-label="跟进状态">
        <select class="status-select" aria-label="跟进状态">
          <option ${item.status === "新询价" ? "selected" : ""}>新询价</option>
          <option ${item.status === "已联系" ? "selected" : ""}>已联系</option>
          <option ${item.status === "已报价" ? "selected" : ""}>已报价</option>
          <option ${item.status === "跟进中" ? "selected" : ""}>跟进中</option>
        </select>
      </label>
    </article>
  `;
}

function renderAdminList() {
  const inquiries = getInquiries();
  adminSummary.textContent = `当前共有 ${inquiries.length} 条询价记录。`;

  if (inquiries.length === 0) {
    adminList.innerHTML = `<div class="empty-state">暂无询价记录。可以回到前台提交一条测试询价。</div>`;
    return;
  }

  const tableHead = `
    <div class="admin-row admin-head" aria-hidden="true">
      <span>提交时间</span>
      <span>树种名称</span>
      <span>规格要求</span>
      <span>数量需求</span>
      <span>联系人</span>
      <span>手机号</span>
      <span>地区</span>
      <span>备注</span>
      <span>跟进状态</span>
    </div>
  `;

  adminList.innerHTML = tableHead + inquiries.map(createAdminRow).join("");
}

function handleStatusChange(event) {
  if (!event.target.matches(".status-select")) {
    return;
  }

  const row = event.target.closest(".admin-row");
  const inquiries = getInquiries().map((item) => {
    if (item.id === row.dataset.id) {
      return { ...item, status: event.target.value };
    }
    return item;
  });

  saveInquiries(inquiries);
  renderAdminList();
}

function clearInquiries() {
  const confirmed = window.confirm("确定清空本地询价记录吗？这个操作只影响当前浏览器的测试数据。");
  if (!confirmed) {
    return;
  }

  saveInquiries([]);
  renderAdminList();
}

if (stockSearch) {
  stockSearch.addEventListener("input", handleSearch);
  renderStock(stockData);
}

if (inquiryForm) {
  inquiryForm.addEventListener("submit", handleInquirySubmit);
}

if (adminList) {
  adminList.addEventListener("change", handleStatusChange);
  renderAdminList();
}

if (clearInquiriesButton) {
  clearInquiriesButton.addEventListener("click", clearInquiries);
}
