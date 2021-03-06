 
from PIL import Image, ImageDraw
 
def circle_corner(img, radii):
    # 画圆（用于分离4个角）
    circle = Image.new('L', (radii * 2, radii * 2), 0)  # 创建黑色方形
    # circle.save('1.jpg','JPEG',qulity=100)
    draw = ImageDraw.Draw(circle)
    draw.ellipse((0, 0, radii * 2, radii * 2), fill=255)  # 黑色方形内切白色圆形
    # circle.save('2.jpg','JPEG',qulity=100)
 
    img = img.convert("RGBA")
    w, h = img.size
 
    alpha = Image.new('L', img.size, 255)
    alpha.paste(circle.crop((0, 0, radii, radii)), (0, 0))  # 左上角
    alpha.paste(circle.crop((radii, 0, radii * 2, radii)),
                (w - radii, 0))  # 右上角
    alpha.paste(circle.crop((radii, radii, radii * 2, radii * 2)),
                (w - radii, h - radii))  # 右下角
    alpha.paste(circle.crop((0, radii, radii, radii * 2)),
                (0, h - radii))  # 左下角
 
    img.putalpha(alpha)		# 白色区域透明可见，黑色区域不可见
 
    return img
 
if __name__ == '__main__':
 
    radii = 50  #圆角大小
 
    for i in range(1, 211):
        img = Image.open('img/favicon.jpeg')
        img = circle_corner(img, radii)
        img.save(f'img/ro_favicon.png', 'png', quality=100)