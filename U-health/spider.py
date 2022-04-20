import json
import requests
import time
import json
import pymysql
import traceback
import hashlib
import sys
# 每日详情数据
url = "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=diseaseh5Shelf"
res = requests.post(url)
data_all = json.loads(res.text)["data"]["diseaseh5Shelf"]
details = []  # 当日详细数据
update_time = data_all["lastUpdateTime"]
data_country = data_all["areaTree"]  # list 之前有25个国家,现在只有中国
data_province = data_country[0]["children"]  # 中国各省
for pro_infos in data_province:
    province = pro_infos["name"]  # 省名
    for city_infos in pro_infos["children"]:
            city = city_infos["name"]
            confirm = city_infos["total"]["confirm"]
            confirm_add = city_infos["today"]["confirm"]
            confirm_now = city_infos["total"]["nowConfirm"]
            heal = city_infos["total"]["heal"]
            dead = city_infos["total"]["dead"]
            details.append([update_time, province, city, confirm, confirm_add,confirm_now, heal, dead])

def get_tencent_data():
    """
    :return: 返回历史数据和当日详细数据
    """
    url_det = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=diseaseh5Shelf'
    url_his = "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare"
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    }
    r_det = requests.get(url_det, headers)
    r_his = requests.get(url_his, headers)
    res_det = json.loads(r_det.text)  # json字符串转字典
    res_his = json.loads(r_his.text)
    data_det = res_det['data']['diseaseh5Shelf']
    data_his = res_his['data']

    history = {}  # 历史数据
    for i in data_his["chinaDayList"]:
        ds = i["y"]+"."+i["date"]
        tup = time.strptime(ds, "%Y.%m.%d")
        ds = time.strftime("%Y-%m-%d", tup)  # 改变时间格式,不然插入数据库会报错，数据库是datetime类型
        confirm = i["confirm"]
        confirm_now = i["nowConfirm"]
        suspect = i["suspect"]
        heal = i["heal"]
        dead = i["dead"]
        history[ds] = {"confirm": confirm,"confirm_now":confirm_now, "suspect": suspect, "heal": heal, "dead": dead}
    for i in data_his["chinaDayAddList"]:
        ds = i["y"]+"."+i["date"]
        tup = time.strptime(ds, "%Y.%m.%d")
        ds = time.strftime("%Y-%m-%d", tup)
        confirm_add = i["confirm"]
        suspect_add = i["suspect"]
        heal_add = i["heal"]
        dead_add = i["dead"]
        history[ds].update({"confirm_add": confirm_add, "suspect_add": suspect_add, "heal_add": heal_add, "dead_add": dead_add})

    details = []  # 当日详细数据
    update_time = data_det["lastUpdateTime"]
    data_country = data_det["areaTree"]  # list 之前有25个国家,现在只有中国
    data_province = data_country[0]["children"]  # 中国各省
    for pro_infos in data_province:
        province = pro_infos["name"]  # 省名
        for city_infos in pro_infos["children"]:
            city = city_infos["name"] #城市名
            confirm = city_infos["total"]["confirm"] #l累计确诊
            confirm_add = city_infos["today"]["confirm"] #新增确诊
            confirm_now = city_infos["total"]["nowConfirm"] #现有确诊
            heal = city_infos["total"]["heal"] #累计治愈
            dead = city_infos["total"]["dead"] #累计死亡
            details.append([update_time, province, city, confirm, confirm_add,confirm_now, heal, dead])
    return history, details

history, details = get_tencent_data()

conn = pymysql.connect(host="localhost",
                      user="root",
                      password="6010289csf",
                      db="cov")
#创建游标，默认是元组型
cursor = conn.cursor()
#准备sql语句
sql= "select * from details"
#执行sql
cursor.execute(sql)
#conn.commit() #提交事务 增删改操作
res = cursor.fetchall()
#释放资源
cursor.close()
conn.close()

