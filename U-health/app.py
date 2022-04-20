from distutils.log import debug
from flask import Flask,request,render_template,jsonify,redirect,url_for
from jieba.analyse import extract_tags
import json
import utils
import traceback
import win32api,win32con
import pymysql
app = Flask(__name__)

@app.route("/l1")
def get_l1_data():
    data = utils.get_l1_data()
    day, confirm, confirm_now, heal, dead = [], [], [], [], []
    for a, b, c, d, e in data:
        day.append(a.strftime("%m-%d"))  # a是datatime类型
        confirm.append(b)
        confirm_now.append(c)
        heal.append(d)
        dead.append(e)
    return jsonify({"day": day, "confirm": confirm, "confirm_now": confirm_now, "heal": heal, "dead": dead})

@app.route("/l2")
def get_l2_data():
    data = utils.get_l2_data()
    # end_update_time, province, city, county, address, type
    details = []
    risk = []
    end_update_time = data[0][0]
    for a,b,c,d,e,f in data:
        risk.append(f)
        details.append(f"{b}\t{c}\t{d}\t{e}")
    return jsonify({"update_time": end_update_time, "details": details, "risk": risk})

@app.route("/c1")
def get_c1_data():
    data = utils.get_c1_data()
    return jsonify({"confirm":int(data[0]),"confirm_now":int(data[1]),"heal":int(data[2]),"dead":int(data[3])})

@app.route("/c2")
def get_c2_data():
    res = []
    for tup in utils.get_c2_data():
        # [{'name': '上海', 'value': 318}, {'name': '云南', 'value': 162}]
        res.append({"name":tup[0],"value":int(tup[1])})
    return jsonify({"data":res})

@app.route("/r1")
def get_r1_data():
    data = utils.get_r1_data()
    city = []
    confirm = []
    for k,v in data:
        city.append(k)
        confirm.append(int(v))
    return jsonify({"city": city, "confirm": confirm})

@app.route("/r2")
def get_r2_data():
    # data = utils.get_r2_data() #格式 (('民警抗疫一线奋战16天牺牲1037364',), ('四川再派两批医疗队1537382',)
    # d = []
    # for i in data:
    #     k = i[0].rstrip(string.digits)  # 移除热搜数字
    #     v = i[0][len(k):]  # 获取热搜数字
    #     ks = extract_tags(k)  # 使用jieba 提取关键字
    #     for j in ks:
    #         if not j.isdigit():
    #             d.append({"name": j, "value": v})
    # return jsonify({"kws": d})
    data = utils.get_r2_data()
    day, confirm_add, suspect_add, heal_add, dead_add = [], [], [], [], []
    for a, b, c, d, e in data:
        day.append(a.strftime("%m-%d"))  # a是datatime类型
        confirm_add.append(b)
        suspect_add.append(c)
        heal_add.append(d)
        dead_add.append(e)
    return jsonify({"day": day, "confirm_add": confirm_add, "suspect_add": suspect_add, "heal_add": heal_add, "dead_add": dead_add})
    
@app.route('/')
def hello_world():
    return render_template("main.html")

@app.route('/health')
def health():
    return render_template("health.html")

@app.route('/loginhtml')
def loginhtml1():
    return render_template("login.html")

@app.route('/registuser',methods=['GET','POST'])
def getRigistRequest():
#把用户名和密码注册到数据库中
    print('正在注册')
    #连接数据库,此前在数据库中创建数据库flask
    db = pymysql.connect(host="localhost", user="root", password="6010289csf", database="cov",charset="utf8")
    #使用cursor()方法获取操作游标
    cursor = db.cursor()
    #获取输入框内容
    data = json.loads(request.get_data())
    print(data)
    reg_username=data['reg_username']
    reg_password=data['reg_password']
    conf_password=data['conf_password']
    e_mail=data['e_mail']
    reg_button = data['reg_button']
    #判断两次输入密码是否一致，一致则跳转到登录界面，不一致则弹出警告，要求用户重新输入
    if reg_button[0] == 1 and reg_button[1] == 1 and reg_button[2] == 1 and reg_button[3] == 1:
        # SQL 插入语句
        sql = "INSERT INTO user(username, password, e_mail) VALUES ("+repr(reg_username)+", "+repr(reg_password)+", "+repr(e_mail)+")"
        try:
            # 执行sql语句
            cursor.execute(sql)
            # 提交到数据库执行
            db.commit()
             #注册成功之后跳转到登录页面
            return jsonify({'提示信息':'注册成功，请点击去登录进行登录'})
        except:
            #抛出错误信息
            traceback.print_exc()
            # 如果发生错误则回滚
            db.rollback()
            return jsonify({'提示信息':'注册失败'})
        # 关闭数据库连接
        db.close()
    elif reg_button[0] == 0 or reg_button[1] == 0 or reg_button[2] == 0 or reg_button[3] == 0:
        return jsonify({'提示信息':"注册信息填写错误"})

# 获取登录参数及处理
@app.route('/login',methods=['GET','POST'])
def getLoginRequest():
    # 查询用户名及密码是否匹配及存在
    # 连接数据库,此前在数据库中创建数据库TESTDB
    db = pymysql.connect(host="localhost", user="root", password="6010289csf", database="cov",charset="utf8")
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    data = json.loads(request.get_data())
    print(data)
    data1 = request.values
    print(data1)
    # SQL 查询语句
    sql = "select * from user where username=" + repr(data['username']) + " and password=" + repr(data['password']) + ""
    try:
        # 执行sql语句
        cursor.execute(sql)
        results = cursor.fetchall()
        print(len(results))
        if len(results) == 1:
            print("成功登录")
            return jsonify({"提示信息":"登陆成功"})       #返回需要跳转的页面或需要显示的字符串

        else:
            return jsonify({'提示信息':'用户名或密码不正确'})
        # 提交到数据库执行
        db.commit()
    except:
        # 如果发生错误则回滚
        traceback.print_exc()
        db.rollback()
    # 关闭数据库连接
    db.close()

if __name__ == '__main__':
    app.run(debug=True)
