from flask import Flask,request,render_template,jsonify
from jieba.analyse import extract_tags
import string
import utils

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




@app.route('/ajaxtest',methods=["post"])
def hello_world4():
    name = request.values.get("name")
    return f"你好 {name}，服务器收到了ajax请求"


@app.route('/xyz')
def hello_world3():
    return render_template("a.html")

@app.route('/denglu')
def hello_world2():
    name = request.values.get("name")
    pwd = request.values.get("pwd")

    return f'name={name},pwd={pwd}'

@app.route("/login")
def hello_world1():
    id = request.values.get("id")
    return f"""
<form action="/denglu">
    <p>账号：<input name="name" value={id}></p>
    <p>密码：<input name="pwd" ></p>
    <p><input type="submit" ></p>
</form>
    """

if __name__ == '__main__':
    app.run()