def get_conn():
    """
    :return: 连接，游标
    """
    # 创建连接
    conn = pymysql.connect(host="localhost",
                           user="root",
                           password="6010289csf",
                           db="cov",
                           charset="utf8")
    # 创建游标
    cursor = conn.cursor()# 执行完毕返回的结果集默认以元组显示
    return conn, cursor

def close_conn(conn, cursor):
    cursor.close()
    conn.close()

def update_details():
    """
    更新 details 表
    :return:
    """
    cursor = None
    conn = None
    try:
        li = get_tencent_data()[1]  #  0 是历史数据字典,1 最新详细数据列表
        conn, cursor = get_conn()
        sql = "insert into details(update_time,province,city,confirm,confirm_add,confirm_now,heal,dead) " \
              "values(%s,%s,%s,%s,%s,%s,%s,%s)"
        sql_query = 'select %s=(select update_time from details order by id desc limit 1)' #对比当前最大时间戳
        cursor.execute(sql_query,li[0][0])
        if not cursor.fetchone()[0]:
            print(f"{time.asctime()}开始更新最新数据")
            for item in li:
                cursor.execute(sql, item)
            conn.commit()  # 提交事务 update delete insert操作
            print(f"{time.asctime()}更新最新数据完毕")
        else:
            print(f"{time.asctime()}已是最新数据！")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn, cursor)

def update_history():
    """
    更新历史数据
    :return:
    """
    cursor = None
    conn = None
    try:
        dic = get_tencent_data()[0]  #  0 是历史数据字典,1 最新详细数据列表
        print(f"{time.asctime()}开始更新历史数据")
        conn, cursor = get_conn()
        sql = "insert into history values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        sql_query = "select confirm from history where ds=%s"
        for k, v in dic.items():
            # item 格式 {'2020-01-13': {'confirm': 41, 'suspect': 0, 'heal': 0, 'dead': 1}
            if not cursor.execute(sql_query, k):  #如果当天数据不存在，才写入
                cursor.execute(sql, [k, v.get("confirm"), v.get("confirm_add"),v.get("confirm_now"),
                                     v.get("suspect"),v.get("suspect_add"), v.get("heal"),
                                     v.get("heal_add"),v.get("dead"), v.get("dead_add")])
        conn.commit()  # 提交事务 update delete insert操作
        print(f"{time.asctime()}历史数据更新完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn, cursor)


# update_history()
# update_details()


url = "http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson"
res = requests.post(url)
post_dict = {
    "appId": "NcApplication",
"key": "3C502C97ABDA40D0A60FBEE50FAAD1DA",
"nonceHeader": "123456789abcdefg",
"paasHeader": "zdww",
"signatureHeader": "A9B0595DC723D693905E1B42A0AC5BC6D3538F2E0A4FA9F2F71F0A49F0A5A2CF",
"timestampHeader": "1642390142"
}
headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Origin": "http://bmfw.www.gov.cn",
"Referer": "http://bmfw.www.gov.cn/",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
"x-wif-nonce":"QkjjtiLM2dCratiA",
"x-wif-paasid": "smt-application",
"x-wif-signature": "B391E74C210598810AD1850EAD11BCE5D38F342472EBF35D1D4AB5CC2BA33D74",
"x-wif-timestamp": "1642390142"
}
res = requests.post(url,data=json.dumps(post_dict),headers=headers)

o = '%.3f' % (time.time() / 1e3)
e = o.replace('.','')
i = "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA"
a = "123456789abcdefg"

def getSignature1():
    s = hashlib.sha256()
    s.update(str(e + i + a + e).encode("utf8"))
    b = s.hexdigest().upper()
    return b

def getSignature2():
    s = hashlib.sha256()
    s.update(str(e + 'fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA' + e).encode("utf8"))
    b = s.hexdigest().upper()
    return b

post_dict = {
    "appId": "NcApplication",
"key": "3C502C97ABDA40D0A60FBEE50FAAD1DA",
"nonceHeader": "123456789abcdefg",
"paasHeader": "zdww",
"signatureHeader": getSignature1(),
"timestampHeader": e
}
headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Origin": "http://bmfw.www.gov.cn",
"Referer": "http://bmfw.www.gov.cn/",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
"x-wif-nonce":"QkjjtiLM2dCratiA",
"x-wif-paasid": "smt-application",
"x-wif-signature": getSignature2(),
"x-wif-timestamp": e
}
res = requests.post(url,data=json.dumps(post_dict),headers=headers)

res = json.loads(res.text)


def get_risk_area():
    """
    :return: risk_h,risk_m 中高风险地区详细数据
    """
    #当前时间戳
    o = '%.3f' % (time.time() / 1e3)
    e = o.replace('.', '')
    i = "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA"
    a = "123456789abcdefg"
    #签名1
    s1 = hashlib.sha256()
    s1.update(str(e + i + a + e).encode("utf8"))
    s1 = s1.hexdigest().upper()
    # 签名2
    s2 = hashlib.sha256()
    s2.update(str(e + 'fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA' + e).encode("utf8"))
    s2 = s2.hexdigest().upper()
    #post请求数据
    post_dict = {
        'appId': 'NcApplication',
        'key': '3C502C97ABDA40D0A60FBEE50FAAD1DA',
        'nonceHeader': '123456789abcdefg',
        'paasHeader': 'zdww',
        'signatureHeader': s1,
        'timestampHeader': e
    }
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Referer': 'http://bmfw.www.gov.cn/',
        'Origin': 'http://bmfw.www.gov.cn',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'x-wif-nonce': 'QkjjtiLM2dCratiA',
        'x-wif-paasid': 'smt-application',
        'x-wif-signature': s2,
        'x-wif-timestamp': e,
    }
    url = "http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson"
    req = requests.post(url=url, data=json.dumps(post_dict), headers=headers)
    resp = req.text
    res = json.loads(resp)
    # print(res)
    utime = res['data']['end_update_time'] #更新时间
    hcount = res['data'].get('hcount',0) #高风险地区个数
    mcount = res['data'].get('mcount',0) #低风险地区个数
    #具体数据
    hlist = res['data']['highlist']
    mlist = res['data']['middlelist']

    risk_h = []
    risk_m = []

    for hd in hlist:
        type = "高风险"
        province = hd['province']
        city = hd['city']
        county = hd['county']
        area_name = hd['area_name']
        communitys = hd['communitys']
        for x in communitys:
            risk_h.append([utime,province,city,county,x,type])

    for md in mlist:
        type = "中风险"
        province = md['province']
        city = md['city']
        county = md['county']
        area_name = md['area_name']
        communitys = md['communitys']
        for x in communitys:
            risk_m.append([utime, province, city, county, x, type])

    return risk_h,risk_m


h,m = get_risk_area()


def update_risk_area():
    """
        更新 risk_area 表
        :return:
        """
    cursor = None
    conn = None
    try:
        risk_h, risk_m = get_risk_area()
        conn, cursor = get_conn()
        sql = "insert into risk_area(end_update_time,province,city,county,address,type) values(%s,%s,%s,%s,%s,%s)"
        sql_query = 'select %s=(select end_update_time from risk_area order by id desc limit 1)'  # 对比当前最大时间戳
        cursor.execute(sql_query, risk_h[0][0]) #传入最新时间戳
        if not cursor.fetchone()[0]:
            print(f"{time.asctime()}开始更新最新数据")
            for item in risk_h:
                cursor.execute(sql, item)
            for item in risk_m:
                cursor.execute(sql, item)
            conn.commit()  # 提交事务 update delete insert操作
            print(f"{time.asctime()}更新最新数据完毕")
        else:
            print(f"{time.asctime()}已是最新数据！")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn, cursor)


# update_risk_area()
if __name__=="__main__":
    l = len(sys.argv)
    if l == 1:
        s = """
         请输入参数
         参数说明：
         up_his 更新历史数据
         up_risk 更新中高风险
         up_det 更新详细表
        """
        print(s)
    else:
        order = sys.argv[1]
        if order == "up_his":
            update_history()
        elif order == "up_risk":
            update_risk_area()
        elif order == "up_det":
            update_details()